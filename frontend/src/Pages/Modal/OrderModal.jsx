import { useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import { useNavigate } from "react-router-dom";
import useTotalCart from "@/Hooks/useTotalCart";
import { BasicContext } from "@/ContextAPIs/BasicProvider";

const OrderModal = ({ isOpen, setIsOpen }) => {
  const [animate, setAnimate] = useState(false);
  const { delCharge } = useContext(BasicContext);
  const axiosSecure = useAxiosPublic();
  const [cart, , cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(delCharge === 0) return toast.error("Select delivery charge")
    setLoading(true);
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const details = e.target.details.value;

    const info = {
      name,
      phone,
      email,
      address,
      details,
      deliveryCharge: delCharge,
      totalAmount: cart.totalAmount + delCharge,
      products: cart.result
      // products: cart.result.map((item) => (
      //   {productId: item.productId, quantity: item.quantity}
      // ))
    }

    try {
      const res = await axiosSecure.post("/api/save-bookings", info, {withCredentials: true});
      if(res.data.status_code === 400){
        return toast.error(res.data.message)
      }
      if (res.data.status_code === 200) {
        toast.success(res.data.message);
        cartFetch();
        totalCartFetch();
        e.target.reset()
        setLoading(false)
        setIsOpen(false)
        navigate('/invoice', {state: res.data.result})
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data)
      setIsOpen(false)
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
                      className="border px-4 bg-color_1 text-white flex items-center justify-between"
                    >
                      <h6 className="py-1 lg:py-2 lg:text-2xl font-semibold">Make Order</h6>
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
                            Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="bg-white py-1 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Phone
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="phone"
                            className="bg-white py-1 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Address
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="address"
                            className="bg-white py-1 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="">
                          <label className="font-semibold">
                            Email
                            <span className="text-red-400 ml-1">
                              
                            </span>{" "}
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="bg-white py-1 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
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
                      <div className="border flex-row-reverse text-xl bg-color_1 flex items-center justify-between">
                        <button
                          className="button_primary"
                          disabled={loading}
                        >
                          {loading ? "loading..." : "Submit"}
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

export default OrderModal;
