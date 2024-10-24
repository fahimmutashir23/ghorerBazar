import moment from "moment";
import AddExpenseModal from "./AddExpenseModal";
import { useState } from "react";
import Loader2 from "../../../Utils/Loader2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateExpenseModal from "./UpdateExpenceModal";
import Loader from "../../../Utils/Loader";
import { useQuery } from "@tanstack/react-query";

const ExpenseView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [expenseName, setExpenseName] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const {state} = useLocation()
  const [updatingData, setUpdatingData] = useState(null);
  const navigate = useNavigate()

  const { data: expense = [], isLoading, refetch } = useQuery({
    queryKey: ["get-single-expense"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/get-single-expense/${state}`);
      return res.data.result;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoader(true);

    const notes = e.target.notes.value;
    const makerName = e.target.makerName.value;

    const info = {
      makerName,
      expenseName: expenseName || expense.expenseName,
      quantity: products.length + expense.expenses.length,
      totalAmount: totalAmount + expense.expenses.reduce((a, b) => a + b.amount, 0),
      date: expense.date,
      notes,
      expenses: products,
    };

    try {
      const res = await axiosSecure.patch(`/api/update-expense/${state}`, info);
      if (res.data.success) {
        toast.success(res.data.message);
        setLoader(false);
        e.target.reset();
        navigate('/admin/expenseList')
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data);
    }
  };

  const handleOpenUpdatingModal = (data) => {
    setIsOpen(true)
    setUpdatingData(data)
  }

  if(isLoading) return <Loader />

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-2 items-start">
      {loader && <Loader2 />}
      <div className="w-8/12 border-2 border-gray-700 p-2 space-y-4">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex-1">
            <h1 className="text-3xl">LOGO</h1>
          </div>
          <form className="flex-1 flex flex-col items-end">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Date</label>
              <input
                type="text"
                name="date"
                defaultValue={expense.date}
                className="bg-white focus:ring-0 px-2 py-1 focus:border w-full focus:outline-none border border-black"
                placeholder="Type Here"
                disabled
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="font-semibold">Expense Name*</label>
              <input
                type="text"
                name="expenseName"
                defaultValue={expense.expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                placeholder="Type Here"
                required={isRequired}
              />
            </div>
            {isRequired && (
              <p className="text-red-400 text-xs">This field is required</p>
            )}
          </form>
        </div>
        <hr />
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
              <div className="flex">
                <button className=" bg-gray-700 text-white px-5 h-10 font-bold duration-500 flex items-center gap-2">
                  All ( {products.length + expense.expenses.length} )
                </button>
              </div>
              <AddExpenseModal
                setProducts={setProducts}
                products={products}
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table border border-blue-900">
              {/* head */}
              <thead className="">
                <tr className="uppercase text-center bg-gray-700 text-white font-bold ">
                  <th className="text-md border w-1/12">SL</th>
                  <th className="text-md border w-3/12">Name</th>
                  <th className="text-md border w-2/12">Cat</th>
                  <th className="text-md border">Details</th>
                  <th className="text-md border w-2/12">Amount</th>
                  <th className="text-md border w-2/12">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {expense?.expenses.map((data, idx) => (
                  <tr key={idx}>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {idx + 1}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.name}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.category}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.details}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.amount}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      <button onClick={() => handleOpenUpdatingModal(data)}>Edit</button>
                    </td>
                  </tr>
                ))}
                {products.map((data, idx) => (
                  <tr key={idx}>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {expense.expenses.length + idx + 1}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.name}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.category}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.details}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {data.amount}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-2 flex flex-col items-end">
            <div className="flex-1 flex flex-col items-end">
              <div className="flex items-center gap-2">
                <label className="font-semibold">Quantity:</label>
                <input
                  type="text"
                  name="quantity"
                  value={products.length + expense.expenses.length}
                  className="bg-white focus:ring-0 py-1 px-2 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                  disabled
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="font-semibold">Total Amount: </label>
                <input
                  type="text"
                  name="totalAmount"
                  value={totalAmount + expense.expenses.reduce((a, b) => a + b.amount, 0)}
                  className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                  placeholder="Type Here"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="w-4/12 border-2 border-gray-700 p-2"
      >
        <div>
          <label className="font-semibold text-md">Notes*</label>
          <textarea
            name="notes"
            defaultValue={expense.notes}
            className="bg-white focus:ring-0 px-2 py-1 focus:border w-full focus:outline-none border border-black"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="font-semibold">Name*</label>
          <input
            type="text"
            defaultValue={expense.makerName}
            name="makerName"
            className="bg-white focus:ring-0 px-2 py-1 w-full focus:border focus:outline-none border border-black"
            placeholder="Type Here"
            required
          />
        </div>
        <button type="submit" className="button_primary w-full mt-2">
          Update
        </button>
      </form>
      <UpdateExpenseModal refetch={refetch} setIsOpen={setIsOpen} isOpen={isOpen} updatingData={updatingData} />
    </div>
  );
};

export default ExpenseView;
