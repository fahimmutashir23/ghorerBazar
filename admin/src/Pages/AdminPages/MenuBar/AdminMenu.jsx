// import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";

const AdminMenu = () => {
  //   const [openDropdown, setOpenDropdown] = useState(null);

  //   const handleOpen = (id) => {
  //     setOpenDropdown((prevIdx) => (prevIdx === id ? null : id));
  //   };

  return (
    <div>
      <div className="flex flex-col justify-between bg-white">
        <ul className=" space-y-[2px] w-full">
          <li className="bg-green-300 py-3 pl-4 group hover:cursor-pointer hover:bg-slate-200 duration-200">
            <Link to="/" className="font-semibold text-text_md">
              <p className="group-hover:translate-x-2 flex gap-3 text-text_lg items-center duration-200 w-44">
                {/* {sidebarOpen ? <FaHome className="text-text_xl" /> : "Home"} */}
                <MdDashboard className="text-text_xl" /> Dashboard
              </p>
            </Link>
          </li>
          <li className="bg-green-300 py-3 pl-4 group hover:cursor-pointer hover:bg-slate-200 duration-200">
            <Link
              to="/admin/productList"
              className="font-semibold text-text_md"
            >
              <p className="group-hover:translate-x-2 duration-200 flex items-center gap-3 text-text_lg w-44">
                {/* {sidebarOpen ? <FaBookBible className="text-text_xl" /> : "Bookings"} */}
                <MdProductionQuantityLimits className="text-text_xl" /> Product
                List
              </p>
            </Link>
          </li>
          <li className="bg-green-300 py-3 pl-4 group hover:cursor-pointer hover:bg-slate-200 duration-200">
            <Link
              to="/admin/productList"
              className="font-semibold text-text_md"
            >
              <p className="group-hover:translate-x-2 duration-200 flex items-center gap-3 text-text_lg w-44">
                {/* {sidebarOpen ? <FaBookBible className="text-text_xl" /> : "Bookings"} */}
                <FaRegBookmark className="text-text_xl" /> Bookings
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
