import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader2 from "../../../Utils/Loader2";
import { useNavigate } from "react-router-dom";

const AddExpenseModal = ({ setProducts, products, setTotalAmount, totalAmount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ["get-expense-cat"],
    queryFn: async () => {
      const res = await axiosSecure("/api/get-expenseCategory-list");
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
    const name = e.target.name.value
    const amount = e.target.amount.value
    const details = e.target.details.value
    const category = e.target.category.value
    const info = {name, amount, details, category}
    setProducts([...products, info])
    setTotalAmount(parseInt(totalAmount) + parseInt(amount))
    setIsOpen(false)
    navigate('/admin/expenseList')
  };

  if (isLoading) return <Loader2 />;

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className=" bg-gray-700 text-white px-5 h-10 font-bold duration-500 flex items-center gap-2"
        >
          <IoAddCircleOutline className="text-2xl font-bold" />
          <span className="mt-1">Add Expense</span>
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
                        Create Expense
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
                            Expense Name
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
                            Expense Amount
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="amount"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div>
                          <label className="font-semibold">
                            Expense Category
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <select
                            name="category"
                            className="bg-white h-12 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            required
                          >
                            {data.map((item) => (
                              <option key={item._id}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Details
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <textarea
                            name="details"
                            rows="2"
                            className="bg-white focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            required
                          ></textarea>
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

export default AddExpenseModal;
