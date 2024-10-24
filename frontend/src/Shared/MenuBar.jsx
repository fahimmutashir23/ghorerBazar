import { navItem } from "@/Utils/navItems";
import { Link } from "react-router-dom";

const MenuBar = ({ setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col _gap justify-between pt-3">
        <ul className="px-3 space-y-2 w-full">
          {navItem.map((nav, idx) => (
            <li key={idx} className="bg-bg_secondary py-pl_primary">
              <Link
                onClick={handleClose}
                to={nav.path}
                className="text-black font-semibold text-lg"
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
