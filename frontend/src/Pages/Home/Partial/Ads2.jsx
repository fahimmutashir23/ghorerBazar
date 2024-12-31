import { imgUrl } from "@/Utils/imageUrl";

const Ads2 = ({ banner }) => {
    const left = banner?.find((item) => item.name === "3");
    const right = banner?.find((item) => item.name === "4");

  return (
    <div className="flex lg:h-60 flex-col lg:flex-row gap-4">
      <div className="h-full lg:w-8/12 overflow-hidden">
        <img
          src={`${imgUrl.banner}${left?.banner[0]}`}
          className="h-full w-full object-cover hover:scale-105 duration-300"
          alt=""
        />
      </div>
      <div className="h-full lg:w-4/12 overflow-hidden">
        <img
          src={`${imgUrl.banner}${right?.banner[0]}`}
          className="h-full w-full object-cover hover:scale-105 duration-300"
          alt=""
        />
      </div>
    </div>
  );
};

export default Ads2;
