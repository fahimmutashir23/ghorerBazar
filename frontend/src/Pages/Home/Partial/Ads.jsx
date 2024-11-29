import { imgUrl } from "@/Utils/imageUrl";
import facebook from "../../../assets/socialMedia/facebook.png";
import instagram from "../../../assets/socialMedia/instagram.png";
import whatsapp from "../../../assets/socialMedia/whatsapp.png";
import youtube from "../../../assets/socialMedia/youtube.png";

const Ads = ({ banner }) => {
  const left = banner.find((item) => item.name === "3");
  const right = banner.find((item) => item.name === "4");

  const checkVideo = (src) => {
    const fileExtension = src.split(".").pop().toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg"];
    return videoExtensions.includes(fileExtension);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center h-[30vh]">
      <div className="lg:col-span-5 h-full flex items-center justify-center lg:text-xl font-semibold border-2 border-color_1 rounded-sm lg:rounded-md overflow-hidden">
        {left?.banner ? (
          checkVideo(left.banner[0]) ? (
            <video
              src={`${imgUrl.banner}${left.banner[0]}`}
              loop
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              alt=""
            />
          ) : (
            <img
              src={`${imgUrl.banner}${left.banner[0]}`}
              className="w-full h-full object-cover"
              alt=""
            />
          )
        ) : (
          "Offer not available"
        )}
      </div>

      <div className="hidden lg:col-span-2 h-full lg:flex gap-2 lg:flex-col lg:border border-color_1 py-2 rounded-sm lg:rounded-md w-full">
        <div className="flex flex-1 items-center justify-center gap-2 rounded-md mx-auto px-4 py-1 bg-color_2">
          <img src={facebook} className="w-3 lg:w-7" alt="" />
          <h1 className="hidden lg:block font-semibold lg:text-2xl mt-0.5">
            Facebook
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-md mx-auto px-4 py-1 bg-color_2">
          <img src={instagram} className="w-4 lg:w-8" alt="" />
          <h1 className="hidden lg:block font-semibold lg:text-2xl mt-0.5">
            Instagram
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-md mx-auto px-4 py-1 bg-color_2">
          <img src={youtube} className="w-4 lg:w-8" alt="" />
          <h1 className="hidden lg:block font-semibold lg:text-2xl mt-0.5">
            You Tube
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-md mx-auto px-4 py-1 bg-color_2">
          <img src={whatsapp} className="w-4 lg:w-8" alt="" />
          <h1 className="hidden lg:block font-semibold lg:text-2xl mt-0.5">
            WhatsApp
          </h1>
        </div>
      </div>

      <div className="lg:col-span-5 h-full flex items-center justify-center lg:text-xl font-semibold border-2 border-color_1 rounded-sm lg:rounded-md overflow-hidden">
        {right?.banner ? (
          checkVideo(right.banner[0]) ? (
            <video
              src={`${imgUrl.banner}${right.banner[0]}`}
              loop
              muted
              playsInline
              autoPlay
              className="w-full h-full object-cover"
              alt=""
            />
          ) : (
            <img
              src={`${imgUrl.banner}${right.banner[0]}`}
              className="w-full h-full object-cover"
              alt=""
            />
          )
        ) : (
          "Offer not available"
        )}
      </div>
    </div>
  );
};

export default Ads;
