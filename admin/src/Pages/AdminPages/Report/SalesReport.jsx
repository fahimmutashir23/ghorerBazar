import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Utils/Loader";
import useGetCollectionLength from "../../../Hooks/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { DatePickerWithRange } from "./DatePicker";
import { addDays, format } from "date-fns";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import useBulkSales from "@/Hooks/Reports/BulkReports/useBulkSales";


const SalesReport = () => {
  const [popOpen, setPopOpen] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [bulkSale] = useBulkSales();
  const [collectionData] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 0),
  });
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);


  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };


  const handleFilterDate = async (range) => {
      let signal = {}
    if(range?.type !== 'click'){
        signal = range
    } else{
        const formatDate = {
            to: format(date.to, "dd-LL-y"),
            from: format(date.to, "dd-LL-y")
        }
        signal = formatDate
    }
    console.log(signal);
    try {
        const res = await axiosSecure.post('/api/report/get-sales', {signal})
        if(res.data.success){
            setData(res.data.data.result)
            setTotalAmount(res.data.data.amount)
        }
    } catch (error) {
        toast.error(error.response.data)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

    useEffect(() => {
      handleFilterDate('today')
    }, [])

    if (!bulkSale || !collectionData) {
      return <Loader />;
    }

  return (
    <div className=" rounded-md py-2 px-3">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-1 px-3">
          <div
            className={`px-4 py-3 bg-violet-500 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">{"Today's Sale"}</h1>
            <h1 className="text-3xl text-center font-semibold">{bulkSale.todayAmount}<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-green-500 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Yesterday's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">{bulkSale.yesterdayAmount}<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-red-400 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Last Week's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">{bulkSale.lastWeekAmount}<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-yellow-800 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Last Month's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">{bulkSale.lastMonthAmount}<span className="text-xl">tk</span></h1>
          </div>
          <div
            className={`px-4 py-3 bg-gray-600 text-white rounded-md shadow-md`}
          >
            <h1 className="text-xl text-center font-semibold"></h1>
            <h1 className="text-xl text-center font-semibold">
              {"Last Year's Sale"}
            </h1>
            <h1 className="text-3xl text-center font-semibold">{bulkSale.lastYearAmount}<span className="text-xl">tk</span></h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full mt-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex flex-1">
            <DatePickerWithRange date={date} setDate={setDate} />
            <button onClick={handleFilterDate} className="bg-gray-700 px-2 text-white hover:bg-gray-800">Go</button>
          </div>
          <div className="w-full lg:w-3/12">
            <Select onValueChange={(value) => handleFilterDate(value)}>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="lastWeek">Last Week</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border">sl</th>
              <th className="text-lg border">Product Qty</th>
              <th className="text-lg border">Unit Price</th>
              <th className="text-lg border">Quantity</th>
              <th className="text-lg border">Total Amount</th>
              <th className="text-lg border">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((data, idx) => (
              <tr key={idx}>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {idx + 1}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  {data.products.length}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.products.map(product => (
                    <li className="list-item" key={product._id}>{product?.unitPrice}</li>
                  ))}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                 {
                    data.products.reduce((a, b) => a + b.quantity ,0)
                 }
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.totalAmount}
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
                          <IoMdEye /> View
                        </Link>
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator
          className="bg-gray-700 max-w-fit mx-auto mt-2 text-white"
          first={first}
          rows={rows}
          totalRecords={collectionData.sales}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default SalesReport;
