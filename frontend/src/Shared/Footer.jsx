import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import Logo from "./Logo";

const Footer = () => {
  const phoneNumber = '8801729798079'
  return (
    <div className="bg-color_2 py-4 md:py-10 px-2 lg:px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 lg:gap-10">
        <div className="lg:col-span-5 col-span-12">
          <h1 className="flex justify-center lg:justify-start text-color_1 font-bold">
            <Logo w={20} />
          </h1>
          <p className="text-justify mt-4">
            ঘুড়ি, যেখানে স্বাস্থ্য এবং স্থায়িত্বের প্রতিশ্রুতি আমরা যা কিছু করি
            তার কেন্দ্রবিন্দুতে। আমরা মানসম্পন্ন নিরাপদ পণ্যগুলির একটি
            বৈচিত্র্যময় পরিসীমা সরবরাহ করতে পেরে গর্বিত যা কেবল আপনার শরীরকেই
            পুষ্ট করে না বরং পৃথিবিকে একটি স্বাস্থ্যকর গ্রহে পরিণত করতে অবদান
            রাখে। ghuri.com এ, আমরা সুস্থতার পরিসিমা বৃদ্ধির জন্য বিশুদ্ধ,
            প্রাকৃতিক উপাদানগুলির শক্তিতে বিশ্বাস করি।
          </p>
        </div>
        <div className="lg:col-span-2 col-span-6">
          <ul className=" space-y-2">
            <li className="text-color_1 font-semibold mb-3">Information</li>
            <li className="">About Us</li>
            <li className="">Delivery Information</li>
            <li className="">Privacy policy</li>
            <li className="">Terms & Conditions</li>
            <li className="">Customer Service</li>
            <li className="">Return Policy</li>
          </ul>
        </div>
        <div className="lg:col-span-2 col-span-6">
          <ul className=" space-y-2">
            <li className="text-color_1 font-semibold mb-3">My Account</li>
            <li className="">My Order</li>
            <li className="">Help Center</li>
            <li className="">Condition</li>
            <li className="">Term Of Use</li>
          </ul>
        </div>
        <div className="lg:col-span-3 col-span-12">
          <ul className=" space-y-2">
            <li className="text-color_1 font-semibold mb-3">Contact Us</li>
            <li className="">
              <strong>Address:</strong> Ichapur, Kalihati, Tangail, Bangladesh
            </li>
            <li className="">
              <strong>Call to:</strong> +880 1729-798079
            </li>
            <li className="">
              <strong>Mail to:</strong> ghuribazarbd@gmail.com
            </li>
          </ul>
          <div className="flex gap-4 mt-4 items-center">
            <a href="https://www.facebook.com/ghuri.net" target="_blank"><FaFacebook className="text-3xl" /></a>
            <a href="https://wa.me/8801729798079" target="_blank"><FaWhatsapp className="text-3xl" /></a>
            <a href={`tel:${phoneNumber}`}><FaPhoneVolume className="text-3xl" /></a>
            <a href=""><FaYoutube className="text-4xl" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
