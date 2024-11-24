import useGetCategories from "@/Hooks/useGetCategories";
import Loader2 from "@/Utils/Loader2";
import { useRef, useState } from "react";
import frame from "../../../../assets/about/cat_fram.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import ProductCard from "./ProductCard";
import PageHeader from "@/Shared/PageHeader";

const AllProducts = () => {
  const [categories, categoriesLoading] = useGetCategories();
  const [activeCategory, setActiveCategory] = useState(null);
  const tabContainerRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sm-screen-product"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-products/${activeCategory}`);
      return res.data.result;
    }
  });

  // Scroll the selected category tab to the center
  const handleCategoryClick = (categoryId, index) => {
    setActiveCategory(categoryId);
    refetch()
    const container = tabContainerRef.current;
    const tabElement = container.children[index];

    const containerWidth = container.offsetWidth;
    const tabElementLeft = tabElement.offsetLeft;
    const tabElementWidth = tabElement.offsetWidth;

    const scrollPosition =
      tabElementLeft - containerWidth / 2 + tabElementWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  if (categoriesLoading || isLoading) return <Loader2 />;

  return (
    <div>
      <PageHeader name={'All Product'} />
      <div
        ref={tabContainerRef}
        className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-500 mt-2"
      >
        {categories.map((category, index) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id, index)}
            className={`px-6 py-1 text-sm border bg-cover ${
              activeCategory === category._id && "text-white"
            }`}
            style={{
              backgroundImage:
                activeCategory === category._id ? `url(${frame})` : "none",
              backgroundSize: "full",
              backgroundPosition: "center",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
    </div>
  );
};

export default AllProducts;
