import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import useGetCollectionLength from "@/Hooks/Apis/useGetCollectionLength";
import { Paginator } from 'primereact/paginator';
import AddBannerModal from "./AddBannerModal";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Loader2 from "@/Utils/Loader2";
import { imgUrl } from "@/Utils/imageUrl";

const BannerList = () => {
  const [popOpen, setPopOpen] = useState(null);
  const [loader, setLoader] = useState(false)
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [collectionData, collectionLoading, collectionFetch] = useGetCollectionLength();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0)
  // const paginateBtn = [...Array(10).keys()];



  const togglePopOpen = (idx) => {
    setPopOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const {
    data: banners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Banner"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-banner-list?page=${page}&limit=${rows}`);
      return res.data;
    },
  });

  const handleUpdate = async (data) => {
    const info = {
      status: data.isActive
    }
    try {
      const res = await axiosSecure.put(`/api/update-banner/${data._id}`, info);
      if (res.data) {
        toast.success("Banner Update Successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/delete-banner/${id}`);
      if (res.data) {
        toast.success("Banner Deleted Successfully");
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
    refetch()
  }, [page])

  if (isLoading || collectionLoading) {
    return <Loader2 />;
  }
  
  return (
    <div className=" rounded-md py-2 px-3">
       {loader && <Loader2 />}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex">
            <button
              className={`text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500`}
            >
              All( {collectionData.banners} )
            </button>
          </div>
          <AddBannerModal collectionFetch={collectionFetch} setLoader={setLoader} fetchData={refetch} />
        </div>
      </div>
      <div className="overflow-x-auto pb-32 ">
        <table className="table border border-blue-900">
          {/* head */}
          <thead className="h-[40px]">
            <tr className="uppercase text-center h-[40px] bg-gray-700 text-white font-bold ">
              <th className="text-lg border">Banner</th>
              <th className="text-lg border">Status</th>
              <th className="text-lg border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {banners.result.map((data, idx) => (
              <tr key={idx}>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-left border  text-black `}
                >
                  <img src={`${imgUrl.profile}${data.banner}`} alt="" />
                </td>
                <td
                  className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                >
                  {data.isActive ? "Active" : "Inactive"}
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
                          onClick={() => handleUpdate(data)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <BiEdit />
                          {data.isActive ? "Inactive" : "Active"}
                        </li>
                        <li
                          onClick={() => handleDelete(data._id)}
                          className="w-full p-2 font_standard transition-all flex items-center list_hover gap-2"
                        >
                          <MdDelete /> Delete
                        </li>
                      </ul>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={collectionData.product} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default BannerList;
