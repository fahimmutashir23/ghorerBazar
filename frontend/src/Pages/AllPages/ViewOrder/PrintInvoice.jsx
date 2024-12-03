import logo from "../../../assets/Logo/logo.jpg";
import { MdPrint } from "react-icons/md";

const PrintInvoice = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handlePrint = () => {
    const printContents = document.getElementById('printableInvoice');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
              .logo{
                width: 40px;
                margin-bottom: -20px;
              }
            .divided-header {
                display: flex;
                justify-content: space-between;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: white;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 24px;
            }
            .company-logo {
              text-align: right;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th {
              background-color: #f3f4f6;
              padding: 8px 16px;
              text-align: left;
            }
            td {
              padding: 8px 16px;
              border-top: 1px solid #e2e8f0;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .totals {
              margin-top: 24px;
              text-align: right;
            }
            .divider {
              height: 1px;
              background-color: black;
              margin: 4px 0;
            }
            .font-bold { font-weight: bold; }
            .text-2xl { font-size: 1.5rem; }
            .text-xl { font-size: 1.25rem; }
            .text-sm { font-size: 0.875rem; }
            @media print {
              body { print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${printContents.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    };
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="flex items-center gap-1 bg-color_3 px-2 text-white"
      >
        <MdPrint />
        Print
      </button>
      <div id="printableInvoice" className="max-w-3xl mx-auto p-4 hidden bg-white shadow-md rounded-md border">
        <section className="mb-6 flex justify-between divided-header">
          <div>
            <h1 className="text-2xl font-bold mb-6">Invoice</h1>
            <h3 className="text-xl font-semibold mb-2">Bill To:</h3>
            <div>
              <p className="text-sm">
                <strong>Customer Name: </strong>
                {data.name}
              </p>
              <p className="text-sm">
                <strong>Customer Phone: </strong>
                {data.phone}
              </p>
              <p className="text-sm">
                <strong>Customer Email: </strong>
                {data.email}
              </p>
              <p className="text-sm">
                <strong>Customer Address: </strong>
                {data.address}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold">
              <img src={logo} className="logo" alt="" />
            </h2>
            <h2 className="text-xl font-semibold">Ghuri</h2>
            <p className="text-sm">Email: ghuri@gmail.com</p>
            <p className="text-sm">Phone: +880 1729-798079</p>
            <div className="mt-6">
              <p className="text-sm">
                <strong>Order ID: </strong>
                {data.invoiceId}
              </p>
              <p className="text-sm">
                <strong>Date: </strong>
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>
        </section>

        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-100">
              <th className="py-2 text-center px-4">Description</th>
              <th className="py-2 text-center px-4">Quantity</th>
              <th className="py-2 text-center px-4">Unit Price</th>
              <th className="py-2 text-center px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.products?.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 text-center px-4">{product.quantity}</td>
                <td className="py-2 text-center px-4">{product.price}</td>
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
              <p className="text-md font-semibold">
                Total: {data.totalAmount - data.deliveryCharge}/-
              </p>
              <p className="text-md font-semibold">
                Delivery Charge: {data.deliveryCharge}/-
              </p>
              <div className="h-[0.5px] bg-black mb-1"></div>
              <p className="text-md font-semibold">
                Sub Total: {data.totalAmount}/-
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrintInvoice;
