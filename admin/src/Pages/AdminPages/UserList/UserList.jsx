import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Utils/Loader";
import useGetCollectionLength from "../../../Hooks/useGetCollectionLength";
import { Paginator } from "primereact/paginator";
import { IoAddCircleOutline, IoSearchSharp } from "react-icons/io5";
import useHasAccess from "../../../Hooks/useHasAccess";

const UserList = () => {
  const [popOpen, setPopOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [hasAccess ] = useHasAccess()
  const [collectionData, collectionLoading, collectionFetch] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(" ");

  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user-list"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/get-users?page=${page}&limit=${rows}&date=${date}`
      );
      return res.data.result;
    },
  });

  const handleActiveInactive = async (id, statusCode) => {
    try {
      const status = {
        status: statusCode === true ? false : true,
      };
      const res = await axiosSecure.put(
        `/api/activeInactive-expense/${id}`,
        status
      );
      if (res.data) {
        toast.success("Update Successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/delete-user/${id}`);
      if (res.data) {
        toast.success(res.data.message);
        refetch();
        collectionFetch()
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
  }, [page, date]);


  if (isLoading || collectionLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-2 pt-4 space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
        <div className="flex flex-col md:flex-row md:items-center lg:gap-6 md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData.user} )
            </button>
          </div>
          <div className="flex-1 flex items-stretch">
            <input type="search" onChange={e => setDate(e.target.value)} className="px-2 py-2 w-full border-2 border-gray-700 focus:outline-none" />
            <button onClick={() => setDate(date)} className="px-4 bg-gray-700 text-white"><IoSearchSharp className="text-3xl" /></button>
          </div>
          {hasAccess?.some(item => item === 'user-create') &&
            <button
          onClick={() => setIsOpen(true)}
          className="text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500 flex items-center gap-2"
        >
          <IoAddCircleOutline className="text-2xl font-bold" />
          <span>Add User</span>
        </button>}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table border ">
          {/* head */}
          <thead className="h-[40px] bg-bg_slate text-_white">
            <tr className="uppercase text-center h-[40px] font-bold">
              <th className="text-text_sm table_border border uppercase">
                Serial
              </th>
              <th className="text-text_sm table_border border uppercase">
                Name
              </th>
              <th className="text-text_sm table_border border uppercase">
                Email
              </th>
              <th className="text-text_sm table_border border uppercase">
                Phone
              </th>
              <th className="text-text_sm table_border border uppercase">
                Role
              </th>
              <th className="text-text_sm table_border border uppercase">
                Status
              </th>
              <th className="text-text_sm table_border border uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" text-center">
            {data.map((data, idx) => (
              <tr key={data.id}>
                <td
                  className={`px-6 pt-2 text-text_sm whitespace-nowrap text-center border  text-black font-bold w-20`}
                >
                  {idx + 1}
                </td>
                <td
                  className={`px-6 pt-2 text-text_sm whitespace-nowrap text-center border  text-black `}
                >
                  {data.name}
                </td>
                <td
                  className={`px-6 pt-2 text-text_sm whitespace-nowrap text-center border text-black `}
                >
                  {data.email}
                </td>
                <td
                  className={`px-6 pt-2 text-text_sm whitespace-nowrap text-center border text-black `}
                >
                  {data.phone}
                </td>
                <td
                  className={`px-6 pt-2 text-text_sm whitespace-nowrap text-center border text-black `}
                >
                  {data.role}
                </td>
                <td className="border ">
                  <button
                    className={`rounded-sm ${
                      data.status
                        ? "bg_status_primary"
                        : "bg_status_success"
                    }  font-semibold border-none`}
                  >
                    {data.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="border ">
                  <button
                    className="rounded-md border-none py-0 px-2 relative"
                    onClick={() => togglePopOpen(data._id)}
                  >
                    <BsThreeDotsVertical className="text-lg font-bold text_color" />
                    <div
                      className={`bg-_white border border_bg absolute ${
                        popOpen === data._id ? "scale-100 z-10" : "scale-0"
                      } right-[14px] top-[24px] rounded-md rounded-tr-sm duration-300 origin-top-right w-44`}
                    >
                      <ul className="text_color text-left">
                        {hasAccess?.some(item => item === 'user-edit') &&
                          <li
                          onClick={() =>
                            handleActiveInactive(data._id, data.status)
                          }
                          className="w-full p-2 text-text_sm transition-all flex items-center list_hover gap-2"
                        >
                          {data.status === 1 ? <IoMdEyeOff /> : <IoMdEye />}{" "}
                          {data.status === 1 ? "Inactive" : "Active"}
                        </li>
                        }
                        {hasAccess?.some(item => item === 'user-delete') &&
                          <li
                            onClick={() => handleDelete(data._id)}
                            className="w-full p-2 text-text_sm transition-all flex items-center list_hover gap-2"
                          >
                            <MdDelete /> Delete
                          </li>
                        }
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddUserModal isOpen={isOpen} setIsOpen={setIsOpen} fetchData={refetch} collectionFetch={collectionFetch} />
      {collectionData.user >= rows && (
        <Paginator
          className="bg-gray-700 max-w-fit mx-auto mt-2 text-white"
          first={first}
          rows={rows}
          totalRecords={collectionData.expenseCategory}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default UserList;
