import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ImUpload } from "react-icons/im";

const AddCompanyModal = ({
  fetchData,
  setLoader,
  isOpen,
  setIsOpen,
  data
}) => {
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const name = e.target.name.value;
    const owner = e.target.owner.value;
    const shopAdd = e.target.shopAdd.value;
    const category = e.target.category.value;
    const logo = e.target?.logo?.files[0] || null;
    const phone1 = e.target.phone1.value;
    const phone2 = e.target?.phone2?.value || null;
    const email = e.target?.email?.value || null;
    const map = e.target.map.value;
    const details = e.target.details.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ownerName", owner);
    formData.append("shopName", shopAdd);
    formData.append("category", category);
    logo && formData.append("logo", logo);
    formData.append("phone1", phone1);
    phone2 && formData.append("phone2", phone2);
    email && formData.append("email", email);
    formData.append("map", map);
    formData.append("details", details);

    try {
      const res = await axiosSecure.put(`/api/edit-company-profile/${data._id}`, formData);
      if (res.data.success) {
        setIsOpen(false);
        fetchData();
        toast.success(res.data.message);
        e.target.reset();
        setLoader(false);
      }
    } catch (error) {
      fetchData();
      toast.error(error.response.data.message);
      setLoader(false);
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
              <div className="flex min-h-full items-center justify-center text-center border">
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Panel className="w-[96%] md:w-[90%] lg:w-[75%] xl:w-[910px] max-w-md:w-[60%] transform rounded-md text-left align-middle shadow-xl transition-all my-10 pb-0 bg-white">
                    <Dialog.Title
                      as="h3"
                      className="border px-4 text-xl bg-gray-700 text-white flex items-center justify-between h-14"
                    >
                      <h6 className="py-2 text-2xl font-semibold">
                        Add Company
                      </h6>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text_color close-button "
                      >
                        <IoMdClose className="text-2xl" />
                      </button>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <div className="">
                          <label className="font-semibold">
                            Company Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={data.name}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Shop Address
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="shopAdd"
                            defaultValue={data.address.shopName}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Owner Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="owner"
                            defaultValue={data.ownerName}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Category
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="category"
                            defaultValue={data.category}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Phone 1
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="phone1"
                            defaultValue={data.address.phone.phone1}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Phone 2<span className="text-red-400 ml-1"></span>{" "}
                          </label>
                          <input
                            type="number"
                            name="phone2"
                            defaultValue={data.address.phone.phone2}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Email
                            <span className="text-red-400 ml-1"></span>{" "}
                          </label>
                          <input
                            type="email"
                            name="email"
                            defaultValue={data.address.email}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Map Embed Link
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="map"
                            defaultValue={data.address.map}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                          />
                        </div>
                        <div className="relative">
                          <label className="font-semibold">
                            Company Logo
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            name="logo"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 h-full z-50 opacity-0 hover:bg-black"
                          />
                          {!selectedImage && <div className="w-full h-full absolute top-8 -z-10 hover:bg-black">
                          <ImUpload className="w-full h-32" />
                          </div>}
                          
                          {selectedImage && (
                            <div className="absolute top-2 left-0 z-50 w-full">
                            <div className="mt-4 h-36 w-full overflow-hidden">
                              <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-full object-cover"
                              />
                            </div>
                              <button
                                onClick={() => setSelectedImage(null)}
                                className="mt-2 w-full bg-gray-500 text-white rounded-md hover:bg-red-600 max-w-fit absolute bottom-2 right-2"
                              >
                                <IoMdClose className="text-3xl" />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Company Details
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <textarea
                            name="details"
                            defaultValue={data.details}
                            className="bg-white focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                            rows="6"
                          ></textarea>
                        </div>
                      </div>
                      <div className="border text-xl bg-gray-700 flex items-center justify-between">
                        <button type="submit" className="button_primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="button_secondary"
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

export default AddCompanyModal;
