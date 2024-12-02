// import { BasicContext } from "@/ContextAPIs/BasicProvider";
// import useAxiosPublic from "@/Hooks/useAxiosPublic";
// import useGetCart from "@/Hooks/useGetCart";
// import useTotalCart from "@/Hooks/useTotalCart";
// import { useContext } from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { imgUrl } from "@/Utils/imageUrl";
import { Rating } from "primereact/rating";

const Card = ({ data }) => {
  // const axiosPublic = useAxiosPublic();
  // const [, , cartFetch] = useGetCart();
  // const [, , totalCartFetch] = useTotalCart();
  // const { setCartBar } = useContext(BasicContext);

  // const handleAddToCart = async (data) => {
  //   const info = {
  //     productId: data._id,
  //     name: data.name,
  //     images: data.images[0],
  //     price: data.price,
  //   };

  //   try {
  //     const res = await axiosPublic.post(`/api/save-cart`, info, {
  //       withCredentials: true,
  //     });
  //     if (res.data.status_code === 200) {
  //       toast.success(res.data.message);
  //       cartFetch();
  //       totalCartFetch();
  //       setCartBar(true);
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  return (
    <Link
      to={`/productDetails/${data._id}`}
      className="border-2 rounded-sm p-2 flex flex-shrink-0 flex-col hover:border-red-500 duration-300 relative h-60 w-60"
    >
      {data.discount > 0 && (
        <div className="absolute top-0 left-0 px-2 py-1 bg-color_4 text-sm text-white font-medium rounded-br-md">
          Discount: <span className="font-bold">{data.discount}</span>%
        </div>
      )}
      <div className="h-3/5 w-full overflow-hidden">
        <img
          src={`${imgUrl.product}${data.images[0]}`}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className=" flex flex-col items-center">
        <p className="mt-2 text-center font-semibold">{data.name}</p>
        <Rating value={data.reviews} readOnly cancel={false} />
        {/* <p className=" text-center">{data.price}</p> */}
        {/* <button
          onClick={() => handleAddToCart(data)}
          className="bg-color_1 py-1 font-medium text-white hover:scale-105 duration-300 w-full mt-1"
        >
          {data.stock <= 0 ? "Out of Stock" : "Quick Add"}
        </button> */}
        <p
          className="text-center mt-2"
          dangerouslySetInnerHTML={{
            __html: data.details.slice(0, 50),
          }}
        ></p>
      </div>
    </Link>
  );
};

export default Card;
