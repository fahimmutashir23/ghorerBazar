import { imgUrl } from "@/Utils/imageUrl";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/productDetails/${product._id}`} className="transition duration-300 ease-in-out shadow-sm hover:shadow-lg h-full rounded-md bg-white hover:border-green-500 mt-2">
      <div className="relative rounded-md flex flex-col justify-between group h-full border-2 border-color_2 hover:border-2 hover:border-green_color">
        <div className="w-full h-[100px] md:h-[230px] flex justify-center items-center relative p-1 rounded-md">
          <img
            className="w-full h-full object-contain"
            src={`${imgUrl.product}${product.images[0]}`}
            alt={product.name}
          />
        </div>
        <div className="text-center text-[14.4px] px-[10px] pt-[10px] border-t-2 flex flex-col items-center ">
          <h6 className="hover:text-[#008000] font-semibold">{product.name}</h6>
          {/* <p className="font-bold">{product.price}</p> */}
          <Rating value={product.reviews} readOnly cancel={false} />
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
              __html: product.details.slice(0, 30),
            }}
          ></p>
        </div>
        <div className="px-2 pb-1">
          {/* <button
            onClick={() => handleAddToCart(product)}
            className="bg-color_1 text-sm lg:text-base lg:py-1 font-medium text-white hover:scale-105 duration-300 w-full my-2"
          >
            Quick Add
          </button> */}
          {/* <Link to={`/productDetails/${product._id}`} className="w-full">
            <button className="bg-color_1 text-sm lg:text-base lg:py-1 font-medium text-white hover:scale-105 duration-300 w-full rounded-sm">
              See Details
            </button>
          </Link> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
