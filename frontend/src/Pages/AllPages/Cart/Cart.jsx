import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import OrderModal from "@/Pages/Modal/OrderModal";
import PageHeader from "@/Shared/PageHeader";
import { imgUrl } from "@/Utils/imageUrl";
import Loader2 from "@/Utils/Loader2";
import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import useDeliveryCharge from "@/Hooks/useDeliveryCharge";
import { BasicContext } from "@/ContextAPIs/BasicProvider";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const [cart, cartLoading, cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
  const [isOpen, setIsOpen] = useState(false);
  const [desiredQuantities, setDesiredQuantities] = useState({});
  const [delivery] = useDeliveryCharge();
  const {delCharge, setDelCharge} = useContext(BasicContext);

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
    <div>
      <PageHeader name={"Shopping Cart"} />
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-black flex justify-between font-semibold text-lg mt-3 px-3">
          <span>Image</span>
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Action</span>
        </div>
        <div className="w-full space-y-5">
          {cart.result.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center gap-3 px-3 w-full border-b border-black"
            >
              <div className=" border p-2 h-28">
                <img
                  src={`${imgUrl.product}${item.images}`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <h1 className="font-medium text-xl">{item.name}</h1>
              <h3 className="font-semibold text-xl">TK {item.price}</h3>
              <div className="bg-color_1 text-white py-1 rounded-sm flex items-center">
                <button
                  onClick={() => decrementQuantity(item._id)}
                  className="font-bold px-4 text-2xl text-white"
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
                  className="font-bold px-4 text-2xl text-white"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="button_delete"
              >
                <MdDelete className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
        <div className="p-3 my-4 flex justify-end">
          {cart.result.length > 0 && (
            <div className="w-full max-w-xl border p-3">
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
                <span>Total Price</span> <span>{cart.totalAmount + delCharge}/-</span>
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="button_primary w-full mt-4"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Cart;
