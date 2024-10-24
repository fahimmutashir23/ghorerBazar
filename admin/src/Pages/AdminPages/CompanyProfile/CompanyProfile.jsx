import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import AddCompanyModal from "./AddCompanyModal";
import Loader2 from "../../../Utils/Loader2";
import { url } from "../../../../connection";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Utils/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const CompanyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const imgUrl = `${url}/upload/logo/`
  const axiosSecure = useAxiosPublic();

  const {data, isLoading, refetch} = useQuery({
    queryKey: ["get-company-profile"],
    queryFn: async () => {
        const res = await axiosSecure.get("/api/get-company-profile")
        return res.data.result
    }
  })

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="mx-4 mt-2 flex justify-center">
      {loader && <Loader2 />}
      <div className="w-full mx-auto max-w-xl">
        <button
          onClick={() => setIsOpen(true)}
          className="text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500 flex items-center gap-2 hover:bg-gray-800 mx-auto"
        >
          <IoAddCircleOutline className="text-2xl font-bold" />
          <span className="mt-1">Update Company Profile</span>
        </button>
        <div className="mt-2">
            <div className="h-24 w-24 overflow-hidden flex justify-center mx-auto">
            <img src={`${imgUrl}${data.logo[0]}`} className="w-full h-full object-cover" alt="" />
            </div>
            <ul className="w-full text-xl space-y-2">
                <li className="flex"><strong className="w-1/3">Company Name:</strong><span>{data.name}</span></li>
                <li className="flex"><strong className="w-1/3">Owner Name:</strong>{data.ownerName}</li>
                <li className="flex"><strong className="w-1/3">Shop Address:</strong>{data.address.shopName}</li>
                <li className="flex"><strong className="w-1/3">Phone 1:</strong>{data.address.phone.phone1}</li>
                <li className="flex"><strong className="w-1/3">Phone 2:</strong>{data.address.phone.phone2}</li>
                <li className="flex"><strong className="w-1/3">Email:</strong>{data.address.email}</li>
                <li className="flex"><strong className="w-1/3">Details:</strong>{data.details}</li>
                <li className="flex"><strong className="w-1/3">Map:</strong></li>
                <div className="lg:flex-1 w-full">
            <iframe
              src={data.address.map}
              height="250"
              allowfullscreen=""
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
            </ul>
        </div>
      </div>
      <AddCompanyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setLoader={setLoader}
        fetchData={refetch}
        data={data}
      />
    </div>
  );
};

export default CompanyProfile;
