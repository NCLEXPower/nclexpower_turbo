/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { ImageCarousel } from "@/components/ImageCarousel/ImageCarousel";
import Image from "next/image";

export interface SliderConfig {
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  fade: boolean;
  speed: number;
  cssEase: string;
  arrows: boolean;
}

interface CarouselSectionProps {
  images: string[];
  sliderConfig: SliderConfig;
  type: "Study" | "Practice";
}

const backgroundGradients = {
  Study:
    "linear-gradient(269.64deg, #181818 0%, rgba(24, 24, 24, 0) 15%, rgba(24, 24, 24, 0) 100%)",
  Practice:
    "linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 20%, rgba(24, 24, 24, 0) 100%)",
};

export const CarouselSection: React.FC<CarouselSectionProps> = ({
  images,
  sliderConfig,
  type,
}) => (
  <div
    className="w-full sm:w-1/2 h-1/2 sm:h-full relative"
    style={{ order: type === "Study" ? 0 : 1 }}
  >
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: backgroundGradients[type],
        zIndex: 1,
      }}
    ></div>
    <ImageCarousel sliderConfig={sliderConfig}>
      {images.map((image, index) => (
        <Image
          key={`carousel-image-${index}`}
          src={image}
          alt={`Slide ${index + 1}`}
          className="w-full h-[33.33vh] sm:h-[50vh] md:h-[66vh] lg:h-[90vh] object-cover"
          loading="lazy"
        />
      ))}
    </ImageCarousel>
  </div>
);
