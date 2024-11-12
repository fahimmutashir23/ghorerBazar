import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loader2 from "@/Utils/Loader2";
import Carusel from "./Carusel";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic("/api/get-banner");
      setBanner(res.data.result);
    };
    fetchData();
  }, []);
  if (!banner) return <Loader2 />;
  return (
    <div className="h-[50vh] flex flex-col lg:flex-row gap-4 mb-4">
      <div className="lg:w-4/12 border-2 border-black rounded-md"></div>
      <div className="lg:w-8/12">
        <Carusel images={banner} />
      </div>
    </div>
  );
};

export default Banner;
