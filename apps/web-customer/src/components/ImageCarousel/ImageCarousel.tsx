import { SliderConfigType } from "core-library/types/global";
import React, { useRef, useState } from "react";
import Slider from "react-slick";

type ImageCarouselProps = SliderConfigType & {
  showDots?: boolean;
};

export const ImageCarousel: React.FC<
  React.PropsWithChildren<ImageCarouselProps>
> = ({ sliderConfig, children, showDots = false }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = React.Children.count(children);
  const sliderRef = useRef<Slider>(null);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  const handleDotClick = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="relative">
      <Slider
        ref={sliderRef}
        {...sliderConfig}
        afterChange={handleSlideChange}
        className="h-full object-none"
      >
        {children}
      </Slider>

      {showDots && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-4 w-4 rounded-full transition-all duration-300 hover:bg-[#fff] ${
                activeSlide === index ? "bg-[#F4C501]" : "bg-[#fff]/20"
              }`}
              onMouseDown={(e) => e.preventDefault()}
            />
          ))}
        </div>
      )}
    </div>
  );
};
