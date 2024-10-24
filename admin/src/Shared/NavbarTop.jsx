import { FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import { IoIosMailOpen } from "react-icons/io";
import { BiPhoneCall } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const NavbarTop = () => {
    return (
        <div className="bg-bg_secondary py-2">
      <div className="flex flex-col lg:flex-row gap-gap_primary max-w-7xl mx-auto justify-between">
        <div className="flex justify-center items-center gap-gap_primary">
          <FaFacebookF className="text-text_secondary" />
          <FaYoutube className="text-text_secondary" />
          <TiSocialLinkedin className="text-text_secondary" />
          <FaPinterestP className="text-text_secondary" />
          {/* <p className="text-gray-700">ISO 9000 : 2024 Certified Company</p> */}
        </div>
        
        <div className="lg:flex-1 mx-16 lg:mx-0">
          <form className="">
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  id="location-search"
                  className="block py-1 px-2 w-full z-20  text-gray-900 bg-bg_primary border border-gray-300 border-r-0 focus:ring-blue-500 focus:outline-none focus:border-none shadow-sm"
                  placeholder="Search Product"
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 h-full py-2.5 px-4 flex items-center justify-center text-blue-500 bg-gray-200 shadow-sm"
                >
                  <IoMdSearch className="text-xl" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-center items-center gap-gap_primary">
          <p className="flex gap-gap_primary items-center mb-0">
            <BiPhoneCall className="text-text_secondary" />
            <span className="text-gray-700">+880 1811-678030</span>
          </p>
          <p className="flex gap-gap_primary items-center">
          <IoIosMailOpen className="text-text_secondary" />
            <span className="text-gray-700">support@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
    );
};

export default NavbarTop;