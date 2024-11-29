import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useGetCollectionLength from "@/Hooks/Apis/useGetCollectionLength";
import AddBannerModal from "./AddBannerModal";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Loader2 from "@/Utils/Loader2";
import { imgUrl } from "@/Utils/imageUrl";
import UpdateBannerModal from "./UpdateBannerModal";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const BannerList = () => {
  const [popOpen, setPopOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState(null);
  const [collectionData, collectionLoading, collectionFetch] =
    useGetCollectionLength();
  // const paginateBtn = [...Array(10).keys()];

  const checkVideo = (src) => {
    const fileExtension = src.split(".").pop().toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg"];
    return videoExtensions.includes(fileExtension);
  };

  const {
    data: banners = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Banner"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-banner-list`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/api/delete-banner/${id}`);
    if (res.data) {
      toast.success("Delete Successful.");
      refetch();
    }
  };

  const handleUpdate = (data) => {
    setData(data);
    setPopOpen(true);
  };

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
          <AddBannerModal
            collectionFetch={collectionFetch}
            setLoader={setLoader}
            fetchData={refetch}
            loader={loader}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className=" grid grid-cols-1 lg:grid-cols-4 gap-2">
          {banners.result.map((banner) => (
            <div key={banner._id} className={`p-2 text-left border `}>
              <div className="h-32 lg:h-48 overflow-hidden">
                {checkVideo(banner.banner[0]) ? (
                  <video
                    src={`${imgUrl.banner}${banner.banner[0]}`}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`${imgUrl.banner}${banner.banner[0]}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="button_secondary mt-2"
                >
                  Delete
                </button>
                <h1 className="font-semibold text-lg text-black">
                  {banner.name === "1"
                    ? "Main Banner"
                    : banner.name === "2"
                    ? "Offer Banner"
                    : banner.name === "3"
                    ? "Left Ads"
                    : banner.name === "4"
                    ? "Right Ads"
                    : ""}
                </h1>
                <button
                  onClick={() => handleUpdate(banner)}
                  className="button_primary mt-2"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        <UpdateBannerModal
          data={data}
          setLoader={setLoader}
          loader={loader}
          fetchData={refetch}
          setIsOpen={setPopOpen}
          isOpen={popOpen}
        />
      </div>
    </div>
  );
};

export default BannerList;
