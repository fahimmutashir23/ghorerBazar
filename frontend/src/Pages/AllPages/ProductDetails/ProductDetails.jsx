import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
import Loader2 from "@/Utils/Loader2";
import ImageZoom from "./Partial/ImageZoom/ImageZoom";
import DetailsTab from "./Partial/DetailsTab";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetCart from "@/Hooks/useGetCart";
import useTotalCart from "@/Hooks/useTotalCart";
import { BasicContext } from "@/ContextAPIs/BasicProvider";
import useDeliveryCharge from "@/Hooks/useDeliveryCharge";
import { imgUrl } from "@/Utils/imageUrl";
import RelatedProduct from "./Partial/RelatedProduct";
import { Rating } from "primereact/rating";
import PageHeader from "@/Shared/PageHeader";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState({ count: "", countPrice: 0 });
  const axiosPublic = useAxiosPublic();
  const [, , cartFetch] = useGetCart();
  const [, , totalCartFetch] = useTotalCart();
  const { setCartBar } = useContext(BasicContext);
  const [delivery] = useDeliveryCharge();
  const [mainImg, setMainImg] = useState();
  const [fetchProduct, setFetchProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: singleProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product_single"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-product-details/${id}`);
      setMainImg(res.data.result.images[0]);
      return res.data.result;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [fetchProduct]);

  const handleAddToCart = async (data) => {
    const info = {
      productId: data._id,
      name: data.name,
      images: data.images[0],
      price: weight.countPrice,
      quantity,
      weight: weight.count,
    };

    try {
      const res = await axiosPublic.post(`/api/save-cart`, info, {
        withCredentials: true,
      });
      if (res.data.status_code === 401) {
        return toast.error(res.data.message);
      }
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
      <div className="max-w-7xl mx-auto px-1">
        <div className="flex flex-col lg:flex-row items-start min-h-full gap-6">
          <div className="items-center w-full lg:w-[40%]">
            <div className="border-2 rounded-md hover:border-color_1  w-full h-64 lg:h-[400px] overflow-hidden">
              <ImageZoom image={`${imgUrl.product}${mainImg}`} />
            </div>

            <div className="flex items-center justify-center m-3 gap-3 flex-row">
              {singleProduct.images.map((img, idx) => (
                <button
                  onClick={() => setMainImg(img)}
                  key={idx}
                  className={`h-20 w-20 border-2 rounded-md overflow-hidden ${
                    img === mainImg && "border-gray-700"
                  }`}
                >
                  <img
                    className="h-full w-full object-contain"
                    src={`${imgUrl.product}${img}`}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start flex-col w-full lg:w-[60%]">
            <div className="w-full">
              {/* <p className=''>{singleProduct?.singleProductData?.category_data?.category_name}</p> */}
              <p className="font-bold text-2xl text-color_1">
                {singleProduct?.name}
              </p>
              <div className="flex items-center gap-2">
                <Rating value={singleProduct.review} readOnly cancel={false} />
                <p className="text-sm">O customer reviews</p>
              </div>
              <div>
                <hr className="my-3" />
                <div className="w-full mb-3">
                  <h2 className="text-lg font-medium">Delivery Charge:</h2>
                  <div className="font-medium">
                    {delivery.map((charge, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span id={idx}>{charge.name}-</span>
                        <span id={idx}>{charge.amount}৳</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="my-3" />
              <h2 className="text-lg font-semibold">Product Price:</h2>
              <div className="mt-1 flex flex-col lg:flex-row lg:justify-between">
                <span className="font-medium text-lg">
                  Select Unit*
                  <div className="font-bold text-red-800 grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {singleProduct?.price?.map((item, idx) => (
                      <button
                        onClick={() => setWeight(item)}
                        className={`border border-color_1 px-2 ${
                          item.count === weight?.count
                            ? "bg-color_1 text-white"
                            : ""
                        }`}
                        key={idx}
                      >
                        {item.count} = {item.countPrice}৳
                      </button>
                    ))}
                  </div>
                </span>
                <span className="font-medium text-lg mt-2 lg:mt-0">
                  Total Price:{" "}
                  <span className="font-bold text-red-800">
                    {weight?.countPrice * quantity}
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
                {/* <button
                  //   onClick={handleBuyNow}
                  className="button_primary flex items-center gap-2 w-full justify-center"
                >
                  <span className="font-bold">
                    <MdShoppingCart />{" "}
                  </span>{" "}
                  Buy Now
                </button> */}
                <button
                  disabled={weight?.countPrice <= 0}
                  className={`bg-color_1 py-1 rounded-md lg:py-1 lg:hover:bg-color_3 lg:duration-300 text-white flex items-center gap-2 w-full justify-center ${
                    weight?.countPrice <= 0 &&
                    "opacity-20 lg:opacity-100 lg:cursor-not-allowed"
                  }`}
                  onClick={() => handleAddToCart(singleProduct)}
                >
                  <FaCartPlus />
                  Add to Cart
                </button>
              </div>
              <div className="flex items-center justify-between w-full border-y py-p_8px text-text_standard font-semibold">
                <p className="text-text_standard font-semibold">
                  <span className="hover:underline">
                    Category: {singleProduct.category?.name || "..."}
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
        <DetailsTab
          reviews={singleProduct.reviews}
          singleProduct={singleProduct}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <PageHeader name={"Related Products"} />
        <RelatedProduct
          id={singleProduct.category._id}
          setFetchProduct={setFetchProduct}
        />
      </div>
    </>
  );
};

export default ProductDetails;
