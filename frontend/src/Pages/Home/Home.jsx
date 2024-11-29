import { useEffect, useState } from "react";
import AllProduct from "./Partial/AllProduct";
import Banner from "./Partial/Banner";
import Ads from "./Partial/Ads";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Loader2 from "@/Utils/Loader2";
import { useQuery } from "@tanstack/react-query";
import AllProducts from "./Partial/SmallScreen/AllProducts";
import useIsSmallScreen from "@/Hooks/useIsSmallScreen";
import Contact from "./Contact";

const Home = () => {
  const targetDate = "2024-06-01T23:59:59";
  const [isSmallScreen] = useIsSmallScreen();

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const { data: banner, isLoading } = useQuery({
    queryKey: ["get-banner"],
    queryFn: async () => {
      const res = await axiosPublic("/api/get-banner-list");
      return res.data.result;
    },
  });

  if (isLoading) return <Loader2 />;

  return (
    <div className="max-w-7xl mx-auto px-1 space-y-3">
      <Banner banner={banner} />
      {isSmallScreen || <Ads banner={banner} />}
      {!isSmallScreen ? <AllProduct /> : <AllProducts />}
      <Contact />
    </div>
  );
};

export default Home;
