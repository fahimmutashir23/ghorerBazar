import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUser from "../../../Security/useUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import bg from "@/assets/asset/about/cash2.jpg";
import logo from "@/assets/asset/about/logo2.png";
import moment from "moment";

const AdminLogin = () => {
  const year = moment().format("YYYY");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [, , refetch] = useUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      axiosPublic(
        `/api/auth?email=${data.email}&password=${data.password}`
      ).then((res) => {
        if (res.data) {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          navigate("/");
          refetch();
        }
      });
    }
  }, [data]);

  const handleScan = () => {
    let scanner;

    function onScanSuccess(decodedText, decodedResult) {
      const decodeData = (encodedData) => JSON.parse(atob(encodedData));
      const decodedData = decodeData(decodedText);
      setData(decodedData);
      scanner.clear();
    }

    const config = {
      fps: 10,
      qrbox: { width: 200, height: 200 },
      rememberLastUsedCamera: true,
    };

    scanner = new Html5QrcodeScanner("reader", config, true);
    scanner.render(onScanSuccess);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axiosPublic(
        `/api/auth?email=${email}&password=${password}`
      );
      if (res.data) {
        if (res.data.user.active === false) {
          return toast.error("your account is not active") && e.target.reset();
        }
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        refetch();
      }
    } catch (err) {
      toast.error("your email and password are not matched.");
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-full w-full bg-black/30 absolute"></div>
      <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center w-full px-2">
        <div className="w-full">
          <h1 className="bg-green-300 font-medium text-center p-2 mb-4 lg:mb-8 rounded-md">
            After successful registration you can login when admin approves.
            Please wait for some time. And if your account is active then login.
          </h1>
          <div className="w-full card shadow-xl relative bg-green-400/30 backdrop-blur-md">
            <div className="flex justify-center absolute lg:-top-11">
              <img src={logo} className="w-1/4 lg:w-1/3 border-white" alt="" />
            </div>

            <h1 className="text-2xl text-center pt-14 lg:pt-[70px] pb-2 rounded-t-xl bg-gray-200/20 text-gray-800 lg:text-5xl font-semibold invitationTextFont">
              Welcome to Happy Budget
            </h1>
            <form
              onSubmit={handleLogin}
              className="px-2 lg:px-8 py-4 lg:py-6 text-white"
            >
              <div className="form-control">
                <label className="">
                  <span className="font-semibold">Email *</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="border border-gray-300 h-10 bg-gray-100/30 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="">
                  <span className="font-semibold">Password *</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="border border-gray-300 h-10 bg-gray-100/30 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                  required
                />
              </div>
              <div className="w-full mt-6 flex flex-col lg:flex-row gap-2 items-center">
                <button type="submit" className="button_primary w-full">
                  Login
                </button>
                or
                <div
                  onClick={handleScan}
                  className="button_primary w-full text-center cursor-pointer"
                >
                  Scan QR Code
                </div>
              </div>
              <div id="reader"></div>
              <p className="text-gray-700">
                If you are not an account please
                <Link className="text-gray-700 font-medium ml-2" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-4 lg:mt-0 lg:absolute bottom-0 bg-green-700/80 text-white px-4 py-1 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
          <span>&#9400; {year} all right reserved by Happy Budget</span>{" "}
          <span>Design & Developed by MD. FAHIM MUNTASHIR</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
