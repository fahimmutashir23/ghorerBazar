import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import MenuBar from "./MenuBar";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useTotalCart from "@/Hooks/useTotalCart";
import { Link } from "react-router-dom";

const NavbarMain = () => {
  const [open, setOpen] = useState(false);
  const { setCartBar } = useContext(BasicContext);
  const [totalCart] = useTotalCart();

  return (
    <div className="flex justify-between items-center py-4 px-2 lg:px-6 max-w-6xl mx-auto">
      <div className="dropdown lg:hidden flex-1">
        <div tabIndex={0} role="button" className="">
          {open ? (
            <>
              <RxCross1 onClick={() => setOpen(!open)} className="text-2xl" />
            </>
          ) : (
            <MdMenu onClick={() => setOpen(!open)} className="text-2xl" />
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-1">
        <FaSearch className="text-2xl text-color_1" />
      </div>
      <Link to='/' className="text-4xl text-color_1 font-bold flex-1 flex justify-center">LOGO</Link>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="md:hidden">
          <FaSearch className="text-2xl text-color_1" />
        </div>
        <div
        className="relative"
        onClick={() => setCartBar(true)}
        >
          <span className="absolute -top-3.5 -right-6 h-7 w-7 rounded-full bg-color_1 border-white border-2 text-sm font-medium flex items-center justify-center text-white">{totalCart}</span>
          <FaCartShopping className="text-2xl text-color_1 hover:cursor-pointer hover:scale-105" />
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-44 ${
          open ? "left-0" : "-left-[100%]"
        } duration-300 z-30 w-full md:3/5`}
      >
        <MenuBar setOpen={setOpen}></MenuBar>
      </div>
    </div>
  );
};

export default NavbarMain;
