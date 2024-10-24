import useAxiosPublic from "@/Hooks/useAxiosPublic";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ data }) => {
  const axiosPublic = useAxiosPublic();

  const handleAddToCart = async (data) => {
    const info = {
      name: data.name,
      images: data.images[0],
      price: data.price,
    }

    const ip = await axios.get('https://api.ipify.org?format=json')
    console.log(ip.data);
  
    try {
      const res = await axiosPublic.post(`/api/save-cart`, info)
      if(res.data.status_code === 200){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="border rounded-sm p-4 flex flex-col">
      <div className="h-[70%]">
        <img src={data.images} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="">
        <p className="mt-3 text-center">{data.name}</p>
        <p className="mt-3 text-center">{data.price}</p>
        <button onClick={() => handleAddToCart(data)} className="bg-color_1 py-1 font-medium text-white hover:scale-105 duration-300 w-full mt-3">Quick Add</button>
      </div>
    </div>
  );
};

export default Card;
