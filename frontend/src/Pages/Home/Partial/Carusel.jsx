import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import { url } from "../../../../connection";
import Autoplay from "embla-carousel-autoplay";

const Carusel = ({ images }) => {
  const imgUrl = `${url}/Upload/profile/images/`;

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
      className="w-full"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem className="h-[50vh] w-full" key={index}>
            <img
              className="w-full h-full object-cover"
              src={`${imgUrl}${image.banner}`}
              alt="Banner"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Carusel;
