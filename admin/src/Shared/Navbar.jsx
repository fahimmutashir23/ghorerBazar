import { Link, NavLink } from "react-router-dom";
import MenuBar from "./MenuBar";
import { RxCross1 } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
// import logo from ".././assets/asset/logo/tech-hub logo.png"

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-green-100">
      <div className="navbar max-w-7xl mx-auto px-0 py-4 lg:flex justify-between items-center">
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
          <Link to="/" className=" text-text_xl font-bold text-text_secondary px-2 md:px-0">
            {/* <img className="w-32" src={logo}alt="" /> */}
            LOGO
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex lg:flex-1 ">
          <ul className="flex items-center justify-end gap-gap_secondary px-0 w-full">
            <li>
              <Link to='/' className="text-text_secondary font-semibold text-text_md">
                Home
              </Link>
            </li>
            {/* <li className="relative group ">
              <p className="text-text_secondary mb-0 font-semibold text-text_md flex items-center">
                About Us{" "}
                <span>
                  <MdKeyboardArrowDown className="text-text_secondary text-text_lg" />
                </span>
              </p>
              <div className="absolute bg-bg_primary shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-left scale-0">
                <Link
                  to="/gallery"
                  className="block px-4 py-2 text-text_gray hover:bg-text_secondary hover:text-white"
                >
                  Gallery
                </Link>
                <Link
                  to="/events"
                  className="block px-4 py-2 text-text_gray hover:bg-text_secondary hover:text-white"
                >
                  Event
                </Link>
              </div>
            </li> */}
            <li className="relative group">
              <p className="text-text_secondary mb-0 font-semibold text-text_md flex items-center">
                <Link to={'/events'}>
                Event
                </Link>
              </p>
            </li>
            <li className="relative group">
              <p className="text-text_secondary mb-0 font-semibold text-text_md flex items-center">
                <Link to={'/gallery'}>
                About Us
                </Link>
              </p>
            </li>
            <li className="relative group">
              <p className="text-text_secondary mb-0 font-semibold text-text_md flex items-center">
                <Link to={'/products'}>
                Products
                </Link>
              </p>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-text_secondary font-semibold text-text_md"
              >
                Contact
              </Link>
            </li>
            <li>
              <NavLink
                to="/hotProduct"
                className={`text-text_secondary font-semibold text-text_md hover:text-color_blue duration-300`}
              >
                Hot Product
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`lg:hidden absolute top-44 ${
          open ? "left-0" : "-left-[100%]"
        } duration-300 z-30 w-full md:3/5`}
      >
        <MenuBar setOpen = {setOpen}></MenuBar>
      </div>
    </div>
  );
};

export default Navbar;
