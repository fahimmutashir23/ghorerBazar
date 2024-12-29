import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useGetCategories from "@/Hooks/useGetCategories";
import { useContext, useEffect, useState } from "react";
import { useCollapse } from "react-collapsed";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Slider } from "@/Components/ui/slider";
import { Link, useLocation } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const MenuBar = ({ setOpen, open }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const { range, setRange, categoryId, setCategoryId } =
    useContext(BasicContext);
  const [categories, categoriesLoading] = useGetCategories();

  const handleCheckboxChange = (_id) => {
    setCategoryId(() =>
      categoryId?.includes(_id)
        ? categoryId.filter((id) => id !== _id)
        : [...categoryId, _id]
    );
  };

  const {
    getCollapseProps: getCategoryCollapseProps,
    getToggleProps: getCategoryToggleProps,
  } = useCollapse({ isExpanded });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCategory = (id) => {
    setCategoryId([id]);
    setOpen(false);
  };

  // Disable body scroll when the menubar is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, [open]);

  if (categoriesLoading) return " ";

  return (
    <div onClick={handleClose}>
      {location.pathname === "/allCategory" ? (
        // Filtering
        <div className="flex flex-col bg-white h-[calc(100vh-135px)] overflow-y-auto">
          <div className="bg-orange-100 rounded-md overflow-hidden ">
            <button
              {...getCategoryToggleProps()}
              className="flex items-center justify-between py-3 text-lg w-full font-bold px-3 border-b border-black"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Category
              <RiArrowDropDownLine
                className={`transform transition-transform duration-300 text-3xl ${
                  isExpanded ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
            <hr />
            <section {...getCategoryCollapseProps()}>
              <div className="px-3 py-2">
                {categories.map((category, idx) => (
                  <div key={idx} className="mt-2 flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id={idx}
                      // checked={categoryId?.includes(category._id)}
                      onChange={() => handleCheckboxChange(category._id)}
                    />
                    <label htmlFor={idx}>{category.name}</label>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Price Section */}
          <div className="bg-orange-100 rounded-md overflow-hidden mt-4">
            <div className="flex items-center justify-between py-3 text-lg w-full font-bold px-3 border-b border-black">
              Price Range
            </div>
            <div className="px-3 py-5">
              <Slider
                onValueChange={(value) => setRange(value)}
                defaultValue={range}
                value={range}
                max={1000}
                step={50}
              />
              <div className=" flex justify-center">
                <input
                  type="number"
                  defaultValue={0}
                  value={range}
                  onChange={(e) => setRange([parseInt(e.target.value)])}
                  className="mt-2 w-20 text-center border-color_1 border-2 text-lg font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // All Category
        <div
          className="bg-white h-screen overflow-y-auto flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 pb-3">
            <div className="py-3 border-b border-black flex justify-between">
              <h1 className="text-xl font-bold">Menu</h1>
              <RxCross1 onClick={() => setOpen(!open)} className="text-2xl" />
            </div>
            <ul className="space-y-3 mt-3">
              {categories.map((category, idx) => (
                <li key={idx}>
                  <Link
                    to="/allCategory"
                    onClick={() => handleClickCategory(category._id)}
                    className="font-semibold"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/viewOrder"
            onClick={handleClose}
            className="bg-color_1 py-1 font-semibold text-white mb-3 flex justify-center items-center gap-1"
          >
            View Order
            <FaArrowUpRightFromSquare />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
