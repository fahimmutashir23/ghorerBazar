import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { url } from "../../../../connection";
import useUser from "../../../Security/useUser";
import Loader from "../../../Utils/Loader";
import Loader2 from "../../../Utils/Loader2";
import { FaUserCircle } from "react-icons/fa";
import QRCode from "qrcode";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const opts = {
  type: "image/pdf",
  quality: 1,
  margin: 1,
};

const Profile = () => {
  const [userData, isLoading, refetch] = useUser();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showPassField, setShowPassField] = useState(false);
  const [inputPass, setInputPass] = useState();
  const imgUrl = `${url}/Upload/profile/images/`;
  const [openBox, setOpenBox] = useState(false);
  const [showPass, setShowPass] = useState(0);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const encodeData = (data) => btoa(JSON.stringify(data));

  const handleGenerate = () => {
    const inputCode = { password: inputPass, email: userData.email };
    const encodedData = encodeData(inputCode);

    QRCode.toDataURL(encodedData, opts, (err, url) => {
      if (err) return console.log(err);
      setQrCode({ code: encodedData, url });
      setShowPassField(false);
    });
  };

  const handlePassChange = async (e) => {
    e.preventDefault()
    const currentPassword = e.target.oldPass.value;
    const newPassword = e.target.password.value;
    const confirmNewPassword = e.target.confirmPass.value;
    const info = {currentPassword, newPassword, confirmNewPassword};
    const res = await axiosSecure.put(`/api/change-password`, info);

    if(res.data.status_code === 200){
      toast.success(res.data.message);
      setOpenBox(false);
    }
    if(res.data.status_code === 401){
      toast.error(res.data.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-4 flex items-center">
      {loader && <Loader2 />}
      <div className="bg-_white border-2 relative border-bg_lightSlate rounded-md p-[20px] max-w-lg w-full mx-auto">
        <div>
          <div className="h-24 w-24 overflow-hidden rounded-full mx-auto">
            {userData._doc.image ? (
              <img
                src={`${imgUrl}${userData._doc.image}`}
                className="h-full w-full object-cover"
                alt=""
              />
            ) : (
              <FaUserCircle className="w-24 h-24 rounded-full text-black" />
            )}
          </div>
          <div className="mt-5">
            <div className="flex flex-col items-center space-y-2 mb-3">
              <p className="font-semibold text-xl">{userData._doc.name}</p>
              <p className="text-xs px-3 py-1 rounded-sm bg-blue-200 max-w-fit">
                {userData?._doc.role || "---"}
              </p>
              <div className="flex items-center gap-gap_primary text-gray-500">
                {formatDate(userData._doc.createdAt)}
                <div className="w-[1px] bg-gray-500 h-4"></div>
                {userData?._doc.gender || "---"}
              </div>
            </div>
            <hr />
            <p className="my-3 text-center text-gray-500">
              Activity Level: 45%
            </p>
            <hr />
            <div className="mt-3">
              <p className=" text-sm text-center text-gray-500">
                <strong>Email:</strong> {userData?._doc.email}
              </p>
              <p className=" text-sm text-center text-gray-500">
                <strong>Phone:</strong> {userData?._doc.phone}
              </p>
            </div>
            <div className="flex gap-gap_primary items-center justify-center my-mt_large">
              <div className="bg-green-600 w-full h-[3px]"></div>
              <div className="bg-green-500 w-full h-[3px]"></div>
              <div className="bg-green-400 w-full h-[3px]"></div>
              <div className="bg-green-300 w-full h-[3px]"></div>
            </div>

            <p className="my-4 text-gray-500 text-center">
              <strong>Address:</strong>
              <p>{userData?._doc.address || "---"}</p>
            </p>

            <hr />

            <button
              onClick={() => setIsOpen(true)}
              className="button_primary mt-4 w-full"
            >
              Edit
            </button>
            {/* {!showPassField && (
              <button
                onClick={() => setShowPassField(true)}
                className="button_secondary w-full mt-2"
              >
                Generate QR Code
              </button>
            )}
            {showPassField && (
              <p className="text-xs mt-1">
                if you input wrong password the qr code will not work.
              </p>
            )}
            {showPassField && (
              <div className="flex">
                <input
                  type="password"
                  name="name"
                  className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  onChange={(e) => setInputPass(e.target.value)}
                  placeholder="Input your password"
                  required
                />
                <button onClick={handleGenerate} className="button_secondary">
                  Generate
                </button>
              </div>
            )}
            {qrCode && (
              <div className="mt-2 flex flex-col w-32 mx-auto">
                <img src={qrCode.url} alt="" />
                <a
                  href={qrCode.url}
                  download
                  className="bg-blue-500 text-white font-semibold px-3 mt-1 text-center w-full"
                >
                  Download
                </a>
              </div>
            )} */}
            <div className="flex justify-center">
              <button
                onClick={() => setOpenBox(true)}
                className="text-blue-700 mt-2"
              >
                Change Password
              </button>
              <div
                className={`absolute bottom-0 w-full bg-blue-300 duration-300 h-0 ${
                  openBox ? "h-[50%]" : ""
                }`}
              >
                <form
                  className={`${openBox ? "" : "hidden"} flex flex-col gap-2 p-2`}
                  onSubmit={handlePassChange}
                >
                  <div>
                    <label className="font-semibold text-white">
                      Old Password
                    </label>
                    <input
                      type={showPass === 1 ? "text" : "password"}
                      name="oldPass"
                      className="bg-slate-50 py-1 focus:ring-0 px-2 text-lg focus:border w-full focus:outline-none border border-gray-400 relative"
                      placeholder="Input your password"
                      required
                    />
                    <span className="absolute right-5">
                      {showPass === 1 ? (
                        <IoEye
                          className="mt-2 text-lg text-gray-500"
                          onClick={() => setShowPass(0)}
                        />
                      ) : (
                        <IoEyeOff
                          className="mt-2 text-lg text-gray-500"
                          onClick={() => setShowPass(1)}
                        />
                      )}
                    </span>
                  </div>
                  <div>
                    <label className="font-semibold text-white">
                      New Password
                    </label>
                    <input
                      type={showPass === 2 ? "text" : "password"}
                      name="password"
                      className="bg-slate-50 py-1 focus:ring-0 px-2 text-lg focus:border w-full focus:outline-none border border-gray-400 relative"
                      placeholder="Input your password"
                      required
                    />
                    <span className="absolute right-5">
                      {showPass === 2 ? (
                        <IoEye
                          className="mt-2 text-lg text-gray-500"
                          onClick={() => setShowPass(0)}
                        />
                      ) : (
                        <IoEyeOff
                          className="mt-2 text-lg text-gray-500"
                          onClick={() => setShowPass(2)}
                        />
                      )}
                    </span>
                  </div>
                  <div>
                    <label className="font-semibold text-white">
                      Confirm New Password
                    </label>
                    <input
                      type={showPass === 3 ? "text" : "password"}
                      name="confirmPass"
                      className="bg-slate-50 py-1 focus:ring-0 px-2 text-lg focus:border w-full focus:outline-none border border-gray-400 relative"
                      placeholder="Input your password"
                      required
                    />
                    <span className="absolute right-5">
                      {showPass === 3 ? (
                        <IoEye
                          className="mt-2 text-lg text-gray-500"
                          onClick={() => setShowPass(0)}
                        />
                      ) : (
                        <IoEyeOff
                          className="mt-2 text-lg text-gray-500"
                          onClick={() => setShowPass(3)}
                        />
                      )}
                    </span>
                  </div>
                  <button onClick={handleGenerate} className="py-1 px-3 bg-blue-700 text-white">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <UpdateProfile
          setLoader={setLoader}
          data={userData._doc}
          fetchData={refetch}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default Profile;
