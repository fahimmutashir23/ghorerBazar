import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-slate-200 py-4 md:py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-5/12">
          <h1 className="text-4xl text-color_1 font-bold">
            <Logo w={20} />
          </h1>
          <p>
            ঘরেরবাজার , যেখানে স্বাস্থ্য এবং স্থায়িত্বের প্রতিশ্রুতি আমরা যা
            কিছু করি তার কেন্দ্রবিন্দুতে। আমরা মানসম্পন্ন নিরাপদ পণ্যগুলির একটি
            বৈচিত্র্যময় পরিসীমা সরবরাহ করতে পেরে গর্বিত যা কেবল আপনার শরীরকেই
            পুষ্ট করে না বরং পৃথিবিকে একটি স্বাস্থ্যকর গ্রহে পরিণত করতে অবদান
            রাখে। GhorerBazar.com এ, আমরা সুস্থতার পরিসিমা বৃদ্ধির জন্য বিশুদ্ধ,
            প্রাকৃতিক উপাদানগুলির শক্তিতে বিশ্বাস করি।
          </p>
        </div>
        <div className="w-2/12">
          <ul>
            <li className="text-color_1 font-semibold mb-3">Company</li>
            <li className="">About Us</li>
            <li className="">Return policy</li>
            <li className="">Refund policy</li>
          </ul>
        </div>
        <div className="w-2/12">
          <ul>
            <li className="text-color_1 font-semibold mb-3">Company</li>
            <li className="">About Us</li>
            <li className="">Return policy</li>
            <li className="">Refund policy</li>
          </ul>
        </div>
        <div className="w-3/12">
        <h1>DBID ID : 437361334</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
