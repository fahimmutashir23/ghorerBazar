import Card from "@/Components/Card";
// import { Paginator } from 'primereact/paginator';
import Loader2 from "@/Utils/Loader2";
import useGetCategories from "@/Hooks/useGetCategories";
import frame from "../../../assets/about/islamic_frame.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useContext } from "react";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import { NavLink } from "react-router-dom";
import PageHeader from "@/Shared/PageHeader";

const AllProduct = () => {
  const axiosPublic = useAxiosPublic();
  // const [first, setFirst] = useState(0);
  // const [rows, setRows] = useState(10);
  // const [page, setPage] = useState(0);
  // const [products, productLoading, productFetch] = useGetProduct(page, rows);
  const [categories, categoriesLoading] = useGetCategories();
  const { setCategoryId } = useContext(BasicContext);

  // const onPageChange = (event) => {
  //   setFirst(event.first);
  //   setRows(event.rows);
  //   setPage(event.page);
  // };

  // useEffect(() => {
  //   productFetch();
  // }, [value]);

  const fetchProductsByCategory = async (categoryId) => {
    const data = await axiosPublic(`/api/get-products/${categoryId}`);
    return data.data.result;
  };

  // Fetch products for all categories
  const { data: productsByCat, isLoading: isProductsLoading } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: async () => {
      const allProducts = await Promise.all(
        categories.map((category) =>
          fetchProductsByCategory(category._id).then((products) => ({
            categoryId: category._id,
            products,
          }))
        )
      );
      return allProducts;
    },
    enabled: !!categories,
  });

  if (isProductsLoading || categoriesLoading) return <Loader2 />;

  return (
    <div className="hidden lg:block">
      <PageHeader name={'All Product'} />
      <div className="space-y-3 mt-3">
        {categories?.map((category, idx) => {
          const categoryProducts =
            productsByCat.find((p) => p.categoryId === category._id)
              ?.products || [];

          return (
            <div key={idx} className="flex">
              <div className="flex flex-col gap-2 lg:w-2/12 bg-color_2">
                <NavLink
                to='/allCategory'
                  onClick={() => setCategoryId([category._id])}
                  className="py-5 px-3 border-2 border-color_1 text-xl font-medium relative h-60 flex items-center justify-center"
                >
                  {category.name}
                  <img
                    src={frame}
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                    alt=""
                  />
                </NavLink>
              </div>
              <div className="lg:w-10/12 overflow-auto">
                {categoryProducts.length > 0 && (
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 2000,
                      }),
                    ]}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="lg:mx-14"
                  >
                    <CarouselContent className="flex gap-4 w-full">
                      {categoryProducts?.map((product, idx) => (
                        <CarouselItem key={idx} className="md:basis-1/4 lg:1/5">
                          <Card data={product} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={products.totalProducts} onPageChange={onPageChange} /> */}
    </div>
  );
};

export default AllProduct;
