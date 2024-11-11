import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
import ImageUploading from "react-images-uploading";
import uploadIcon from "@/assets/asset/upload.png";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const AddBannerModal = ({ fetchData, setLoader, collectionFetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const imgPreviewer = (imageList, addUpdateIndex) => {
    setImages(imageList);
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

    const formData = new FormData();
    formData.append("banner", images[0].file);

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
      toast.error(error.response.data);
      setLoader(false);
    }
  };


  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500 flex items-center gap-2"
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
                      <div className="m-4 ">
                        <div className="">
                          <label className="font-semibold">
                            Product Image
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
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
                              // onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              <div className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700 flex h-[89%] items-center justify-center">
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
                                      className="w-12 md:w-1/5 object-cover mx-auto"
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
