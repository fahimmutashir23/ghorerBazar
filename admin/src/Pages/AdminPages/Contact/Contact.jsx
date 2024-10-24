import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Utils/Loader";
import useGetCollectionLength from "../../../Hooks/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import { IoSearchSharp } from "react-icons/io5";

const Contact = () => {
  const axiosSecure = useAxiosSecure();
  const [phone, setPhone] = useState();
  const [collectionData, collectionLoading] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0)


  const {
    data: contacts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/get-contact-list?phone=${phone}&page=${page}&limit=${rows}`);
      return res.data;
    },
  });


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  useEffect(() => {
    refetch()
  }, [page, phone])


  if (isLoading || collectionLoading) {
    return <Loader />;
  }


  return (
    <div className=" rounded-md py-2 px-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex flex-1">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData.contact} )
            </button>
          </div>
          <div className="w-full flex-1 flex items-stretch">
            <input type="search" onChange={e => setPhone(e.target.value)} className="px-2 py-2 w-full border-2 border-gray-700 focus:outline-none" />
            <button onClick={() => setPhone(phone)} className="px-4 bg-gray-700 text-white"><IoSearchSharp className="text-3xl" /></button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto pb-32 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
            <th className="text-lg border w-2/12">Name</th>
            <th className="text-lg border w-1/12">Phone</th>
            <th className="text-lg border w-2/12">Email</th>
            <th className="text-lg border w-2/12">Subject</th>
              <th className="text-lg border">Message</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {contacts.result?.map((data, idx) => (
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
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  {data.email}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  {data.subject}
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg text-left border  text-black `}
                >
                  {data.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={collectionData.booking} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default Contact;



