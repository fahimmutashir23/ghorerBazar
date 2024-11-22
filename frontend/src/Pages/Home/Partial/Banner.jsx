import { imgUrl } from "@/Utils/imageUrl";

const Banner = ({ banner }) => {
  const offer = banner.find((item) => item.name === "2");
  const main = banner.find((item) => item.name === "1");

  return (
    <div className="h-[60vh] border-color_1 border-2 rounded-md overflow-hidden flex flex-col lg:flex-row mb-4">
      <div className="lg:w-3/12 lg:border-r-2 border-color_1">
        {offer?.banner ? <video
          src={`${imgUrl.banner}${offer.banner[0]}`}
          controls
          autoPlay
          className="w-full h-full object-cover"
          alt=""
        /> : "Offer not available"}
      </div>
      <div className="lg:w-9/12">
        {/* <Carusel images={banner} /> */}
        {main?.banner[0] ? (
          <video controls className="w-full h-full object-cover">
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
