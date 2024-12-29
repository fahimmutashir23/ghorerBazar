import { useContext, useState } from "react";
// import { FaSearch } from "react-icons/fa";
import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import MenuBar from "./MenuBar";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useTotalCart from "@/Hooks/useTotalCart";
import { Link } from "react-router-dom";
// import Search from "@/Components/Search";
import Logo from "./Logo";
// import { FaSearch } from "react-icons/fa";

const NavbarMain = () => {
  const [open, setOpen] = useState(false);
  const { setCartBar } = useContext(BasicContext);
  const [totalCart] = useTotalCart();

  return (
    <div className="bg-color_2">
      <div className="flex justify-between items-center py-1 px-2 lg:px-6 max-w-6xl mx-auto">
        {/* menu bar icon */}
        <div className="dropdown flex-1 lg:hidden">
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
        {/* search for large screen */}
        <div className="hidden md:flex flex-1 md:gap-2 md:items-center">
          {/* {<Search openSearch={openSearch} />} */}
          <Link
            to="/viewOrder"
            className="bg-color_3 px-2 py-1 text-white font-semibold"
          >
            View Order
          </Link>
        </div>
        {/* logo */}
        <Link
          to="/"
          className="text-4xl text-color_1 font-bold flex-1 flex justify-center"
        >
          <Logo w={12} />
        </Link>
        {/* cart icon */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* <div className="md:hidden">
          <FaSearch className="text-2xl text-color_1" />
        </div> */}
          <div className="relative w-full hidden lg:block">
            <input
              type="search"
              id="phone"
              //   onChange={(e) => setPhone(e.target.value)}
              className="px-2 border w-full py-2 border-gray-700 focus:outline-none"
              placeholder="Search Your Product"
            />
            <button
              //   onClick={handleSearch}
              className="absolute bg-color_1 h-full px-4 right-0"
            >
              <FaMagnifyingGlass className="text-xl text-white" />
            </button>
          </div>
          <div
            className="relative mr-6 lg:mr-0"
            onClick={() => setCartBar(true)}
          >
            <span className="absolute -top-2.5 lg:-top-3.5 -right-4 lg:-right-6 h-6 lg:h-7 w-6 lg:w-7 rounded-full bg-color_1 border-white border-2 text-xs lg:text-sm font-medium flex items-center justify-center text-white">
              {totalCart}
            </span>
            <FaCartShopping className="text-2xl text-color_1 hover:cursor-pointer hover:scale-105" />
          </div>
        </div>

        {/* Backdrop for blur effect */}
        {open && (
          <div
            onClick={() => setOpen(false)} // Close menu on backdrop click
            className="fixed inset-0 bg-black bg-opacity-10 z-20 disabled"
          ></div>
        )}

        <div
          className={`lg:hidden absolute top-0 ${
            open ? "left-0" : "-left-[100%]"
          } duration-300 z-30 w-full`}
        >
          <MenuBar setOpen={setOpen} open={open}></MenuBar>
        </div>
      </div>
    </div>
  );
};

export default NavbarMain;
