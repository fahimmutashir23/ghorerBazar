import useAxiosPublic from "@/Hooks/useAxiosPublic";
import contact from "../../assets/about/contact_icon.png";
import PageHeader from "@/Shared/PageHeader";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const axiosPublic = useAxiosPublic();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;
    const info = {name, phone, message}
    
    const res = await axiosPublic.post('/api/save-contact', info);
    if(res.data.status_code === 200){
        e.target.reset();
        setLoader(false);
        toast.success(res.data.message);
    }
  };

  return (
    <div>
      <PageHeader name={"Contact Us"} />
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="lg:flex-1 flex justify-center">
          <img src={contact} className="w-2/3" alt="" />
        </div>
        <div className="lg:flex-1 mx-6 lg:mx-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <div className="col-span-12">
                <label className="font-semibold">
                  Name
                  <span className="text-red-400 ml-1">(required)</span>{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-white py-1 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                  required
                />
              </div>
              <div className="col-span-12">
                <label className="font-semibold">
                  Phone
                  <span className="text-red-400 ml-1">(required)</span>{" "}
                </label>
                <input
                  type="text"
                  name="phone"
                  className="bg-white py-1 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                  required
                />
              </div>
              <div className="col-span-12">
                <label className="font-semibold">
                  Message
                  <span className="text-red-400 ml-1">(required)</span>{" "}
                </label>
                <textarea
                  className="bg-white focus:ring-0 px-4 py-2 focus:border w-full focus:outline-none border border-black"
                  name="message"
                  required
                  rows="4"
                  placeholder="Write your message"
                ></textarea>
              </div>
            </div>
            <div className="mt-2">
              <button
                disabled={loader}
                type="submit"
                className="button_primary w-full"
              >
                {loader ? "loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
