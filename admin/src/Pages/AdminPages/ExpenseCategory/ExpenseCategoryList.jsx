import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Utils/Loader";
import useGetCollectionLength from "../../../Hooks/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import AddExpenseCategoryModal from "./AddExpenseCategoryModal";
import UpdateExpenseCategoryModal from "./UpdateExpenseCategoryModal";
import { GrStatusUnknown } from "react-icons/gr";
import Loader2 from "../../../Utils/Loader2";

const ExpenseCategoryList = () => {
  const [popOpen, setPopOpen] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [loader, setLoader] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(false);
  const [collectionData, collectionLoading, collectionFetch] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0)

  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expenseCategory"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/get-expenseCategory-list?page=${page}&limit=${rows}`);
      return res.data;
    },
  });

  const handleUpdate = async (data) => {
    setIsOpen(true);
    setData(data)
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/delete-expenseCategory/${id}`);
      if (res.data.success) {
        toast.success("Category Deleted Successfully");
        refetch();
        collectionFetch()
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleActiveInactive = async (id, statusCode) => {
    try {
      const status = {
      status : statusCode === true ? false : true
      }
      const res = await axiosSecure.put(`/api/activeInactive-expenseCategory/${id}`, status);
      if (res.data) {
        toast.success("Update Successfully");
        refetch();
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
    refetch()
  }, [page])

  if (isLoading || collectionLoading) {
    return <Loader />;
  }

  return (
    <div className=" rounded-md py-2 px-3">
      {loader && <Loader2 />}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData.expenseCategory} )
            </button>
          </div>
          <AddExpenseCategoryModal collectionFetch={collectionFetch} setLoader={setLoader} fetchData={refetch} />
        </div>
      </div>
      <div className="overflow-x-auto pb-32 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border">Category Name</th>
              <th className="text-lg border">Status</th>
              <th className="text-lg border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.result.map((data, idx) => (
              <tr key={idx}>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.name}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black`}
                >
                  <span className={`${data.status ? "bg_status_secondary" : "bg_status_primary"}`}>{data.status? 'Active': 'Inactive'}</span>
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
                        <li
                          onClick={() => handleUpdate(data)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <BiEdit />
                          Update
                        </li>
                        <li
                          onClick={() => handleDelete(data._id)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <MdDelete /> Delete
                        </li>
                        <li
                          onClick={() => handleActiveInactive(data._id, data.status)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                         <GrStatusUnknown />
                         {data.status ? 'Inactive' : 'Active'}
                        </li>
                      </ul>
                    </div>
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <UpdateExpenseCategoryModal data={data} fetchData={refetch} isOpen={isOpen} setIsOpen={setIsOpen} />
        {collectionData.expenseCategory >= rows && <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={collectionData.expenseCategory} onPageChange={onPageChange} />}
      </div>
    </div>
  );
};

export default ExpenseCategoryList;
