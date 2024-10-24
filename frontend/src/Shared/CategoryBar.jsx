import { NavLink } from "react-router-dom";
import { navItem } from "@/Utils/navItems";

const CategoryBar = () => {

  return (
    <div className="bg-gray-200 hidden md:flex">
      <div className="navbar max-w-7xl mx-auto px-0 py-4">
        <div className=" ml-2">
          {/* <div className="dropdown lg:hidden">
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
          </div> */}
        </div>

        <div className="hidden lg:flex">
          <ul className="flex flex-wrap items-center gap-14 px-0 w-full">
            {navItem.map((name, idx) => {
              return (
                <li key={idx}>
                  <NavLink
                    to={name.path}
                    className={`text-black text-xl group border-black duration-300`}
                  >
                    {name.name}
                    <div className="h-[1.5px] w-0 group-hover:w-full duration-300 bg-black"></div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* <div
        className={`lg:hidden absolute top- ${
          open ? "left-0" : "-left-[100%]"
        } duration-300 z-30 w-full md:3/5`}
      >
        <MenuBar setOpen={setOpen}></MenuBar>
      </div> */}
    </div>
  );
};

export default CategoryBar;
