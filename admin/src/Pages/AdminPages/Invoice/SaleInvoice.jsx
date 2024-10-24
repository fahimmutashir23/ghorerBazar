import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loader from "@/Utils/Loader";
import Logo from "@/Utils/Logo";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { BsFillPrinterFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";

const SaleInvoice = () => {
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();
  const componentRef = useRef();

  const { data, isLoading } = useQuery({
    queryKey: ["client_invoice"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/get-singleSale/${state}`);
      return res.data.result;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="px-4">
        <ReactToPrint
          trigger={() => (
            <div className="">
              <button className="button_primary w-full mb-2 flex gap-2 items-center justify-center">
                <BsFillPrinterFill />
                Print Invoice
              </button>
            </div>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="p-4" ref={componentRef}>
        <div className=" p-4 bg-white border border-blue-600 rounded-sm">
          <section className="mb-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-6">Invoice</h1>
              <h3 className="text-xl font-semibold mb-2">Bill To:</h3>
              <div>
                <p className="text-sm">
                  <strong>Customer Name: </strong>
                  {data.clientName}
                </p>
                <p className="text-sm">
                  <strong>Customer Phone: </strong>
                  {data.clientPhone}
                </p>
                <p className="text-sm">
                  <strong>Customer Address: </strong>
                  {data.clientAdd}
                </p>

                <div className="mt-6">
                  <p className="text-sm">
                    <strong>Invoice ID: </strong>
                    {data.invoiceId}
                  </p>
                  <p className="text-sm">
                    <strong>Date: </strong>
                    {data.date}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Logo />
              <h2 className="text-xl font-semibold">Tech Hub</h2>
              <p className="text-sm">Your Address Line 1</p>
              <p className="text-sm">City, State, Zip Code</p>
              <p className="text-sm">Email: your-email@example.com</p>
              <p className="text-sm">Phone: (123) 456-7890</p>
            </div>
          </section>

          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="py-2 text-left px-4">Description</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Unit Price</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.products?.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-2 px-4">{product.productName}</td>
                  <td className="py-2 text-center px-4">{product.quantity}</td>
                  <td className="py-2 text-center px-4">{product.unitPrice}</td>
                  <td className="py-2 text-center px-4">
                    {product.unitPrice * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="mt-6">
            <div className="flex justify-end items-center">
              <div className="text-right">
                <p className="text-sm">Tax (00%): 00</p>
                <p className="text-sm">Discount: {data.discountAmount}</p>
                <p className="text-md font-semibold">
                  Total: {data.totalAmount}/-
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SaleInvoice;
