import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-color_2 py-4 md:py-10 px-2 lg:px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 lg:gap-10">
        <div className="lg:col-span-5 col-span-12">
          <h1 className="flex justify-center lg:justify-start text-color_1 font-bold">
            <Logo w={20} />
          </h1>
          <p className="text-justify">
            ঘুড়ি, যেখানে স্বাস্থ্য এবং স্থায়িত্বের প্রতিশ্রুতি আমরা যা
            কিছু করি তার কেন্দ্রবিন্দুতে। আমরা মানসম্পন্ন নিরাপদ পণ্যগুলির একটি
            বৈচিত্র্যময় পরিসীমা সরবরাহ করতে পেরে গর্বিত যা কেবল আপনার শরীরকেই
            পুষ্ট করে না বরং পৃথিবিকে একটি স্বাস্থ্যকর গ্রহে পরিণত করতে অবদান
            রাখে। ghuri.com এ, আমরা সুস্থতার পরিসিমা বৃদ্ধির জন্য বিশুদ্ধ,
            প্রাকৃতিক উপাদানগুলির শক্তিতে বিশ্বাস করি।
          </p>
        </div>
        <div className="lg:col-span-2 col-span-6">
          <ul>
            <li className="text-color_1 font-semibold mb-3">Company</li>
            <li className="">About Us</li>
            <li className="">Return policy</li>
            <li className="">Refund policy</li>
          </ul>
        </div>
        <div className="lg:col-span-2 col-span-6">
          <ul>
            <li className="text-color_1 font-semibold mb-3">Company</li>
            <li className="">About Us</li>
            <li className="">Return policy</li>
            <li className="">Refund policy</li>
          </ul>
        </div>
        <div className="lg:col-span-3 col-span-12">
        <h1>DBID ID : 437361334</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
