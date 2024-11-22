import Card from "@/Components/Card";
import useGetProduct from "@/Hooks/useGetProduct";
import { useContext, useEffect, useState } from "react";
// import { Paginator } from 'primereact/paginator';
import Loader2 from "@/Utils/Loader2";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useGetCategories from "@/Hooks/useGetCategories";
import frame from "../../../assets/about/islamic_frame.png";

const AllProduct = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [products, productLoading, productFetch] = useGetProduct(page, rows);
  const [categories, categoriesLoading] = useGetCategories();
  const { value } = useContext(BasicContext);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  useEffect(() => {
    productFetch();
  }, [value]);

  if (productLoading || categoriesLoading) return <Loader2 />;

  return (
    <div>
      <h1 className="text-center text-3xl font-medium my-6">All Product</h1>
      <div className="flex gap-2 items-start">
        <div className="flex flex-col gap-2 w-2/12 bg-color_2">
          {categories.map((item, idx) => (
            <div
              className="py-5 px-3 border-2 border-color_1 text-xl font-medium relative h-60 flex items-center justify-center"
              key={idx}
            >
              {item.name}
              <img src={frame} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" alt="" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-10/12">
          {products.result.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={products.totalProducts} onPageChange={onPageChange} /> */}
    </div>
  );
};

export default AllProduct;
