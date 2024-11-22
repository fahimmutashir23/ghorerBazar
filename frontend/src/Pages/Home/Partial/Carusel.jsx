import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { imgUrl } from "@/Utils/imageUrl";

const Carusel = ({ images }) => {

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full rounded-md overflow-hidden"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem className="h-[70vh] w-full" key={index}>
            <img
              className="w-full h-full object-cover"
              src={`${imgUrl.profile}${image.banner}`}
              alt="Banner"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Carusel;
