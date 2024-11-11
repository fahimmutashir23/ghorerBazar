import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useCollapse } from "react-collapsed";
import PageHeader from "@/Shared/PageHeader";
import Loader2 from "@/Utils/Loader2";
import { url } from "../../../../../connection";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useGetCategories from "@/Hooks/useGetCategories";
import { Slider } from "@/Components/ui/slider";

const AllCategory = () => {
  const imgUrl = `${url}/Upload/product/images/`;
  const [isExpanded, setIsExpanded] = useState(true);
  const { catBasedProduct, isLoading } = useContext(BasicContext);
  const [categories, categoriesLoading] = useGetCategories();
  const [range, setRange] = useState([0]);

  const {
    getCollapseProps: getCategoryCollapseProps,
    getToggleProps: getCategoryToggleProps,
  } = useCollapse({ isExpanded });

  if (isLoading || categoriesLoading) return <Loader2 />;

  return (
    <div>
      <PageHeader name={catBasedProduct.catName} />
      <div className="max-w-7xl mx-auto mt-4">
        <div className="md:flex w-[100%] items-start justify-center gap-4">
          {/* Category Section */}
          <div className="flex lg:flex-col lg:w-[20%]">
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
                        // checked={selectedCategories.includes(idx)}
                        // onChange={() => handleCategoryChange(idx)}
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

          {/* Product Display Section========= */}
          <div className="lg:w-[80%]">
            <div className="flex items-center justify-between ">
              <div className="pb-4">
                <p className="text-2xl font-bold padding_left hidden mb-0 lg:block">
                  Products
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {catBasedProduct.result?.map((product) => {
                return (
                  <Link
                    key={product.id}
                    to={`/productDetails/${product.id}`}
                    className="transition duration-300 ease-in-out shadow-sm hover:shadow-2xl h-full rounded-md bg-white hover:border-green_color "
                  >
                    <div className="relative rounded-md flex flex-col justify-between group  h-full border-2 hover:border-2 hover:border-green_color">
                      <div className="w-full md:h-[230px] flex justify-center items-center relative p-1 rounded-md">
                        <img
                          className="w-full h-full object-cover"
                          src={`${imgUrl}${product.images}`}
                          alt={product.name}
                        />
                      </div>
                      <div className="text-center text-[14.4px] px-[10px] pt-[10px] border-t-2 ">
                        <h6 className="hover:text-[#008000]">{product.name}</h6>
                        <p className="font-bold">{product.price}</p>
                      </div>
                      {/* <div className="text-center  mx-auto ">
                        <ReactStars
                          count={5}
                          onChange={() => {}}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#008000"
                          color="#008000"
                        />
                      </div> */}
                      <div className="px-2 pb-4">
                        <button className="bg-footer_color  text-black font-bold py-p_8px w-[100%] mx-auto border-green_color">
                          See Details
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
