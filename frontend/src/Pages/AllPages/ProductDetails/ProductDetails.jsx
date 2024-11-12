import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import Loader2 from "@/Utils/Loader2";
import ImageZoom from "./Partial/ImageZoom/ImageZoom";
import DetailsTab from "./Partial/DetailsTab";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useDeliveryCharge from "@/Hooks/useDeliveryCharge";
import { imgUrl } from "@/Utils/imageUrl";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const axiosPublic = useAxiosPublic();
  const [, , cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
  const { setCartBar } = useContext(BasicContext);
  const [delivery] = useDeliveryCharge();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const {
    data: singleProduct,
    isLoading
  } = useQuery({
    queryKey: ["product_single"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-product-details/${id}`);
      return res.data.result;
    },
  });

  const handleAddToCart = async (data) => {
    const info = {
      productId: data._id,
      name: data.name,
      images: data.images[0],
      price: data.price,
      quantity,
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

  const handleQuantityChange = (value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity(parsedValue);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (isLoading) return <Loader2 />;

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start min-h-full gap-6">
          <div className="items-center w-full lg:w-[40%]">
            <div className="border-2 rounded-md hover:border-green_color w-full h-full overflow-hidden">
              <ImageZoom
                className="rounded-md w-full h-full object-cover"
                image={`${imgUrl.product}${singleProduct.images[0]}`}
              />
            </div>

            <div className="flex items-center justify-center m-3 gap-3 flex-row">
              <button className="h-20 w-20 border rounded-md border-gray-500">
                <img
                  className="h-full w-full"
                  src={`${imgUrl.product}${singleProduct.images[0]}`}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="flex items-start flex-col w-full lg:w-[60%]">
            <div className="w-full">
              {/* <p className=''>{singleProduct?.singleProductData?.category_data?.category_name}</p> */}
              <p className="font-bold text-2xl text-color_1">
                {singleProduct?.name}
              </p>

              <div>
                <hr className="my-3" />
                <div className="w-full mb-3">
                  <h2 className="text-lg font-medium">Delivery Charge:</h2>
                  <div className="font-medium">
                    {delivery.map((charge, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="radio" name="" id={idx} />
                        <span id={idx}>{charge.name}-</span>
                        <span id={idx}>{charge.amount}৳</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="my-3" />
              <h2 className="text-lg font-semibold">Product Price:</h2>
              <div className="mt-1 flex justify-between">
                <span className="font-medium text-lg">
                  Unit Price:{" "}
                  <span className="font-bold text-red-800">
                    {singleProduct.price}
                  </span>{" "}
                  BDT
                </span>
                <span className="font-medium text-lg">
                  Total Price:{" "}
                  <span className="font-bold text-red-800">
                    {singleProduct.price * quantity}
                  </span>{" "}
                  BDT
                </span>
              </div>
              <hr className="my-3" />
              <h2 className="text-lg font-semibold">Quantity</h2>
              <div className="flex items-center gap-10 w-full">
                <div className="flex">
                  <div className="border">
                    <button
                      className="px-4 font-bold font_standard my-1.5"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                  </div>
                  <div className="border-y">
                    <input
                      type="number"
                      className="font-bold font_standard pl-2 w-[60px] lg:w-[100px] text-center mx-auto h-full"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="border">
                    <button
                      className="px-4 font-bold font_standard my-1.5"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full my-3">
                <button
                  //   onClick={handleBuyNow}
                  className="button_primary flex items-center gap-2 w-full justify-center"
                >
                  <span className="font-bold">
                    <MdShoppingCart />{" "}
                  </span>{" "}
                  Buy Now
                </button>
                <button
                  className="button_primary flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(singleProduct)}
                >
                  <FaCartPlus />
                  Add To Cart
                </button>
              </div>
              <div className="flex items-center justify-between w-full border-y py-p_8px text-text_standard font-semibold">
                <p className="text-text_standard font-semibold">
                  <span className="hover:underline">
                    Category: {singleProduct.category.name}
                  </span>
                </p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleProduct?.details,
                }}
                className="text-text_standard font-medium mt-2"
              ></div>
            </div>
          </div>
        </div>
        <DetailsTab singleProduct={singleProduct} />

        {/* <div>
          <RelatedProductData
            refetch={refetch}
            singleProduct={singleProduct}
          />
        </div> */}
      </div>
    </>
  );
};

export default ProductDetails;
