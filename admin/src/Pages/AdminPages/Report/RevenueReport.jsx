import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GrStatusUnknown } from "react-icons/gr";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Utils/Loader";
import useGetCollectionLength from "../../../Hooks/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import { IoSearchSharp } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { DatePickerWithRange } from "./DatePicker";
import { addDays, format } from "date-fns";


const RevenueReport = () => {
  const [popOpen, setPopOpen] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [phone, setPhone] = useState();
  const [collectionData, collectionLoading] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);

  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

//   console.log(format(date.from, "dd-LL-y"));
//   console.log(format(date.to, "dd-LL-y"));

  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  //   const {
  //     data: products = [],
  //     isLoading,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ["bookings"],
  //     queryFn: async () => {
  //       const res = await axiosSecure(`/api/get-bookings-list?phone=${phone}&page=${page}&limit=${rows}`);
  //       return res.data;
  //     },
  //   });

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  //   useEffect(() => {
  //     refetch()
  //   }, [page, phone])

  //   if (isLoading || collectionLoading) {
  //     return <Loader />;
  //   }

  return (
    <div className=" rounded-md py-2 px-3">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-1 px-3">
          <div
            className={`px-4 py-3 bg-violet-500 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">{"Today's Sale"}</h1>
            <h1 className="text-3xl text-center font-semibold">10<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-green-500 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Yesterday's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">10<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-red-600 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Last Week's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">10<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-yellow-800 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Last Month's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">10<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-gray-600 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Last Year's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">10<span className="text-xl">tk</span></h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full mt-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex flex-1">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="w-full lg:w-3/12">
            <Select>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Daily</SelectItem>
                <SelectItem value="2">Yesterday</SelectItem>
                <SelectItem value="3">Last Week</SelectItem>
                <SelectItem value="4">Last Month</SelectItem>
                <SelectItem value="5">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto pb-32 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border w-1/12">sl</th>
              <th className="text-lg border w-5/12">Product Name</th>
              <th className="text-lg border w-2/12">Unit Price</th>
              <th className="text-lg border w-2/12">Quantity</th>
              <th className="text-lg border w-2/12">Total Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* {products.result?.map((data, idx) => (
              <tr key={idx}>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  {data.name}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  {data.phone}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.products.map(product => (
                    <li className="list-item" key={product._id}>{product?.productId?.name} ({product?.quantity})</li>
                  ))}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.products.map(product => (
                    <li className="list-item" key={product._id}>{product.productId?.category}</li>
                  ))}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.price}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.invoiceId}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.address}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black`}
                >
                  <span className={`${data.status === 'pending' ? "bg_status_secondary" : "bg_status_primary"}`}>{data.status}</span>
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
                         {data.status === 'pending' ? 'Confirm' : 'Pending'}
                        </li>
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <Paginator
          className="bg-gray-700 max-w-fit mx-auto mt-2 text-white"
          first={first}
          rows={rows}
          totalRecords={collectionData.booking}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default RevenueReport;
