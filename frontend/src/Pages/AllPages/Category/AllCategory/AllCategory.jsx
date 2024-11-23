import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useCollapse } from "react-collapsed";
import PageHeader from "@/Shared/PageHeader";
import Loader2 from "@/Utils/Loader2";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useGetCategories from "@/Hooks/useGetCategories";
import { Slider } from "@/Components/ui/slider";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import { toast } from "react-toastify";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { imgUrl } from "@/Utils/imageUrl";

const AllCategory = () => {
  const axiosPublic = useAxiosPublic();
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    catBasedProduct,
    isLoading,
    range,
    setRange,
    categoryId,
    setCategoryId,
    setCartBar,
  } = useContext(BasicContext);
  const [categories, categoriesLoading] = useGetCategories();
  const [, , cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
useEffect(() => {
  window.scrollTo(0, 0);
}, [])

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

  const handleAddToCart = async (data) => {
    const info = {
      productId: data._id,
      name: data.name,
      images: data.images[0],
      price: data.price,
    };

    try {
      const res = await axiosPublic.post(`/api/save-cart`, info, {
        withCredentials: true,
      });
      if (res.data.status_code === 200) {
        toast.success(res.data.message);
        cartFetch();
        totalCartFetch();
        setCartBar(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
                  <div
                    key={product._id}
                    className="transition duration-300 ease-in-out shadow-sm hover:shadow-lg h-full rounded-md bg-white hover:border-green-500"
                  >
                    <div className="relative rounded-md flex flex-col justify-between group  h-full border-2 hover:border-2 hover:border-green_color">
                      <div className="w-full md:h-[230px] flex justify-center items-center relative p-1 rounded-md">
                        <img
                          className="w-full h-full object-cover"
                          src={`${imgUrl.product}${product.images[0]}`}
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
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-color_1 py-1 font-medium text-white hover:scale-105 duration-300 w-full my-2"
                        >
                          Quick Add
                        </button>
                        <Link
                          to={`/productDetails/${product._id}`}
                          className="w-full"
                        >
                          <button className="bg-color_1 py-1 font-medium text-white hover:scale-105 duration-300 w-full">
                           See Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
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
