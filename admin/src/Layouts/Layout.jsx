import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import NavbarTop from "../Shared/NavbarTop";
import Footer from "../Shared/Footer";
import Copyright from "../Shared/Copyright";
import Cart from "../Shared/Cart";
import StickySideBar from "../Shared/StickySideBar";
import TopArrow from "../Shared/TopArrow";

const Layout = () => {
  return (
    <div className="overflow-x-hidden bg-slate-100 ">
      <NavbarTop />
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
      <Copyright />
      <div className="fixed z-50 right-0 bottom-24 md:bottom-[268px] ">
        <Cart />
      </div>
      <div className="fixed z-50 right-0 bottom-24 hidden md:block">
        <StickySideBar />
      </div>
      <div>
        <TopArrow />
      </div>
    </div>
  );
};

export default Layout;
