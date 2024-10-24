import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { url } from "../../../../connection";
import useUser from "../../../Security/useUser";
import Loader from "../../../Utils/Loader";
import Loader2 from "../../../Utils/Loader2";
import { FaUserCircle } from "react-icons/fa";
import QRCode from "qrcode";

const opts = {
  type: "image/pdf",
  quality: 1,
  margin: 1,
};

const Profile = () => {
  const [userData, isLoading, refetch] = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showPassField, setShowPassField] = useState(false)
  const [inputPass, setInputPass] = useState();
  const imgUrl = `${url}/upload/profile/images/`;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const encodeData = (data) => btoa(JSON.stringify(data));

  const handleGenerate = () => {
    const inputCode = { password: inputPass, email: userData.email};
    const encodedData = encodeData(inputCode);

    QRCode.toDataURL(encodedData, opts, (err, url) => {
      if (err) return console.log(err);
      setQrCode({ code: encodedData, url });
      setShowPassField(false)
    });
  };


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-4 flex items-center">
      {loader && <Loader2 />}
      <div className="bg-_white border-2 border-bg_lightSlate rounded-md p-[20px] max-w-lg w-full mx-auto">
        <div>
          <div className="h-24 w-24 overflow-hidden rounded-full mx-auto">
            {userData.image ? (
              <img
                src={`${imgUrl}${userData.image}`}
                className="h-full w-full object-cover"
                alt=""
              />
            ) : (
              <FaUserCircle className="w-24 h-24 rounded-full text-black" />
            )}
          </div>
          <div className="mt-5">
            <div className="flex flex-col items-center space-y-2 mb-3">
              <p className="font-semibold text-xl">{userData.name}</p>
              <p className="text-xs px-pl_primary py-1 rounded-sm bg-bg_lightSlate max-w-fit">
                {userData?.role || "---"}
              </p>
              <div className="flex items-center gap-gap_primary text-gray-500">
                {formatDate(userData.createdAt)}
                <div className="w-[1px] bg-gray-500 h-4"></div>
                {userData?.gender || "---"}
              </div>
            </div>
            <hr />
            <p className="my-3 text-center text-gray-500">
              Activity Level: 45%
            </p>
            <hr />
            <div className="mt-3">
              <p className=" text-sm text-center text-gray-500">
                <strong>Email:</strong> {userData?.email}
              </p>
              <p className=" text-sm text-center text-gray-500">
                <strong>Phone:</strong> {userData?.phone}
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
              <p>{userData?.address || "---"}</p>
            </p>

            <hr />

            <button
              onClick={() => setIsOpen(true)}
              className="button_primary mt-4 w-full"
            >
              Edit
            </button>
            {!showPassField && <button onClick={() => setShowPassField(true)} className="button_secondary w-full mt-2">
              Generate QR Code
            </button>}
            {showPassField && <p className="text-xs mt-1">if you input wrong password the qr code will not work.</p>}
            {showPassField && <div className="flex">
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
            </div>}
            {qrCode && (
              <div className="mt-2 flex flex-col w-32 mx-auto">
                <img src={qrCode.url} alt="" />
                <a href={qrCode.url} download className="bg-blue-500 text-white font-semibold px-3 mt-1 text-center w-full">Download</a>
              </div>
            )}
          </div>
        </div>
        <UpdateProfile
          setLoader={setLoader}
          data={userData}
          fetchData={refetch}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default Profile;
