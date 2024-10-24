import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddProductModal = ({ fetchData, setLoader, collectionFetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  
  

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const name = e.target.name.value;
    const brand = e.target.brand.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
    const images = e.target.image.files[0];
    const details = e.target.details.value;

    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('brand', brand)
    formData.append('category', category)
    formData.append('details', details)
    formData.append('images', images)

    try {
      const res = await axiosSecure.post("/api/create-product", formData);
      if (res.data.success) {
        setIsOpen(false)
        fetchData();
        collectionFetch()
        toast.success(res.data.message);
        e.target.reset()
        setLoader(false)
      }
    } catch (error) {
      fetchData()
      toast.error(error.response.data)
      setLoader(false)
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
          <span className="mt-1">Add Product</span>
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
                      <h6 className="py-2 text-2xl font-semibold">Add Product</h6>
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
                            Product Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Brand Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="brand"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Product Price
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="price"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Product Category
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="category"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Product Image
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="file"
                            name="image"
                            className="bg-white mt-3 focus:ring-0 px-4 focus:border w-full focus:outline-none"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                      </div>
                        <div className="px-4">
                          <label className="font-semibold">
                            Product Details
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <textarea 
                          name="details"
                            className="bg-white focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required 
                            rows="5"></textarea>
                        </div>
                      <div className="border text-xl bg-gray-700 flex items-center justify-between">
                        <button
                          type="submit"
                          className="button_primary"
                        >
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

export default AddProductModal;
