import { BasicContext } from "@/ContextAPIs/BasicProvider";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";

const CartBar = () => {
  const { cartBar, setCartBar } = useContext(BasicContext);

  return (
    <div
      className={`fixed bg-slate-200 min-h-screen top-0 w-[400px] ${
        cartBar ? "right-0" : "-right-[400px]"
      } transition-all duration-300 px-3 py-2 border-l-2 border-black`}
    >
      <div className="flex items-center justify-between ">
        <h1 className="font-medium text-2xl">Shopping Cart</h1>
        <IoClose onClick={() => setCartBar(false)} className="text-3xl font-bold hover:cursor-pointer" />
      </div>
      
      {/* Main Cart=============== */}
      <div>
        
      </div>
    </div>
  );
};

export default CartBar;
