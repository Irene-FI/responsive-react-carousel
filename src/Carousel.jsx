import React, { useState, useEffect } from "react";
import { useSpringCarousel } from "react-spring-carousel";

const mockedItems = [1, 2, 3, 4, 5, 6];

const colors = ["red", "blue", "green", "yellow", "purple", "black"];

const CarouselItem = ({ index, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="p-6 w-full h-52 flex items-center justify-center rounded-lg border border-gray-200 shadow-md"
    >
      <p className="text-3xl font-bold text-white">{index}</p>
    </div>
  );
};

const Carousel = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      itemsPerSlide,
      withLoop: true,
      gutter: 10,
      items: mockedItems.map((i) => ({
        id: i,
        renderItem: <CarouselItem index={i} color={colors[i - 1]} />,
      })),
    });

  useEffect(() => {
    function handleOnChange(event) {
      if (event.matches) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    }
    const isTablet = window.matchMedia("(max-width: 768px)");

    if (isTablet.matches) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(4);
    }

    isTablet.addEventListener("change", handleOnChange);
    return () => {
      isTablet.removeEventListener("change", handleOnChange);
    };
  }, []);

  return (
    <div>
      <div className="my-2 max-w-lg mx-auto overflow-hidden p-2">
        {carouselFragment}
      </div>

      <div className="flex items-center justify-between max-w-[200px] mx-auto my-5">
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={slideToPrevItem}
        >
          Previous
        </button>
        <button
          type="button"
          class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={slideToNextItem}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
