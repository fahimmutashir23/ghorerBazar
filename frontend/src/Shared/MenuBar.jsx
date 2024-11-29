import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useGetCategories from "@/Hooks/useGetCategories";
import { useContext, useState } from "react";
import { useCollapse } from "react-collapsed";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Slider } from "@/Components/ui/slider";

const MenuBar = ({ setOpen }) => {
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

  if (categoriesLoading) return " ";

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col">
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
    </div>
  );
};

export default MenuBar;
