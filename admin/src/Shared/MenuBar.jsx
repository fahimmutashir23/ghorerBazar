
import { Link, NavLink } from "react-router-dom";

const MenuBar = ({setOpen}) => {

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col _gap justify-between padding_top padding_left padding_right">
        <ul className="px-pl_primary space-y-2 w-full">
          <li className="bg-bg_secondary py-pl_primary">
            <Link
            onClick={handleClose}
              to="/"
              className="text-text_secondary font-semibold text-text_md"
            >
              Home
            </Link>
          </li>
          <li className="bg-bg_secondary py-pl_primary">
            <Link
              to="/events"
              onClick={handleClose}
              className="text-text_secondary font-semibold text-text_md"
            >
              Events
            </Link>
          </li>
          <li className="bg-bg_secondary py-pl_primary">
            <Link
              to="/gallery"
              onClick={handleClose}
              className="text-text_secondary font-semibold text-text_md"
            >
              Gallery
            </Link>
          </li>
          <li className="bg-bg_secondary py-pl_primary">
            <Link
              to="/products"
              onClick={handleClose}
              className="text-text_secondary font-semibold text-text_md"
            >
              products
            </Link>
          </li>
          <li className="bg-bg_secondary py-pl_primary">
            <Link
              to="/contact"
              onClick={handleClose}
              className="text-text_secondary font-semibold text-text_md"
            >
              Contact
            </Link>
          </li>
          <li className="bg-bg_secondary py-pl_primary">
            <NavLink
              to="/hotProduct"
              onClick={handleClose}
              className={`text-text_secondary font-semibold text-text_md hover:text-color_blue duration-300`}
            >
              Hot Product
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
