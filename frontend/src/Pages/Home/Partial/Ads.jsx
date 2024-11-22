import { imgUrl } from "@/Utils/imageUrl";
import facebook from "../../../assets/socialMedia/facebook.png";
import instagram from "../../../assets/socialMedia/instagram.png";
import whatsapp from "../../../assets/socialMedia/whatsapp.png";
import youtube from "../../../assets/socialMedia/youtube.png";

const Ads = ({ banner }) => {
  const left = banner.find((item) => item.name === "3");
  const right = banner.find((item) => item.name === "4");
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-center">
      <div className="w-5/12 border">
        {left?.banner ? (
          <video
            src={`${imgUrl.banner}${left.banner[0]}`}
            controls
            autoPlay
            className="w-full h-full object-cover"
            alt=""
          />
        ) : (
          "Offer not available"
        )}
      </div>
      <div className="w-2/12 flex gap-2 lg:flex-col border">
        <div className="flex items-center justify-center gap-2 rounded-md max-w-fit mx-auto px-4 py-1 bg-color_2">
          <img src={facebook} className="w-7" alt="" />
          <h1 className="font-semibold text-2xl mt-0.5">Facebook</h1>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-md max-w-fit mx-auto px-4 py-1 bg-color_2">
          <img src={instagram} className="w-8" alt="" />
          <h1 className="font-semibold text-2xl mt-0.5">Instagram</h1>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-md max-w-fit mx-auto px-4 py-1 bg-color_2">
          <img src={youtube} className="w-8" alt="" />
          <h1 className="font-semibold text-2xl mt-0.5">You Tube</h1>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-md max-w-fit mx-auto px-4 py-1 bg-color_2">
          <img src={whatsapp} className="w-8" alt="" />
          <h1 className="font-semibold text-2xl mt-0.5">WhatsApp</h1>
        </div>
      </div>
      <div className="w-5/12 border">
        {right?.banner ? (
          <video
            src={`${imgUrl.banner}${right.banner[0]}`}
            controls
            autoPlay
            className="w-full h-full object-cover"
            alt=""
          />
        ) : (
          "Offer not available"
        )}
      </div>
    </div>
  );
};

export default Ads;
