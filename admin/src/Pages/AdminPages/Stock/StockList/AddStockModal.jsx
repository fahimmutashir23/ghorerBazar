import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddStockModal = ({ product, isOpen, setIsOpen, fetchData }) => {
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
    const name = e.target.name.value
    const amount = e.target.amount.value
    const quantity = e.target.quantity.value
    const newQuantity = e.target.newQuantity.value
    const info = {name, amount, quantity: parseInt(quantity) + parseInt(newQuantity)}

    // setIsOpen(false)

    try {
      const res = await axiosSecure.put(`/api/update-stock/${product._id}`, info)
    if(res.data.success){
      toast.success(res.data.message)
      fetchData()
      setIsOpen(false)
    }
    } catch (error) {
      toast.error(error.response.data);
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
                      className="border px-4 text-xl bg-gray-700 text-white flex items-center justify-between py-2"
                    >
                      <h6 className="py-2 text-2xl font-semibold">
                        Add Stock
                      </h6>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text_color close-button "
                      >
                        <IoMdClose className="text-2xl" />
                      </button>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                            defaultValue={product?.name}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                            disabled
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Unit Price
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="amount"
                            defaultValue={product?.unitPrice}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Exist Quantity
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            defaultValue={product?.quantity}
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                            disabled
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            New Quantity
                            <span className="text-red-400 ml-1">
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="newQuantity"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                          />
                        </div>
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

export default AddStockModal;
