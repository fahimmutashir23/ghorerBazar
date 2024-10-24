import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUser from "../../../Security/useUser";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { useState } from "react";
import moment from "moment";

const AdminRegistration = () => {
  const year = moment().format("YYYY");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [, , refetch] = useUser();
  const [typeName, setTypeName] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const confirmPass = e.target.re_password.value;
    const password = e.target.password.value;
    const gender = e.target?.gender?.value || null;
    const images = e.target?.image?.files[0] || null;

    if (phone.length !== 11) {
      return toast.error("phone number must be 11");
    } else if (password !== confirmPass) {
      return toast.error("password are not matched");
    } else {
      try {
        const info = new FormData()
        info.append('name', firstName.concat(lastName));
        info.append('phone', phone);
        info.append('email', email);
        info.append('password', password);
        gender && info.append('gender', gender);
        images && info.append('images', images);

        const res = await axiosPublic.post(`/api/create-users`, info);
        if (res.data.status_code === 403) {
          toast.error(res.data.message);
        }
        if (res.data.success) {
          // refetch();
          toast.success(res.data.message);
          navigate("/admin/login");
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen max-w-3xl mx-auto flex justify-center items-center w-full px-2">
        <div className="w-full">
          <div className="w-full card shadow-xl relative">
            <div className="flex justify-center">
              {/* <img src={logo} className="w-1/4 lg:w-1/3 border-white" alt="" /> */}
            </div>

            <h1 className="text-2xl text-center pt-3 pb-2 rounded-t-xl bg-gray-200 text-blue-700 lg:text-3xl font-semibold">
              Welcome to <br /> Tech Hub
            </h1>
            <form onSubmit={handleRegister} className="card-body text-black">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">First Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Last Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Phone *</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Password *</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Confirm Password *</span>
                  </label>
                  <input
                    type="password"
                    name="re_password"
                    placeholder="password"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Gender</span>
                  </label>
                  <Select onValueChange={(value) => setTypeName(value)}>
                    <SelectTrigger className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none rounded-sm">
                      <SelectValue placeholder="Select a Gender" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm bg-gray-700 border-gray-500 text-white">
                      <SelectItem className="duration-300" value="Male">
                        Male
                      </SelectItem>
                      <SelectItem className="duration-300" value="Female">
                        Female
                      </SelectItem>
                      <SelectItem className="duration-300" value="Others">
                        Others
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="form-control">
                  <label className="">
                    <span className="font-semibold">Image</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="border h-10 bg-gray-100 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                  />
                </div>
              </div>
              <div className="w-full mt-6 flex flex-col lg:flex-row gap-2 items-center">
                <button type="submit" className="button_primary w-full">
                  Register
                </button>
              </div>
              <div id="reader"></div>
              <p className="text-gray-700">
                Already have an account? Please
                <Link
                  className="text-gray-700 font-medium ml-2"
                  to="/admin/login"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-green-700/80 text-white px-4 py-1 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
          <span>&#9400; {year} all right reserved by Happy Budget</span>{" "}
          <span>Design & Developed by MD. FAHIM MUNTASHIR</span>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
