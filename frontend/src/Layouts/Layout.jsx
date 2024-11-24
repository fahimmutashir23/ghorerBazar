import { Outlet } from "react-router-dom";
import NavbarTop from "@/Shared/NavbarTop";
import CategoryBar from "@/Shared/CategoryBar";
import Footer from "@/Shared/Footer";
import Copyright from "@/Shared/Copyright";
import TopArrow from "@/Shared/TopArrow";
import NavbarMain from "@/Shared/NavbarMain";
import CartBar from "@/Components/CartBar";

const Layout = () => {

  return (
    <div className="overflow-x-hidden bg-slate-100 ">
      {/* <NavbarTop /> */}
      <NavbarMain />
      {/* <CategoryBar /> */}
      <div className="bg-white pt-2 pb-4">
        <Outlet />
      </div>
      <Footer />
      <Copyright />
      {/* <div className="fixed z-50 right-0 bottom-24 md:bottom-[100px] ">
        <Cart />
      </div> */}
      {/* <div className="fixed z-50 right-0 bottom-24 hidden md:block">
        <StickySideBar />
      </div> */}
      <div>
        <TopArrow />
      </div>
      <CartBar />
    </div>
  );
};

export default Layout;
