import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useCollapse } from "react-collapsed";
import PageHeader from "@/Shared/PageHeader";
import { navItem } from "@/Utils/navItems";
import useGetProduct from "@/Hooks/useGetProduct";
import Loader2 from "@/Utils/Loader2";

const AllCategory = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
//   const [isExpandedFT, setIsExpandedFT] = useState(true);
  const [products, productLoading, productFetch] = useGetProduct();


  // Filter products based on selected categories and tags
//   const filterProducts = async (categories, tags) => {
//     setLoading(true);
//     try {
//       const formData = {
//         category_id: categories,
//         tag_id: tags,
//       };
//       const res = await axiosPublic.post("/filter-product-data", formData);
//       if (res.data.status_code === 200) {
//         setProductData(res.data.productData);
//       }
//     } catch (error) {
//       console.error("Error filtering products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  // Handle category selection
//   const handleCategoryChange = (categoryId) => {
//     let updatedCategories;
//     if (selectedCategories.includes(categoryId)) {
//       updatedCategories = selectedCategories.filter((id) => id !== categoryId);
//     } else {
//       updatedCategories = [...selectedCategories, categoryId];
//     }
//     setSelectedCategories(updatedCategories);
//     filterProducts(updatedCategories, selectedTags);
//   };

  // Handle tag selection
//   const handleTagChange = (tagId) => {
//     let updatedTags;
//     if (selectedTags.includes(tagId)) {
//       updatedTags = selectedTags.filter((id) => id !== tagId);
//     } else {
//       updatedTags = [...selectedTags, tagId];
//     }
//     setSelectedTags(updatedTags);
//   };

  // Manage collapse state for categories and tags
  const {
    getCollapseProps: getCategoryCollapseProps,
    getToggleProps: getCategoryToggleProps,
  } = useCollapse({ isExpanded });
//   const {
//     getCollapseProps: getTagCollapseProps,
//     getToggleProps: getTagToggleProps,
//   } = useCollapse({ isExpanded: isExpandedFT });

  if(productLoading) return <Loader2 />

  return (
    <div>
      <PageHeader name={"All Category"} />
      <div className="max-w-7xl mx-auto mt-4">
        <div className="md:flex w-[100%] items-start justify-center gap-4">
          {/* Category Section */}
          <div className="flex xl:flex-col w-[20%]">
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
                  {navItem.map((category, idx) => (
                    <div
                      key={idx}
                      className="mt-2 flex gap-2 items-center"
                    >
                      <input
                        type="checkbox"
                        id={idx}
                        // checked={selectedCategories.includes(idx)}
                        // onChange={() => handleCategoryChange(idx)}
                      />
                      <label htmlFor={idx}>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Tag Section */}
            {/* <div className="card_bg text_color rounded_primary overflow-hidden mt-5">
              <button
                {...getTagToggleProps()}
                className="font_bold font_standard flex items-center justify-between p-p_16px gap-3 text-lg w-full font-bold"
                onClick={() => setIsExpandedFT(!isExpandedFT)}
              >
                Tag
                <RiArrowDropDownLine
                  className={`transform transition-transform duration-300 text-3xl ${
                    isExpandedFT ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
              <hr />
              <section {...getTagCollapseProps()}>
                <div className="padding_left padding_right padding_bottom">
                  {tagData.map((tag) => (
                    <div
                      key={tag.id}
                      className="padding_top flex gap-2 items-center"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagChange(tag.id)}
                      />
                      <label htmlFor="text">{tag.tag_name}</label>
                    </div>
                  ))}
                </div>
              </section>
            </div> */}
          </div>

          {/* Product Display Section========= */}
          <div className="w-[80%]">
            <div className="flex items-center justify-between ">
              <div className="py-5">
                <p className="font_standard font-bold padding_left hidden mb-0 lg:block">
                  All Products
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.result?.map((product) => {
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
                          src={product.images}
                          alt={product.product_name}
                        />
                      </div>
                      <div className="text-center text-[14.4px] px-[10px] pt-[10px] border-t-2 ">
                        <h6 className="hover:text-[#008000]">
                          {product.name}
                        </h6>
                          <p className="font-bold">
                            {product.price}
                          </p>
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
