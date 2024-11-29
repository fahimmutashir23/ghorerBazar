import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import MenuBar from "./MenuBar";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useTotalCart from "@/Hooks/useTotalCart";
import { Link } from "react-router-dom";
import Search from "@/Components/Search";
import Logo from "./Logo";

const NavbarMain = () => {
  const [open, setOpen] = useState(false);
  const { setCartBar } = useContext(BasicContext);
  const [totalCart] = useTotalCart();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="flex justify-between items-center py-1 px-2 lg:px-6 max-w-6xl mx-auto">
      {/* menu bar icon */}
      {/* <div className="dropdown hidden flex-1">
        <div tabIndex={0} role="button" className="">
          {open ? (
            <>
              <RxCross1 onClick={() => setOpen(!open)} className="text-2xl" />
            </>
          ) : (
            <MdMenu onClick={() => setOpen(!open)} className="text-2xl" />
          )}
        </div>
      </div> */}
      {/* search for large screen */}
      <div className="hidden md:flex flex-1 md:gap-2 md:items-center">
        <FaSearch
          onClick={() => setOpenSearch(!openSearch)}
          className="text-2xl text-color_1"
        />
        {<Search openSearch={openSearch} />}
      </div>
      {/* logo */}
      <Link
        to="/"
        className="text-4xl text-color_1 font-bold flex-1 flex lg:justify-center"
      >
        <Logo w={14} />
      </Link>
      {/* cart icon */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        {/* <div className="md:hidden">
          <FaSearch className="text-2xl text-color_1" />
        </div> */}
        <div className="relative mr-6 lg:mr-0" onClick={() => setCartBar(true)}>
          <span className="absolute -top-3.5 -right-6 h-7 w-7 rounded-full bg-color_1 border-white border-2 text-sm font-medium flex items-center justify-center text-white">
            {totalCart}
          </span>
          <FaCartShopping className="text-2xl text-color_1 hover:cursor-pointer hover:scale-105" />
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-36 ${
          open ? "left-0" : "-left-[100%]"
        } duration-300 z-30 w-4/5 md:3/5`}
      >
        <MenuBar setOpen={setOpen}></MenuBar>
      </div>
    </div>
  );
};

export default NavbarMain;
