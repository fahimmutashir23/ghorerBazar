/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import ImageUploading from "react-images-uploading";
import uploadIcon from "@/assets/asset/upload.png";

const AddUserModal = ({ fetchData, isOpen, setIsOpen, collectionFetch }) => {
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const imgPreviewer = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const { data: roleData = [] } = useQuery({
    queryKey: ["role_data"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/get-create-users`);
      return res.data.result;
    },
  });

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const mobile = e.target.mobile.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password_confirmation = e.target.password_confirmation.value;
    const gender = e.target.gender.value;

    if (password !== password_confirmation) {
      return toast.error("password does not matched");
    }

    if (mobile.length !== 11) {
      return toast.error("Mobile must be type 11");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", mobile);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("role", role);
    images && formData.append("images", images);

    try {
      const res = await axiosSecure.post(`/api/create-users`, formData);
      if (res.data.status_code === 409) {
        return toast.error(res.data.message);
      }
      if (res.data.status_code === 200) {
        fetchData();
        collectionFetch();
        toast.success(res.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      setIsOpen(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className={`relative z-50`} onClose={handleAnimate}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
            <div
              className={`fixed inset-0 overflow-y-auto ${
                animate ? "scale-animation" : ""
              }`}
            >
              <div className="flex min-h-full items-center justify-center text-center border text_font">
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Panel className="w-[96%] md:w-[90%] lg:w-[75%] xl:w-[910px] max-w-md:w-[60%] transform rounded-md bg-_white text-left align-middle shadow-xl transition-all my-10 pb-0">
                    <Dialog.Title className="border px-4 py-2.5 bg-bg_selected text-_white text-xl flex items-center justify-between pr-4">
                      <h6 className="">Add New User</h6>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-2xl"
                      >
                        <IoMdClose />
                      </button>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gap_primary m-4">
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Full Name*
                            </span>
                          </label>
                          <input
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700"
                            required
                          />
                        </div>
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Phone*
                            </span>
                          </label>
                          <input
                            name="mobile"
                            type="number"
                            placeholder="Enter your phone number"
                            className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700"
                            required
                          />
                        </div>
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Email*
                            </span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            placeholder="Email address"
                            className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700"
                            required
                          />
                        </div>
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Password*
                            </span>
                          </label>
                          <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700"
                            required
                          />
                        </div>
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Confirm Password*
                            </span>
                          </label>
                          <input
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700"
                            required
                          />
                        </div>
                        <div className="form-control row-span-3">
                          <label className="">
                            <span className="font-semibold label-text">
                              Image
                            </span>
                          </label>
                          <ImageUploading
                            value={images}
                            onChange={imgPreviewer}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              <div className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700 h-full flex items-center justify-center">
                                {images.length === 0 && (
                                  <button
                                    className=""
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >
                                    <img
                                      src={uploadIcon}
                                      className="w-12 md:w-1/4 object-cover mx-auto"
                                      alt=""
                                    />
                                    Click or Drop here
                                  </button>
                                )}
                                {imageList.map((image, index) => (
                                  <div key={index} className="">
                                    <div className="w-32 h-28 mx-auto">
                                      <img
                                        src={image["data_url"]}
                                        alt="data"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="mt-2 flex gap-2 items-center justify-center">
                                      <button
                                        className="bg-blue-500 text-white px-3 rounded-sm"
                                        onClick={() => onImageUpdate(index)}
                                      >
                                        Update
                                      </button>
                                      <button
                                        className="bg-blue-500 text-white px-3 rounded-sm"
                                        onClick={() => onImageRemove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {/* <button
                                        className="bg-blue-500 text-white px-3 rounded-sm"
                                        onClick={onImageRemoveAll}
                                      >
                                        Remove all images
                                      </button> */}
                              </div>
                            )}
                          </ImageUploading>
                        </div>
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Gender{" "}
                            </span>
                          </label>
                          <select
                            name="gender"
                            className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700"
                            required
                          >
                            <option value="" disabled selected>
                              Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        <div className="form-control row-span-1">
                          <label className="">
                            <span className="font-semibold label-text">
                              Select Role*{" "}
                            </span>
                          </label>
                          <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roleData.map((item, idx) => (
                                <SelectItem key={idx} value={item.roleName}>
                                  {item.roleName}
                                </SelectItem>
                              ))}
                              {/* <SelectItem value="1">Daily</SelectItem> */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="border bg-bg_selected text-white text-xl flex justify-between items-center flex-row-reverse gap-2">
                        <button type="submit" className="button_primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="button_delete"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>{" "}
                      </div>
                    </form>
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

export default AddUserModal;
