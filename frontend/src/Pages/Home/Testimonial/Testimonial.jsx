import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import PageHeader from "@/Shared/PageHeader";
import { FaQuoteRight } from "react-icons/fa";

const Testimonial = () => {
  return (
    <div className="bg-gray-100 lg:px-5 py-14 lg:py-20">
      <PageHeader name={"Customer Review"} />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative mt-3"
      >
        <CarouselContent className="">
          <CarouselItem className="basis-1/1 lg:basis-1/3 w-full">
            <div className="bg-white p-3 border border-white hover:border-color_3 duration-300 group relative">
              <div>
                <FaQuoteRight className="text-5xl text-color_3" />
              </div>
              <p className="text-lg font-medium text-color_3/40 group-hover:text-color_3 duration-300 italic text-justify pb-5">
                The Saayan Group embodies professionalism and innovation across
                all their sectors. Their dedication to excellence, whether in
                trading, recruitment, or agriculture, is truly commendable. They
                are a trusted partner in growth.
              </p>
              <h2 className="font-semibold font_title text-color_2 text-right absolute bottom-0 right-0 px-4 py-1 bg-slate-100">
                Md Aminur Rashid
              </h2>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1 lg:basis-1/3 w-full">
            <div className="bg-white p-3 border border-white hover:border-color_3 duration-300 group relative">
              <div>
                <FaQuoteRight className="text-5xl text-color_3" />
              </div>
              <p className="text-lg font-medium text-color_3/40 group-hover:text-color_3 duration-300 italic text-justify pb-5">
                Saayan Group stands out as a company with a vision. Their
                integrated approach to business ensures that every service they
                provide is top-notch. They’ve earned their reputation as a
                dependable and forward-thinking organization.
              </p>
              <h2 className="font-semibold font_title text-color_2 text-right absolute bottom-0 right-0 px-4 py-1 bg-slate-100">
                Nur Alam Siddiq
              </h2>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1 lg:basis-1/3 w-full">
            <div className="bg-white p-3 border border-white hover:border-color_3 duration-300 group relative">
              <div>
                <FaQuoteRight className="text-5xl text-color_3" />
              </div>
              <p className="text-lg font-medium text-color_3/40 group-hover:text-color_3 duration-300 italic text-justify pb-5">
                have been impressed by Saayan Group’s commitment to excellence.
                Their ability to cater to diverse industries with such precision
                and quality is remarkable. They are truly a leader in their
                field.
              </p>
              <h2 className="font-semibold font_title text-color_2 text-right absolute bottom-0 right-0 px-4 py-1 bg-slate-100">
                Adbulla al Mamun
              </h2>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1 lg:basis-1/3 w-full">
            <div className="bg-white p-3 border border-white hover:border-color_3 duration-300 group relative">
              <div>
                <FaQuoteRight className="text-5xl text-color_3" />
              </div>
              <p className="text-lg font-medium text-color_3/40 group-hover:text-color_3 duration-300 italic text-justify pb-5">
                Saayan Group is a name synonymous with trust and excellence.
                From trade to consultancy and agriculture, their diverse
                ventures have consistently delivered quality and reliability.
                It's a pleasure working with a company that values customer
                satisfaction at its core.
              </p>
              <h2 className="font-semibold font_title text-color_2 text-right absolute bottom-0 right-0 px-4 py-1 bg-slate-100">
                Md Harun
              </h2>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/1 lg:basis-1/3 w-full">
            <div className="bg-white p-3 border border-white hover:border-color_3 duration-300 group relative">
              <div>
                <FaQuoteRight className="text-5xl text-color_3" />
              </div>
              <p className="text-lg font-medium text-color_3/40 group-hover:text-color_3 duration-300 italic text-justify pb-5">
                Saayan Group is more than just a business—it’s a brand you can
                trust. Whether it's their trading services, manpower
                consultancy, or agricultural projects, their dedication to
                quality and customer satisfaction shines through.
              </p>
              <h2 className="font-semibold font_title text-color_2 text-right absolute bottom-0 right-0 px-4 py-1 bg-slate-100">
                Rakibul Islam
              </h2>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-[365px] lg:left-1/2 lg:top-2/1 lg:-translate-y-14" />
        <CarouselNext className="absolute right-0 top-[365px] lg:right-1/2 lg:top-2/1 lg:-translate-y-14" />
      </Carousel>
    </div>
  );
};

export default Testimonial;
