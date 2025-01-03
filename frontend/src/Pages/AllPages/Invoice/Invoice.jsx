import Logo from "@/Shared/Logo";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const { name, phone, address, email, createdAt, totalAmount, products, invoiceId, deliveryCharge } =
    location.state;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md border">
      <section className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">Invoice</h1>
          <h3 className="text-xl font-semibold mb-2">Bill To:</h3>
          <div>
            <p className="text-sm">
              <strong>Customer Name: </strong>
              {name}
            </p>
            <p className="text-sm">
              <strong>Customer Phone: </strong>
              {phone}
            </p>
            <p className="text-sm">
              <strong>Customer Email: </strong>
              {email}
            </p>
            <p className="text-sm">
              <strong>Customer Address: </strong>
              {address}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-semibold">
            <Logo w={10} />
          </h2>
          <h2 className="text-xl font-semibold">Ghuri</h2>
          <p className="text-sm">Ichapur, Kalihati, Tangail, Bangladesh</p>
          <p className="text-sm">Email: ghuribazarbd@gmail.com</p>
          <p className="text-sm">Phone: +880 1729-798079</p>
          <div className="mt-6">
            <p className="text-sm">
              <strong>Order ID: </strong>
              {invoiceId}
            </p>
            <p className="text-sm">
              <strong>Date: </strong>
              {formatDate(createdAt)}
            </p>
          </div>
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
          {products?.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 text-center px-4">{product.quantity}</td>
              <td className="py-2 text-center px-4">
                {product.price}
              </td>
              <td className="py-2 text-center px-4">
                {product.price * product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="mt-6">
        <div className="flex justify-end items-center">
          <div className="text-right">
            <p className="text-sm">Tax (00%): 00</p>
            <p className="text-md font-semibold">Total: {totalAmount - deliveryCharge}/-</p>
            <p className="text-md font-semibold">Delivery Charge: {deliveryCharge}/-</p>
            <div className="h-[0.5px] bg-black mb-1"></div>
            <p className="text-md font-semibold">Sub Total: {totalAmount}/-</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invoice;
