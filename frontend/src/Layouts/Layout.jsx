import { Outlet } from "react-router-dom";
import NavbarTop from "@/Shared/NavbarTop";
import Footer from "@/Shared/Footer";
import Copyright from "@/Shared/Copyright";
import TopArrow from "@/Shared/TopArrow";
import NavbarMain from "@/Shared/NavbarMain";
import CartBar from "@/Components/CartBar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import StickyFooter from "@/Shared/StickyFooter";

const Layout = () => {
  return (
    <div className="bg-color_2">
        <NavbarTop />
      <div className="sticky top-0 z-50">
        <NavbarMain />
      </div>
      <div className="relative w-full lg:hidden">
        <input
          type="search"
          id="phone"
          //   onChange={(e) => setPhone(e.target.value)}
          className="px-2 border w-full py-1 border-gray-700 focus:outline-none"
          placeholder="Search Your Product"
        />
        <button
          //   onClick={handleSearch}
          className="absolute bg-color_1 h-full px-4 right-0"
        >
          <FaMagnifyingGlass className="text-xl text-white" />
        </button>
      </div>
      {/* <CategoryBar /> */}
      <div className="bg-white pt-2 pb-4 main_body">
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
      <div className="fixed bottom-0 lg:hidden w-full z-50">
        <StickyFooter />
      </div>
      <CartBar />
    </div>
  );
};

export default Layout;
