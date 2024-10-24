import { useContext } from "react";
import { BasicContext } from "../ContextAPIs/BasicProvider";
import { Outlet } from "react-router-dom";
import LeftBar from "../Components/LeftBar/LeftBar";
import AdminNavbar from "../Pages/AdminPages/MenuBar/AdminNavbar";
import useSmallScreen from "../Hooks/useSmallScreen";
import AdminNavbarTop from "../Shared/AdminNavbarTop";
import Copyright from "../Shared/Copyright";

const DashboardLayout = () => {
    const { open, sidebarRef } = useContext(BasicContext);
    const [isSmallScreen] = useSmallScreen();

    return (
      <div className="overflow-hidden">
      <div className="w-full h-screen justify-between mx-auto overflow-y-auto overflow-hidden flex ">
        <div className=" flex items-start w-full">
          <div
            ref={sidebarRef}
            className={`lg:relative fixed top-0 lg:top-0 ${
              open ? "left-0" : "-left-[100%]"
            } duration-300 w-[320px] z-50 h-[calc(100vh)] overflow-y-auto`}
          >
            <LeftBar />
          </div>
          <div className="w-full">
            {isSmallScreen && open && (
              <div className="absolute top-0 left-0 w-full inset-0 bg-black opacity-50 z-20"></div>
            )}
            <AdminNavbarTop />
            <div className="overflow-y-auto h-[calc(100vh-56px)]">
              <div className="min-h-[calc(100vh-136px)]">
              <Outlet />
              </div>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default DashboardLayout;