import { useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import Loader2 from "@/Utils/Loader2";

const InvoiceModal = ({isOpen, setIsOpen}) => {
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {invoiceId} = useContext(BasicContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.post(`/api/get-bookings-w-id`, {invoiceId})
      if(res.data.status_code === 200){
        setData(res.data.result)
      }
    }

    fetchData();
  }, [setIsOpen])

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if(!data) return <Loader2 />

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
                      className="border px-4 text-xl bg-gray-700 text-white flex items-center justify-between"
                    >
                      <h6 className="py-1 text-xl font-semibold">
                        Invoice
                      </h6>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text_color close-button "
                      >
                        <IoMdClose />
                      </button>
                    </Dialog.Title>
                    <div className="mx-auto p-4 bg-white shadow-md rounded-md">
                      <section className="mb-6 flex justify-between">
                        <div>
                          <h1 className="text-2xl font-bold mb-6">Invoice</h1>
                          <h3 className="text-xl font-semibold mb-2">
                            Bill To:
                          </h3>
                          <div>
                            <p className="text-sm">
                              <strong>Customer Name: </strong>
                              {data.name}
                            </p>
                            <p className="text-sm">
                              <strong>Customer Phone: </strong>
                              {data.phone}
                            </p>
                            <p className="text-sm">
                              <strong>Customer Email: </strong>
                              {data.email}
                            </p>
                            <p className="text-sm">
                              <strong>Customer Address: </strong>
                              {data.address}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-4xl font-semibold">LOGO</h2>
                          <h2 className="text-xl font-semibold">Tech Hub</h2>
                          <p className="text-sm">Your Address Line 1</p>
                          <p className="text-sm">City, State, Zip Code</p>
                          <p className="text-sm">
                            Email: your-email@example.com
                          </p>
                          <p className="text-sm">Phone: (123) 456-7890</p>
                          <div className="mt-6">
                            <p className="text-sm">
                              <strong>Order ID: </strong>
                              {invoiceId}
                            </p>
                            <p className="text-sm">
                              <strong>Date: </strong>
                              {formatDate(data.createdAt)}
                            </p>
                          </div>
                        </div>
                      </section>

                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="w-full bg-gray-100">
                            <th className="py-2 text-left px-4">Description</th>
                            <th className="py-2 px-4 text-center">Quantity</th>
                            <th className="py-2 px-4 text-center">Unit Price</th>
                            <th className="py-2 px-4 text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.products?.map((product) => (
                            <tr key={product._id} className="border-t">
                              <td className="py-2 px-4">
                                {product.productId.name}
                              </td>
                              <td className="py-2 text-center px-4">
                                {product.quantity}
                              </td>
                              <td className="py-2 text-center px-4">
                                {product.productId.price}
                              </td>
                              <td className="py-2 text-center px-4">
                                {product.productId.price * product.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <section className="mt-6">
                        <div className="flex justify-end items-center">
                          <div className="text-right">
                            <p className="text-sm">Tax (00%): 00</p>
                            <p className="text-md font-semibold">
                              Total: {data.totalAmount}/-
                            </p>
                          </div>
                        </div>
                      </section>
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

export default InvoiceModal;
