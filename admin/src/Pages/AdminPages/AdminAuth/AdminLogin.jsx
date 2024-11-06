import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUser from "../../../Security/useUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const AdminLogin = () => {
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
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center w-full px-2">
      <div className="w-full">
        <div className="w-full card shadow-xl bg-base-100 relative">
          <div className="flex justify-center absolute -top-10">
            <img
              src=""
              className="w-1/5 rounded-full border-4 border-white"
              alt=""
            />
          </div>

          <h1 className="text-2xl text-center pt-14 lg:pt-[70px] pb-2 rounded-t-xl bg-gray-200 text-blue-700 lg:text-3xl font-semibold">
            Welcome to <br /> Tech Hub
          </h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="font-semibold">Email *</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="border h-12 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-semibold">Password *</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="border h-12 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
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
            <p>
              If you are not an account please{" "}
              <Link className="text-blue-600" to="/admin/registration">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
