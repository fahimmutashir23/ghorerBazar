import img from "../../../assets/about/images.jpeg";
import { Rating } from "primereact/rating";

const Card = () => {
  return (
    <div className="group">
      <div className="p-2 border-2 w-full h-56 overflow-hidden bg-white relative">
        <img src={img} className="w-full h-full object-contain" alt="" />
      </div>
      <div className="mt-3">
        <Rating value={4} readOnly cancel={false} />
        <h2 className="my-2 text-lg">Printed T-shirt</h2>
        <h1 className="font-bold text-xl text-color_2 -mt-2">500$</h1>
      </div>
    </div>
  );
};

export default Card;
