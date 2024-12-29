import img from "../../../../assets/about/images.jpeg";

const Card = () => {
  return (
    <div className="space-y-4 border p-4 hover:border-black rounded-md duration-300 hover:shadow-md group">
      <div className="h-52 w-full overflow-hidden flex items-center justify-center bg-gray-200">
        {/* <img src={img} className="h-full w-full object-contain group-hover:scale-105 duration-300" alt="" /> */}
        <h1 className="uppercase text-3xl font-medium">Banner</h1>
      </div>
      <h1 className="text-xl lg:text-2xl font-semibold">
        অন্যতম সুপার ফুড মেথির সাতকাহন
      </h1>
      <p className="text-gray-700 text-justify">
        মেথি আমাদের দেশে অনেক পরিচিত একটি নাম। এটি স্বাদে তিতা হলেও আমাদের
        শরীরের অনেক উপকারে আসে। প্রাচীনকাল থেকেই ভেষজ চিকিৎসক ও আয়ুর্বেদ
        শাস্ত্রে মেথির ব্যবহার বহুল পরিচিত। নানা রোগ-বালাই থেকে মুক্তি লাভে মেথি
        অনেক কার্যকর। এটি একই সাথে মসলা, খাদ্য ও পথ্য হিসেবে ব্যবহার করা যায়।
        এছাড়া রূপচর্চায়ও মেথির নানা ব্যবহার লক্ষ্য করা যায়। মেথির এসকল বহুবিধ
        ব্যবহার একে অন্যতম সুপার ফুড হিসেবে খ্যাতি অর্জন করতে ব্যাপক সহায়তা
        করেছে। চলুন জেনে নেয়া যাক আমাদের দৈনন্দিন জীবনে এই অন্যতম সুপার ফুডের
        ভূমিকা সম্পর্কে। মেথির পুষ্টি উপাদান মেথিতে কার্বোহাইড্রেট, প্রোটিন,
        ফ্যাট, আয়রন, ম্যাঙ্গানিজ, কপার, ম্যাগনেশিয়াম আছে। এ ছাড়া এতে অল্প
        পরিমাণে কোলিন
      </p>
    </div>
  );
};

export default Card;
