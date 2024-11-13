import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GrStatusUnknown } from "react-icons/gr";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Utils/Loader";
import useGetCollectionLength from "../../../Hooks/Apis/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import { IoMdEye } from "react-icons/io";
import InvoiceModal from "../Invoice/InvoiceModal";

const BookingsList = () => {
  const [popOpen, setPopOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setInvoiceId } = useContext(BasicContext);
  const axiosSecure = useAxiosSecure();
  const [collectionData, collectionLoading] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  // filtering state
  const [phone, setPhone] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [name, setName] = useState(null);

  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/get-bookings-list?phone=${phone}&invoiceId=${orderId}&page=${page}&name=${name}&limit=${rows}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/delete-booking/${id}`);
      if (res.data) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleActiveInactive = async (id, statusCode) => {
    try {
      const status = {
        status: statusCode === "pending" ? "confirm" : "pending",
      };
      const res = await axiosSecure.put(`/api/update-booking/${id}`, status);
      if (res.data) {
        toast.success("Bookings Update Successfully");
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
    refetch();
  }, [page, phone, orderId, name]);

  const openInvoice = (invoiceId) => {
    setInvoiceId(invoiceId);
    setIsOpen(true);
  };


  if (isLoading || collectionLoading) {
    return <Loader />;
  }

  return (
    <div className=" rounded-md py-2 px-3">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex flex-1">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData.booking} )
            </button>
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col md:flex-row items-stretch gap-2 my-2">
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="search"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="px-2 w-full border-2 border-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="orderId">Invoice Id</label>
            <input
              id="orderId"
              type="search"
              onChange={(e) => setOrderId(e.target.value)}
              className="px-2 w-full border-2 border-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="search"
              onChange={(e) => setName(e.target.value)}
              className="px-2 w-full border-2 border-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto pb-20 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border w-3/12">Customer Name</th>
              <th className="text-lg border w-1/12">Mobile</th>
              <th className="text-lg border w-4/12">Product Name</th>
              <th className="text-lg border w-1/12">Category</th>
              <th className="text-lg border">Amount</th>
              <th className="text-lg border">OrderId</th>
              <th className="text-lg border">Address</th>
              <th className="text-lg border">Status</th>
              <th className="text-lg border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.result?.map((data, idx) => (
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
                  {data.products.map((product) => (
                    <li className="list-item" key={product._id}>
                      {product?.productId?.name} ({product?.quantity})
                    </li>
                  ))}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.products.map((product) => (
                    <li className="list-item" key={product._id}>
                      {product.productId?.name}
                    </li>
                  ))}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.totalAmount}
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
                          onClick={() =>
                            handleActiveInactive(data._id, data.status)
                          }
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <GrStatusUnknown />
                          {data.status === "pending" ? "Confirm" : "Pending"}
                        </li>
                        <li
                          onClick={() => openInvoice(data.invoiceId)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <IoMdEye />
                          View Invoice
                        </li>
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen && <InvoiceModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        <Paginator
          className="bg-gray-200 max-w-fit mx-auto mt-2 text-black"
          first={first}
          rows={rows}
          totalRecords={collectionData.booking}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BookingsList;
