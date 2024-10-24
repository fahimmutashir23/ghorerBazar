import moment from "moment";
import { useEffect, useState } from "react";
import Loader2 from "../../../../Utils/Loader2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Logo from "../../../../Utils/Logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CreateSales = () => {
  const date = moment().format("DD-MM-YYYY");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  //   form start
  const [discount, setDiscount] = useState(0);
  const [pQuantity, setQuantity] = useState([]);
  const [clientName, setClientName] = useState(null);
  const [clientPhone, setClientPhone] = useState(null);
  const [clientAdd, setClientAdd] = useState(null);
  //   form end
  const [loader, setLoader] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const [value, setValue] = useState("");
  const [stockProduct, setStockProduct] = useState([]);
  const [productId, setProductId] = useState();
  const [showProduct, setShowProduct] = useState([]);
  const [finalProduct, setFinalProduct] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["get-category-for-stock"],
    queryFn: async () => {
      const res = await axiosSecure("/api/get-stockCategory-list");
      return res.data.result;
    },
  });

  const fetchData = async () => {
    const res = await axiosSecure(`/api/get-category-w-stock-list?id=${value}`);
    setStockProduct(res.data.result);
  };

  const fetchProductData = async () => {
    const res = await axiosSecure(
      `/api/get-product-w-stock-list?id=${productId}`
    );
    setShowProduct([...showProduct, res.data.result]);
  };

  useEffect(() => {
    if (value || productId) {
      fetchData();
      fetchProductData();
    }
  }, [value, productId]);

  const handleMakeData = (quantity, data) => {
    const { name, brand, model, unitPrice, _id } = data;
    const product = {
    product_id: _id,
      productName: name,
      brand,
      model,
      unitPrice,
      quantity: parseInt(quantity),
    };
    setFinalProduct([...finalProduct, product]);

    const isExisting = pQuantity.length > 0 && pQuantity.find(item => item._id === data._id)
    if(!isExisting) {
        setQuantity([...pQuantity, {_id: data._id, total: parseInt(quantity) * data.unitPrice}])
    } else{
        const target = pQuantity.find(item => item._id === data._id)
        target.total = parseInt(quantity) * data.unitPrice
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!clientName){
        return setIsRequired({clientName: true});
    } else if(!clientPhone){
        return setIsRequired({clientPhone: true});
    } else if(clientPhone.length !== 11) {
        console.log(clientPhone.length);
        return toast.error("phone number must be 11 digit")
    } else if (pQuantity.reduce((a, b) => a + b.total ,0) - discount <= 0){
        return toast.error('No product add')
    }
    setIsRequired(false);
    setLoader(true);

    const notes = e.target.notes.value;
    const makerName = e.target.makerName.value;

    const info = {
      products: finalProduct,
      date,
      clientName,
      clientPhone,
      clientAdd,
      makerName,
      totalAmount: pQuantity.reduce((a, b) => a + b.total ,0) - discount,
      discountAmount: discount,
      details: notes
    };

    try {
      const res = await axiosSecure.post("/api/create-sale", info);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/invoice', {state: res.data.result._id})
        setLoader(false);
        e.target.reset();
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
      <div className="lg:w-9/12 border-2 border-gray-700 p-2 space-y-4">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex-1">
            <Logo h="24" />
          </div>
          <form className="flex-1 flex flex-col items-end">
            <div className="flex items-center gap-2 w-full">
              <label className="font-semibold w-3/12">Date</label>
              <input
                type="text"
                name="date"
                defaultValue={date}
                className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                placeholder="Type Here"
                disabled
              />
            </div>
            <div className="flex items-center gap-2 mt-2 w-full">
              <label className="font-semibold w-3/12">Client Name*</label>
              <input
                type="text"
                name="clientName"
                onChange={(e) => setClientName(e.target.value)}
                className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                placeholder="Type Here"
                required={isRequired}
              />
            </div>
            {isRequired.clientName && (
              <p className="text-red-400 text-xs">This field is required</p>
            )}
            <div className="flex items-center gap-2 mt-2 w-full">
              <label className="font-semibold w-3/12">Client Phone*</label>
              <input
                type="number"
                name="clientPhone"
                onChange={(e) => setClientPhone(e.target.value)}
                className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                placeholder="Type Here"
                required={isRequired}
              />
            </div>
            {isRequired.clientPhone && (
              <p className="text-red-400 text-xs">This field is required</p>
            )}
            <div className="flex items-center gap-2 mt-2 w-full">
              <label className="font-semibold w-3/12">Client Address</label>
              <input
                type="text"
                name="clientAdd"
                onChange={(e) => setClientAdd(e.target.value)}
                className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                placeholder="Type Here"
              />
            </div>
          </form>
        </div>
        <hr />
        <div className="flex flex-col lg:flex-row lg:items-end gap-2">
          <div className="w-full">
            <label className="font-semibold">Select Category</label>
            <Select onValueChange={(value) => setValue(value)}>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select Category" />
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
          <div className="w-full">
            <label className="font-semibold">Select Product</label>
            <Select onValueChange={(value) => setProductId(value)}>
              <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                <SelectValue placeholder="Select a timezone" />
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
        </div>
        <hr />
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-blue-900">
              {/* head */}
              <thead className="">
                <tr className="uppercase text-center bg-gray-700 text-white font-bold ">
                  <th className="text-md py-2 border">Name</th>
                  <th className="text-md border w-2/12">Brand</th>
                  <th className="text-md border w-2/12">Model</th>
                  <th className="text-md border w-2/12">Unit Price</th>
                  <th className="text-md border w-1/12">Quantity</th>
                  <th className="text-md border w-2/12">Add Quantity</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {showProduct?.map((item) => (
                  <tr key={item._id}>
                    <td className={` text-black `}>
                      <div className="w-full">
                        <input
                          type="text"
                          name="totalAmount"
                          defaultValue={item.name}
                          className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black w-full"
                          placeholder="Type Here"
                          disabled
                        />
                      </div>
                    </td>
                    <td className={`  text-black `}>
                      <input
                        type="text"
                        name="totalAmount"
                        defaultValue={item?.brand}
                        className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black w-full"
                        placeholder="Type Here"
                        disabled
                      />
                    </td>
                    <td className={`  text-black `}>
                      <input
                        type="text"
                        name="totalAmount"
                        defaultValue={item?.model}
                        className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black w-full"
                        placeholder="Type Here"
                        disabled
                      />
                    </td>
                    <td className={`  text-black `}>
                      <input
                        type="number"
                        name="unitPrice"
                        defaultValue={item.unitPrice}
                        className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black w-full"
                        placeholder="Type Here"
                        disabled
                      />
                    </td>
                    <td className={`  text-black `}>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={item.quantity}
                        className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black w-full"
                        placeholder="Type Here"
                        disabled
                      />
                    </td>
                    <td className={`  text-black `}>
                      {item.quantity > 0 ? <input
                        type="number"
                        name="quantity"
                        onChange={(e) => handleMakeData(e.target.value, item)}
                        className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black w-full"
                        placeholder="Type Here"
                      />: 'not enough QTY'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 space-y-2 flex flex-col items-end">
            <div className="flex-1 flex flex-col items-end">
              <div className="flex items-center gap-2">
                <label className="font-semibold">Discount:</label>
                <input
                  type="number"
                  name="discount"
                  onChange={e => setDiscount(e.target.value)}
                  className="bg-white focus:ring-0 py-1 px-2 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="font-semibold">Total Amount: </label>
                <input
                  type="text"
                  name="totalAmount"
                  value={
                    pQuantity.reduce((a, b) => a + b.total ,0) - discount || 0
                  }
                  className="bg-white focus:ring-0 px-2 py-1 flex-1 focus:border focus:outline-none border border-black"
                  placeholder="Type Here"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSave}
        className="lg:w-3/12 border-2 border-gray-700 p-2"
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
          Create Receipt
        </button>
      </form>
    </div>
  );
};

export default CreateSales;
