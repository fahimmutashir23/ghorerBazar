import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import OrderModal from "@/Pages/Modal/OrderModal";
import { imgUrl } from "@/Utils/imageUrl";
import Loader2 from "@/Utils/Loader2";
import { useContext, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import useDeliveryCharge from "@/Hooks/useDeliveryCharge";

const CartBar = () => {
  const axiosPublic = useAxiosPublic();
  const { cartBar, setCartBar, delCharge, setDelCharge } =
    useContext(BasicContext);
  const [cart, cartLoading, cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
  const [isOpen, setIsOpen] = useState(false);
  const [delivery] = useDeliveryCharge();
  const [desiredQuantities, setDesiredQuantities] = useState({});

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

  const setQuantity = async (id, quantity) => {
    try {
      const res = await axiosPublic.put(
        `/api/update-cart/${id}`,
        { quantity },
        { withCredentials: true }
      );

      if (res.data.status_code === 200) {
        cartFetch();
        totalCartFetch();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle changes in quantity input
  const handleQuantityChange = (id, quantity) => {
    setDesiredQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  if (cartLoading) return <Loader2 />;

  // Increase quantity by 1
  const incrementQuantity = (id) => {
    const newQuantity =
      (desiredQuantities[id] ||
        cart.result.find((item) => item._id === id).quantity) + 1;
    handleQuantityChange(id, newQuantity);
    setQuantity(id, newQuantity);
  };

  // Decrease quantity by 1
  const decrementQuantity = (id) => {
    const currentQuantity =
      desiredQuantities[id] ||
      cart.result.find((item) => item._id === id).quantity;
    const newQuantity = Math.max(currentQuantity - 1, 1);
    handleQuantityChange(id, newQuantity);
    setQuantity(id, newQuantity);
  };

  return (
    <div
      className={`fixed bg-slate-200 h-screen overflow-y-scroll top-0 w-[300px] lg:w-[400px] ${
        cartBar ? "right-0" : "-right-[400px]"
      } transition-all duration-300 py-2 border-l-2 border-black overflow-y-auto flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between px-3">
          <h1 className="font-medium lg:text-2xl">Shopping Cart</h1>
          <Link
            onClick={() => setCartBar(false)}
            className="flex items-center gap-2 text-color_1 font-semibold"
            to="/cart"
          >
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
            <div key={item._id} className="flex gap-2 lg:px-3">
              <div className="w-1/3 border p-2 lg:h-28">
                <img
                  src={`${imgUrl.product}${item.images}`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-2/3">
                <h1 className="font-medium text-base lg:text-xl">
                  {item.name}
                </h1>
                <h3 className="font-semibold text-base lg:text-xl">
                  TK {item.price}
                </h3>
                <div className="flex gap-3">
                  <div className="bg-color_3 text-white lg:py-1 lg:px-3 rounded-sm flex">
                    <button
                      onClick={() => decrementQuantity(item._id)}
                      className="font-bold px-2 text-2xl text-white"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={desiredQuantities[item._id] || item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item._id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      onBlur={(e) =>
                        setQuantity(item._id, parseInt(e.target.value) || 1)
                      }
                      className="p-1 w-16 text-xl text-center bg-transparent"
                    />
                    <button
                      onClick={() => incrementQuantity(item._id)}
                      className="font-bold px-2 text-2xl text-white"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-color_1 px-3"
                  >
                    <MdDelete className="text-2xl text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      {cart.result.length > 0 && (
        <div className="bg-white p-3">
          <RadioGroup onValueChange={(value) => setDelCharge(value)}>
            {delivery.map((charge, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={charge.amount} id={charge._id} />
                <label htmlFor={charge._id}>{charge.name}</label>
                <span className="font-bold">{charge.amount} BDT</span>
              </div>
            ))}
          </RadioGroup>
          <p className="flex justify-between font-semibold md:text-xl">
            <span>Total Price</span>{" "}
            <span>{cart.totalAmount + delCharge}/-</span>
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="button_primary w-full mt-4"
          >
            Checkout
          </button>
        </div>
      )}
      <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default CartBar;
