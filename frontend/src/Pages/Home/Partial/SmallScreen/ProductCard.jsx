import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import { imgUrl } from "@/Utils/imageUrl";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const axiosPublic = useAxiosPublic();
  const { setCartBar } = useContext(BasicContext);
  const [, , cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();

  const handleAddToCart = async (data) => {
    const info = {
      productId: data._id,
      name: data.name,
      images: data.images[0],
      price: data.price,
    };

    try {
      const res = await axiosPublic.post(`/api/save-cart`, info, {
        withCredentials: true,
      });
      if (res.data.status_code === 200) {
        toast.success(res.data.message);
        cartFetch();
        totalCartFetch();
        setCartBar(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="transition duration-300 ease-in-out shadow-sm hover:shadow-lg h-full rounded-md bg-white hover:border-green-500 mt-2">
      <div className="relative rounded-md flex flex-col justify-between group h-full border-2 border-color_2 hover:border-2 hover:border-green_color">
        <div className="w-full h-[100px] md:h-[230px] flex justify-center items-center relative p-1 rounded-md">
          <img
            className="w-full h-full object-cover"
            src={`${imgUrl.product}${product.images[0]}`}
            alt={product.name}
          />
        </div>
        <div className="text-center text-[14.4px] px-[10px] pt-[10px] border-t-2 ">
          <h6 className="hover:text-[#008000]">{product.name}</h6>
          {/* <p className="font-bold">{product.price}</p> */}
        </div>
        {/* <div className="text-center  mx-auto ">
                        <ReactStars
                          count={5}
                          onChange={() => {}}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#008000"
                          color="#008000"
                        />
                      </div> */}
        <div className="px-2 pb-4">
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-color_1 text-sm lg:text-base lg:py-1 font-medium text-white hover:scale-105 duration-300 w-full my-2"
          >
            Quick Add
          </button>
          <Link to={`/productDetails/${product._id}`} className="w-full">
            <button className="bg-color_1 text-sm lg:text-base lg:py-1 font-medium text-white hover:scale-105 duration-300 w-full">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
