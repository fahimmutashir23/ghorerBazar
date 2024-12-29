import PageHeader from "@/Shared/PageHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import Card from "../NewProducts/Card";

const SalesProducts = () => {
  return (
    <div className="w-full">
      <div>
      <PageHeader name={'Best Seller'} />
      </div>
      <div className="mt-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative "
        >
          <CarouselContent className="flex gap-4 w-full">
            <CarouselItem className="basis-1/2 lg:basis-1/2">
              <Card />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/2">
              <Card />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/2">
              <Card />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute -top-8 left-[0px] lg:left-[600px]" />
          <CarouselNext className="absolute -top-8 right-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default SalesProducts;
