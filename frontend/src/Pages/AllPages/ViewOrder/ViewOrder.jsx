import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Loader2 from "@/Utils/Loader2";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PrintInvoice from "./PrintInvoice";

const ViewOrder = () => {
  const axiosPublic = useAxiosPublic();
  const [phone, setPhone] = useState(null);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);

//   const handlePrint = useReactToPrint({
//     content: () => invoiceRef.current
//   });



  const handleSearch = async () => {
    setLoader(true);
    const res = await axiosPublic(`/api/get-order?phone=${phone}`);
    setData(res.data);
    setLoader(false);
  };

  if (loader) return <Loader2 />;

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto min-h-[31vh]">
      <div className="w-1/2 relative">
        <label htmlFor="phone">Your Phone</label>
        <input
          type="search"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          className="px-2 border w-full py-1 border-gray-700 focus:outline-none"
          placeholder="Search Order"
        />
        <button
          onClick={handleSearch}
          className="absolute bg-color_1 py-2 px-3 right-0"
        >
          <FaMagnifyingGlass className="text-xl text-white" />
        </button>
      </div>
      <table className="border border-blue-900 w-full">
        {/* head */}
        <thead className="">
          <tr className="text-center bg-color_1 text-white font-bold">
            <th className="text-lg border w-3/12 py-1">Customer Name</th>
            <th className="text-lg border w-1/12">Mobile</th>
            <th className="text-lg border w-4/12">Product Name</th>
            <th className="text-lg border">Amount</th>
            <th className="text-lg border">Order Id</th>
            <th className="text-lg border">Status</th>
            <th className="text-lg border">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.result.map((data, idx) => (
            <tr key={idx}>
              <td
                className={`px-6 py-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
              >
                {data.name}
              </td>
              <td
                className={`px-6 py-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
              >
                {data.phone}
              </td>
              <td
                className={`px-6 py-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
              >
                {data.products.map((product) => (
                  <li className="list-item" key={product._id}>
                    {product?.name} ({product?.quantity})
                  </li>
                ))}
              </td>
              <td
                className={`px-6 py-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
              >
                {data.totalAmount}
              </td>
              <td
                className={`px-6 py-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
              >
                {data.invoiceId}
              </td>
              <td
                className={`px-6 py-2 font-semibold text-lg whitespace-nowrap text-center border  text-black`}
              >
                <span
                  className={`${
                    data.status === "pending"
                      ? "bg_status_secondary"
                      : "bg_status_primary"
                  }`}
                >
                  {data.status}
                </span>
              </td>
              <td
                className={`font-semibold text-lg whitespace-nowrap text-center border  text-black overflow-hidden`}
              >
                {/* <button onClick={handlePrint} className="flex items-center gap-1 bg-color_3 px-2 text-white">
                  <MdPrint />
                  Print
                </button> */}
                  <PrintInvoice data={data} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.result.length < 1 && (
        <div className="text-center mt-2 lg:text-xl font-semibold">
          There are no order found.
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
