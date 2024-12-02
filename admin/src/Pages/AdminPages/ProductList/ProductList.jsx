import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UpdateProductModal from "./UpdateProductModal";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useGetCollectionLength from "@/Hooks/Apis/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import Loader2 from "../../../Utils/Loader2";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [popOpen, setPopOpen] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [updateData, setUpdateData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [collectionData, collectionLoading, collectionFetch] =
    useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  // const paginateBtn = [...Array(10).keys()];

  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic(
        `/api/get-product-list?page=${page}&limit=${rows}`
      );
      return res.data;
    },
  });

  const handleUpdate = async (data) => {
    setUpdateData(data);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/delete-product/${id}`);
      if (res.data.status_code === 201) {
        toast.success(res.data.message);
        refetch();
        collectionFetch();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  if (isLoading || collectionLoading) {
    return <Loader2 />;
  }

  return (
    <div className=" rounded-md py-2 px-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData.product} )
            </button>
          </div>
          {/* <AddProductModal collectionFetch={collectionFetch} loader={loader} setLoader={setLoader} fetchData={refetch} /> */}
          <Link
            to="/admin/add-product"
            className="text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500 flex items-center gap-2"
          >
            <IoAddCircleOutline className="text-2xl font-bold" />
            <span className="mt-1">Add Product</span>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto pb-32 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border">Product Name</th>
              <th className="text-lg border w-1/12">Product Category</th>
              <th className="text-lg border">Brand</th>
              <th className="text-lg border">Price</th>
              <th className="text-lg border">Discount</th>
              <th className="text-lg border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.result.map((data, idx) => (
              <tr key={idx}>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  {data.name}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.category?.name || "..."}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.brand}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {
                    data.price.map((item, idx) => (
                      <span className="flex flex-col text-left" key={idx}>
                        {item.count} = {item.countPrice}৳
                      </span>
                    ))
                  }
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.discount}
                </td>
                <td className="border ">
                  <button
                    className="rounded-md border-none py-0 px-2 relative"
                    onClick={() => togglePopOpen(data._id)}
                  >
                    <BsThreeDotsVertical className="text-2xl font-bold text-black" />
                    <div
                      className={`bg-gray-100 w-44 border border-black absolute ${
                        popOpen === data._id ? "scale-100 z-10" : "scale-0"
                      } right-[14px] top-[24px] rounded-md rounded-tr-sm duration-300 origin-top-right`}
                    >
                      <ul className="text-black text-left">
                        <Link
                        to={`/admin/update-product`}
                        state={{data}}
                          onClick={() => handleUpdate(data)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <BiEdit />
                          Update
                        </Link>
                        <li
                          onClick={() => handleDelete(data._id)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <MdDelete /> Delete
                        </li>
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UpdateProductModal
          data={updateData}
          fetchData={refetch}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Paginator
          className="bg-gray-700 max-w-fit mx-auto mt-2 text-white"
          first={first}
          rows={rows}
          totalRecords={collectionData.product}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
