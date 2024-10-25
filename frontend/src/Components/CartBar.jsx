import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import OrderModal from "@/Pages/Modal/OrderModal";
import Loader2 from "@/Utils/Loader2";
import { useContext, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartBar = () => {
  const axiosPublic = useAxiosPublic();
  const { cartBar, setCartBar } = useContext(BasicContext);
  const [cart, cartLoading, cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(`/api/delete-cart/${id}`, {
      withCredentials: true,
    });
    if (res.data.status_code === 200) {
      toast.success("Delete Successful");
      cartFetch();
      totalCartFetch();
    }
  };

  if (cartLoading) return <Loader2 />;

  return (
    <div
      className={`fixed bg-slate-200 h-screen overflow-y-scroll top-0 w-[400px] ${
        cartBar ? "right-0" : "-right-[400px]"
      } transition-all duration-300 py-2 border-l-2 border-black overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-3">
        <h1 className="font-medium text-2xl">Shopping Cart</h1>
        <Link className="flex items-center gap-2 text-color_1 font-semibold" to='/cart'>
        View Cart
          <FaExternalLinkAlt className="mb-1" />
        </Link>
        <IoClose
          onClick={() => setCartBar(false)}
          className="text-3xl font-bold hover:cursor-pointer"
        />
      </div>
      <div className="h-0.5 my-2 bg-black"></div>
      {/* Main Cart=============== */}
      <div>
        {cart.result.map((item) => (
          <div key={item._id} className="flex gap-3 px-3">
            <div className="w-1/3 border p-2 h-28">
              <img
                src={item.images}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="w-2/3">
              <h1 className="font-medium text-xl">{item.name}</h1>
              <h3 className="font-semibold text-xl">TK {item.price}</h3>
              <div className="flex gap-3">
                <div className="bg-color_1 text-white py-1 px-3 rounded-sm flex gap-8">
                  <button className="text-xl font-bold flex-1">+</button>
                  <span className="text-xl font-bold flex-1">00</span>
                  <button className="text-xl font-bold flex-1">-</button>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="button_delete"
                >
                  <MdDelete className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-3">
        <p className="flex justify-between font-semibold md:text-xl">
          <span>Total Price</span> <span>{cart.totalAmount}/-</span>
        </p>
        <button onClick={() => setIsOpen(true)} className="button_primary w-full mt-4">Checkout</button>
      </div>
      <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CartBar;
