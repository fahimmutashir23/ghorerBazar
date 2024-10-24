import { Link, NavLink } from "react-router-dom";
import { MdKeyboardArrowDown, MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import AdminMenu from "./AdminMenu";
import { useState } from "react";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-green-100">
      <div className="navbar md:px-4 px-1 py-0 lg:flex justify-between items-center">
        <div className="navbar-start flex justify-between w-full lg:justify-start lg:w-2/12 ml-2 lg:ml-0">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="">
              {open ? (
                <>
                  <RxCross1
                    onClick={() => setOpen(!open)}
                    className="text-2xl"
                  />
                </>
              ) : (
                <MdMenu onClick={() => setOpen(!open)} className="text-2xl" />
              )}
            </div>
          </div>
          <Link
            to="/"
            className=" text-text_xl font-bold text-text_secondary px-2 md:px-0"
          >
            {/* <img className="w-32" src={logo}alt="" /> */}
            LOGO
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex lg:flex-1 lg:gap-x-5 ">
          <Link
            to="/"
            className="px-4 bg-green-400 font-bold py-2 rounded-sm hover:bg-green-500 duration-200"
          >
            Go Home
          </Link>
          <div className="avatar online relative group">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
            <div className="absolute right-0 top-14 bg-bg_primary shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0 h-32">
              <div className="block px-4 py-2 text-text_gray hover:bg-text_secondary hover:text-white">
                Admin
              </div>
              <Link
                to="/gallery"
                className="block px-4 py-2 text-text_gray hover:bg-text_secondary hover:text-white"
              >
                Profile
              </Link>
              <Link
                to="/events"
                className="block px-4 py-2 text-text_gray hover:bg-text_secondary hover:text-white"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden absolute top-16 ${
          open ? "left-0" : "-left-[100%]"
        } duration-300 z-30 w-full md:3/5`}
      >
        <AdminMenu />
      </div>
    </div>
  );
};

export default AdminNavbar;
