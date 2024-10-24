import moment from "moment";
import { useEffect, useState } from "react";
import Loader2 from "../../../../Utils/Loader2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Logo from "../../../../Utils/Logo";
import { IoAddCircleOutline } from "react-icons/io5";
import AddProductModal from "./AddProductModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import AddStockModal from "./AddStockModal";

const CreateStock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stockIsOpen, setStockIsOpen] = useState(false);
  const date = moment().format("DD-MM-YYYY");
  const axiosSecure = useAxiosSecure();
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const [value, setValue] = useState("");
  const [brandId, setBrandId] = useState();
  const [productId, setProductId] = useState();
  const [brandData, setBrandData] = useState([]);
  const [stockProduct, setStockProduct] = useState([]);
  const [showProduct, setShowProduct] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["get-category-for-stock"],
    queryFn: async () => {
      const res = await axiosSecure("/api/get-stockCategory-list");
      return res.data.result;
    },
  });

  const fetchBrandData = async () => {
    const info = {
      category_id: value,
    };
    const res = await axiosSecure.post(`/api/get-brand-w-stock-list`, info);
    setBrandData(res.data.result);
  };

  const fetchProductData = async () => {
    const info = {
      category_id: value,
      brand_id: brandId,
    };
    const res = await axiosSecure.post(`/api/get-product-w-stock-list`, info);
    setStockProduct(res.data.result);
  };

  const fetchShowData = async () => {
    const res = await axiosSecure(`/api/get-product-show-list?id=${productId}`);
    setShowProduct(res.data.result);
  };

  useEffect(() => {
    if (value || productId || brandId) {
      fetchBrandData();
      fetchProductData();
      fetchShowData();
    }
  }, [value, productId, brandId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoader(false);

    const notes = e.target.notes.value;
    const makerName = e.target.makerName.value;

    const info = {
      makerName,
      quantity: products.length,
      totalAmount,
      date,
      notes,
      expenses: products,
    };

    try {
      const res = await axiosSecure.post("/api/save-expense", info);
      if (res.data.success) {
        console.log(res.data);
        toast.success(res.data.message);
        setLoader(false);
        setProducts([]);
        e.target.reset();
        setTotalAmount(0);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data);
    }
  };

  if (isLoading) return <Loader2 />;

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-2 lg:items-start">
      {loader && <Loader2 />}
      <div className="lg:w-8/12 border-2 border-gray-700 p-2 space-y-4">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex-1">
            <Logo h="24" />
          </div>
          <form className="flex-1 flex flex-col items-end">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Date</label>
              <input
                type="text"
                name="date"
                defaultValue={date}
                className="bg-white focus:ring-0 px-2 py-1 focus:border w-full focus:outline-none border border-black"
                placeholder="Type Here"
                disabled
              />
            </div>
          </form>
        </div>
        <hr />
        <div className="flex flex-col lg:flex-row lg:items-end gap-2">
          <div className="lg:w-3/12">
            <label className="font-semibold">Select Category</label>
            <Select onValueChange={(value) => setValue(value)}>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:w-3/12">
            <label className="font-semibold">Select Brand</label>
            <Select onValueChange={(value) => setBrandId(value)}>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select a Product" />
              </SelectTrigger>
              <SelectContent>
                {brandData.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:w-3/12">
            <label className="font-semibold">Select Product</label>
            <Select onValueChange={(value) => setProductId(value)}>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select a Product" />
              </SelectTrigger>
              <SelectContent>
                {stockProduct.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <h2 className="font-semibold mb-1">Or</h2>
          <button
            onClick={() => setIsOpen(true)}
            className=" bg-gray-700 lg:w-3/12 text-white px-2 py-1.5 font-bold duration-500 flex items-center justify-center gap-2"
          >
            <IoAddCircleOutline className="text-2xl font-bold" />
            <span className="mt-1">Add Product</span>
          </button>
        </div>
        <hr />
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0  w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
              <div></div>
              <div className="flex ">
                {showProduct?.name && (
                  <button
                    onClick={() => setStockIsOpen(true)}
                    className=" bg-gray-700 text-white px-3 py-1.5 font-bold duration-500 flex items-center gap-2"
                  >
                    <IoAddCircleOutline className="text-2xl font-bold" />
                    Add Stock
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table border border-blue-900">
              {/* head */}
              <thead className="">
                <tr className="uppercase text-center bg-gray-700 text-white font-bold ">
                  <th className="text-md border">Name</th>
                  <th className="text-md border w-2/12">Cat</th>
                  <th className="text-md border w-2/12">Unit Price</th>
                  <th className="text-md border w-2/12">Quantity</th>
                  <th className="text-md border w-2/12">T.S.A</th>
                </tr>
              </thead>
              {showProduct?.name && (
                <tbody className="text-center">
                  <tr>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {showProduct?.name}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {showProduct?.category_id?.name}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {showProduct?.unitPrice}/-
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {showProduct?.quantity}
                    </td>
                    <td
                      className={`px-6 pt-2 font-semibold text-lg whitespace-nowrap text-center border  text-black `}
                    >
                      {showProduct?.quantity * showProduct?.unitPrice}/-
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSave}
        className="lg:w-4/12 border-2 border-gray-700 p-2"
      >
        <div>
          <label className="font-semibold text-md">Notes*</label>
          <textarea
            name="notes"
            className="bg-white focus:ring-0 px-2 py-1 focus:border w-full focus:outline-none border border-black"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="font-semibold">Name*</label>
          <input
            type="text"
            name="makerName"
            className="bg-white focus:ring-0 px-2 py-1 w-full focus:border focus:outline-none border border-black"
            placeholder="Type Here"
            required
          />
        </div>
        <button type="submit" className="button_primary w-full mt-2">
          Save
        </button>
      </form>
      <AddProductModal
        setLoader={setLoader}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <AddStockModal
        isOpen={stockIsOpen}
        setIsOpen={setStockIsOpen}
        product={showProduct}
        fetchData={fetchProductData}
      />
    </div>
  );
};

export default CreateStock;
