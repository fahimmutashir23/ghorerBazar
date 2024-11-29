import { imgUrl } from "@/Utils/imageUrl";
import { useEffect, useState } from "react";

const Banner = ({ banner }) => {
  const offer = banner.find((item) => item.name === "2");
  const main = banner.find((item) => item.name === "1");
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const fileExtension = offer.banner[0].split(".").pop().toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg"];
    setIsVideo(videoExtensions.includes(fileExtension));
  }, [offer]);

  return (
    <div className="lg:h-[60vh] border-color_1 border-2 rounded-md overflow-hidden flex flex-col lg:flex-row mb-4">
      <div className="lg:w-3/12 lg:border-r-2 border-color_1 flex justify-center items-center font-semibold">
        {offer?.banner ? (
          isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              src={`${imgUrl.banner}${offer.banner[0]}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={`${imgUrl.banner}${offer.banner[0]}`}
              className="w-full h-40 lg:h-full object-cover"
            />
          )
        ) : (
          "Offer not available"
        )}
      </div>
      <div className="lg:w-9/12">
        {/* <Carusel images={banner} /> */}
        {main?.banner[0] ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={`${imgUrl.banner}${main.banner[0]}`} />
          </video>
        ) : (
          "video not available"
        )}
      </div>
    </div>
  );
};

export default Banner;
