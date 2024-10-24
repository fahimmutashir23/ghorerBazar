import { FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import { BiPhoneCall } from "react-icons/bi";
import { IoIosMailOpen } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-bg_secondary pt-pt_secondary  px-2 lg:px-0">
      <div className="max-w-7xl mx-auto py-pl_secondary">
        <h1 className="text-text_xxl font-semibold uppercase text-center text-text_secondary">
          our locations
        </h1>
        <div className="p-pl_primary border rounded-lg text-center">
          <h1 className="text-text_secondary font-semibold">Main Shop:</h1>
          <p className="text-gray-700">
          Shop No 54, Level #4, Eastern Plus Shopping Complex, 145,<br /> Shantinagar Rd, Dhaka-1217
          </p>
          <p className="text-gray-700">+880 1811-678030</p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gap_primary  mt-mt_medium">
          <div className="p-pl_primary border rounded-lg text-left">
            <h1 className="text-text_secondary font-semibold">Head Office:</h1>
            <p className="text-gray-700">
              House-B/108, Road-08, Mohakhali DOSH, Mohakhali, Dhaka-1206
            </p>
            <p className="text-gray-700">+880 1581868984</p>
          </div>
          <div className="p-pl_primary border rounded-lg text-left">
            <h1 className="text-text_secondary font-semibold">Head Office:</h1>
            <p className="text-gray-700">
              House-B/108, Road-08, Mohakhali DOSH, Mohakhali, Dhaka-1206
            </p>
            <p className="text-gray-700">+880 1581868984</p>
          </div>
          <div className="p-pl_primary border rounded-lg text-left">
            <h1 className="text-text_secondary font-semibold">Head Office:</h1>
            <p className="text-gray-700">
              House-B/108, Road-08, Mohakhali DOSH, Mohakhali, Dhaka-1206
            </p>
            <p className="text-gray-700">+880 1581868984</p>
          </div>
          <div className="p-pl_primary border rounded-lg text-left">
            <h1 className="text-text_secondary font-semibold">Head Office:</h1>
            <p className="text-gray-700">
              House-B/108, Road-08, Mohakhali DOSH, Mohakhali, Dhaka-1206
            </p>
            <p className="text-gray-700">+880 1581868984</p>
          </div>
          <div className="p-pl_primary border rounded-lg text-left">
            <h1 className="text-text_secondary font-semibold">Head Office:</h1>
            <p className="text-gray-700">
              House-B/108, Road-08, Mohakhali DOSH, Mohakhali, Dhaka-1206
            </p>
            <p className="text-gray-700">+880 1581868984</p>
          </div>
          <div className="p-pl_primary border rounded-lg text-left">
            <h1 className="text-text_secondary font-semibold">Head Office:</h1>
            <p className="text-gray-700">
              House-B/108, Road-08, Mohakhali DOSH, Mohakhali, Dhaka-1206
            </p>
            <p className="text-gray-700">+880 1581868984</p>
          </div>
        </div> */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between mt-mt_medium gap-10">
          <div className="lg:flex-1 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.0585749985815!2d90.41428550669539!3d23.739022862193085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b96cd31a96fd%3A0x4879bce4aced23af!2sTech%20HUB!5e0!3m2!1sen!2sbd!4v1719859886726!5m2!1sen!2sbd"
              height="250"
              allowfullscreen=""
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
          <div className="lg:w-2/5">
            <div className="flex gap-gap_primary">
              <div className="bg-text_secondary h-10 w-10 rounded-full flex justify-center items-center">
                {" "}
                <FaFacebookF className="text-white text-text_lg" />
              </div>
              <div className="bg-text_secondary h-10 w-10 rounded-full flex justify-center items-center">
                {" "}
                <FaPinterestP className="text-white text-text_lg" />
              </div>
              <div className="bg-text_secondary h-10 w-10 rounded-full flex justify-center items-center">
                {" "}
                <FaYoutube className="text-white text-text_lg" />
              </div>
              <div className="bg-text_secondary h-10 w-10 rounded-full flex justify-center items-center">
                {" "}
                <TiSocialLinkedin className="text-white text-text_lg" />
              </div>
            </div>
            <div className="flex items-center mt-mt_primary gap-gap_primary">
              <div className="bg-text_secondary h-10 w-10 rounded-full flex justify-center items-center">
                {" "}
                <IoIosMailOpen className="text-white text-text_lg" />
              </div>
              <div>
                <h1 className="text-text_lg mb-0 font-semibold text-text_secondary">
                  Email Address
                </h1>
                <h1 className="text-text_md mt-0 text-gray-700">
                  support@gmail.com
                </h1>
              </div>
            </div>
            <div className="flex items-center mt-mt_primary gap-gap_primary">
              <div className="bg-text_secondary h-10 w-10 rounded-full flex justify-center items-center">
                {" "}
                <BiPhoneCall className="text-white text-text_lg" />
              </div>
              <div>
                <h1 className="text-text_lg mb-0 font-semibold text-text_secondary">
                  Phone Number
                </h1>
                <h1 className="text-text_md mt-0 text-gray-700">
                +880 1811-678030
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
