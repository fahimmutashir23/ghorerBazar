import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import PageHeader from "@/Shared/PageHeader";
import Loader2 from "@/Utils/Loader2";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const [cart, cartLoading, cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();

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
            <div key={item._id} className="flex justify-between items-center gap-3 px-3 w-full border-b border-black">
              <div className=" border p-2 h-28">
                <img
                  src={item.images}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <h1 className="font-medium text-xl">{item.name}</h1>
              <h3 className="font-semibold text-xl">TK {item.price}</h3>
              <div className="bg-color_1 text-white py-1 px-3 rounded-sm flex items-center gap-8">
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
          ))}
        </div>
        <div className="p-3 my-4 flex justify-end">
          <div className="w-full max-w-xl border p-3">
          <p className="flex justify-between font-semibold md:text-xl">
            <span>Total Price</span> <span>{cart.totalAmount}/-</span>
          </p>
          <button className="button_primary w-full mt-4">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
