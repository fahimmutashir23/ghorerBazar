import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useUser from "@/Security/useUser";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img1 from "@/assets/asset/about/cash.jpg"
import img2 from "@/assets/asset/about/cash2.jpg"
import img3 from "@/assets/asset/about/cash3.jpg"
import img4 from "@/assets/asset/about/cash4.jpg"
import img5 from "@/assets/asset/about/cash5.jpg"
import img6 from "@/assets/asset/about/cash6.jpg"
const bgImage = {
  bg1: "https://i.postimg.cc/Nj3L2Syk/cash2.jpg",
  bg2: "https://i.postimg.cc/bYgGVmMq/cash3.jpg",
  bg3: "https://i.postimg.cc/SNKnBWFC/cash4.jpg",
  bg4: "https://i.postimg.cc/CL6RSzSt/cash5.jpg",
  bg5: "https://i.postimg.cc/4x7mds33/cash6.jpg",
  bg6: "https://i.postimg.cc/d35L70dh/cash.jpg",
};

const Settings = ({ isOpen, setIsOpen }) => {
  const currentDate = moment().format("DD-MM-YYYY");
  const [userData, , refetch] = useUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { setThemeCall, themeCall } = useContext(BasicContext);

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("/api/logout");
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.removeItem("token");
        refetch();
        toast.success("Logout Successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleThemeChange = (firstColor, secondColor) => {
    const theme = { firstColor, secondColor };
    const stringifyColor = JSON.stringify(theme);
    localStorage.setItem("theme", stringifyColor);
    setThemeCall(!themeCall);
  };

  const handleBgChange = (img) => {
    const stringifyColor = JSON.stringify(img);
    localStorage.setItem("bg", stringifyColor);
    setThemeCall(!themeCall);
  };

  return (
    <>
      <div className="">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            className={`relative z-50`}
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed bg-black/25" />
            </Transition.Child>
            <div
              className={`fixed bottom-4 left-0 lg:left-4 w-full max-w-xl overflow-y-auto`}
            >
              <div className="flex min-h-full items-center justify-center text-center">
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Panel className="max-w-2xl w-full rounded-t-md text-left shadow-lg transition-all bg-gray-700 border overflow-hidden">
                    <Dialog.Title className="px-4 bg-gray-700 border-b text-white flex items-center justify-between">
                      <h6 className="py-1 text-xl font-semibold">
                        {userData?.name}
                      </h6>
                      <span className="font-semibold text-lg">
                        {currentDate}
                      </span>
                    </Dialog.Title>
                    <div className="text-white m-4 space-y-4">
                      <div>
                        <h1 className="text-center">Change Theme</h1>
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-violet-800/80",
                                "bg-blue-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-violet-800 h-5 w-4"></div>
                            <div className="bg-blue-700 w-4 h-5"></div>
                          </button>
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-green-800/80",
                                "bg-green-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-green-800 h-5 w-4"></div>
                            <div className="bg-green-700 w-4 h-5"></div>
                          </button>
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-red-800/80",
                                "bg-red-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-red-800 h-5 w-4"></div>
                            <div className="bg-red-700 w-4 h-5"></div>
                          </button>
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-orange-800/80",
                                "bg-orange-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-orange-500 h-5 w-4"></div>
                            <div className="bg-orange-600 w-4 h-5"></div>
                          </button>
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-yellow-800/80",
                                "bg-yellow-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-yellow-500 h-5 w-4"></div>
                            <div className="bg-yellow-400 w-4 h-5"></div>
                          </button>
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-slate-800/80",
                                "bg-slate-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-slate-500 h-5 w-4"></div>
                            <div className="bg-slate-400 w-4 h-5"></div>
                          </button>
                          <button
                            onClick={() =>
                              handleThemeChange(
                                "bg-emerald-800/80",
                                "bg-emerald-700/80"
                              )
                            }
                            className="flex"
                          >
                            <div className="bg-emerald-500 h-5 w-4"></div>
                            <div className="bg-emerald-400 w-4 h-5"></div>
                          </button>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-center">Change Background</h1>
                        <div className="flex gap-4 justify-center">
                          <button onClick={() => handleBgChange(bgImage.bg1)}><img src={img2} alt="" className="w-14 border" /></button>
                          <button onClick={() => handleBgChange(bgImage.bg2)}><img src={img3} alt="" className="w-14 border" /></button>
                          <button onClick={() => handleBgChange(bgImage.bg3)}><img src={img4} alt="" className="w-14 border" /></button>
                          <button onClick={() => handleBgChange(bgImage.bg4)}><img src={img5} alt="" className="w-14 border" /></button>
                          <button onClick={() => handleBgChange(bgImage.bg5)}><img src={img6} alt="" className="w-14 border" /></button>
                          <button onClick={() => handleBgChange(bgImage.bg6)}><img src={img1} alt="" className="w-14 border" /></button>
                        </div>
                      </div>
                      <div>
                        <p><span className="text-red-500 font-medium">Version :</span> 1.2.0</p>
                        <div className="-space-y-1">
                        <p><span className="text-red-500 font-medium">Developed :</span></p>
                        <p><span className="">Md Fahim Muntashir</span></p>
                        <p><span className="text-sm">MERN Stack Developer</span></p>
                        <p><span className="text-sm">mdfahim.muntashir28@gmail.com</span></p>
                        <p><span className="text-sm">+880 1581 868984</span></p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="button_secondary w-full"
                      >
                        Logout
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Settings;
