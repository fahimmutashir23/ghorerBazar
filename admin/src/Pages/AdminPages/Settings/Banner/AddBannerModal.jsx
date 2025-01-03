import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { button } from "@/Utils/Class/button";

const AddBannerModal = ({ fetchData, setLoader, collectionFetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [mainB, setMainB] = useState([]);
  const [name, setName] = useState();

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    formData.append("banner", mainB);
    formData.append("name", name);

    try {
      const res = await axiosSecure.post("/api/create-banner", formData);
      if (res.data.success) {
        setIsOpen(false);
        fetchData();
        collectionFetch();
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
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`${button.tableButton} flex items-center gap-2`}
        >
          <IoAddCircleOutline className="text-2xl font-bold" />
          <span className="mt-1">Add Banner</span>
        </button>
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
                        Add Banner
                      </h6>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text_color close-button "
                      >
                        <IoMdClose />
                      </button>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <div className="">
                          <label className="font-semibold">
                            Banner Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <Select
                            required
                            onValueChange={(value) => setName(value)}
                          >
                            <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"1"}>Main Banner</SelectItem>
                              <SelectItem value={"2"}>Offer Banner</SelectItem>
                              <SelectItem value={"3"}>Left Ads</SelectItem>
                              <SelectItem value={"4"}>Right Ads</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Banner Image/Video
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="file"
                            name=""
                            onChange={(e) => setMainB(e.target.files[0])}
                            required
                          />
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

export default AddBannerModal;
