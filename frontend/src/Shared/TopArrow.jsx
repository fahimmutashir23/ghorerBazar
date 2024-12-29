import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { animateScroll as scroll } from "react-scroll";

const TopArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: "easeInOutQuad",
    });
  };

  return (
    <div
      className={`w-8 flex justify-center rounded-tl-md rounded-bl-md fixed right-0 bg-color_1 text-white py-1  transition-all duration-500 z-50 ${
        isVisible ? "bottom-14" : "-bottom-24"
      } `}
    >
      <ul className="space-y-1 flex flex-col items-center">
        <button onClick={scrollToTop}>
          <IoIosArrowUp className="text-text_xl" />
        </button>
      </ul>
    </div>
  );
};

export default TopArrow;
