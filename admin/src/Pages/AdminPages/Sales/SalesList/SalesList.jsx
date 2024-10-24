import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Paginator } from "primereact/paginator";
// import { GrStatusUnknown } from "react-icons/gr";
import { IoAddCircleOutline, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loader from "@/Utils/Loader";
import useGetCollectionLength from "@/Hooks/useGetCollectionLength";

const SalesList = () => {
  const [popOpen, setPopOpen] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [collectionData, collectionLoading] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0)
  const [date, setDate] = useState(" ");

  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expense-list"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/get-sale-list?page=${page}&limit=${rows}&date=${date}`)
      return res.data;
    },
  });


//   const handleActiveInactive = async (id, statusCode) => {
//     try {
//       const status = {
//       status : statusCode === true ? false : true
//       }
//       const res = await axiosSecure.put(`/api/activeInactive-expense/${id}`, status);
//       if (res.data) {
//         toast.success("Update Successfully");
//         refetch();
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  useEffect(() => {
    refetch()
  }, [page, date])


  if (isLoading || collectionLoading) {
    return <Loader />;
  }

  return (
    <div className=" rounded-md py-2 px-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
        <div className="flex flex-col md:flex-row md:items-center lg:gap-6 md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData?.sales} )
            </button>
          </div>
          <div className="flex-1 flex items-stretch">
            <input type="search" onChange={e => setDate(e.target.value)} className="px-2 py-2 w-full border-2 border-gray-700 focus:outline-none" />
            <button onClick={() => setDate(date)} className="px-4 bg-gray-700 text-white"><IoSearchSharp className="text-3xl" /></button>
          </div>
          <Link
          to='/admin/newSale'
          className="text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500 flex items-center gap-2"
        >
          <IoAddCircleOutline className="text-2xl font-bold" />
          <span>New Sale</span>
        </Link>
        </div>
      </div>
      <div className="overflow-x-auto pb-32 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border">Client Name</th>
              <th className="text-lg border">Amount</th>
              <th className="text-lg border">Date</th>
              <th className="text-lg border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.result.map((data, idx) => (
              <tr key={idx}>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.clientName}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {
                    // data.products.reduce((a, b) => a + b.unitPrice ,0) *
                    // data.products.reduce((a, b) => a + b.quantity ,0)
                    data.totalAmount
                  }
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.date}
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
                          to='/admin/invoice'
                          state={data._id}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <FaEye />
                          View
                        </Link>
                        {/* <li
                          onClick={() => handleActiveInactive(data._id, data.status)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                         <GrStatusUnknown />
                         {data.status ? 'Inactive' : 'Active'}
                        </li> */}
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {collectionData?.sales >= rows && <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={collectionData?.sales} onPageChange={onPageChange} />}
      </div>
    </div>
  );
};

export default SalesList;
