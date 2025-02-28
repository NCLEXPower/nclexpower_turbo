/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { useResolution } from 'core-library/hooks';
import Image from 'next/image';

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
  type: 'Study' | 'Practice';
}


const backgroundGradients = {
  Study:
    'linear-gradient(269.64deg, #181818 0%, rgba(24, 24, 24, 0) 15%, rgba(24, 24, 24, 0) 100%)',
  Practice:
    'linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 20%, rgba(24, 24, 24, 0) 100%)',
};

export const CarouselSection: React.FC<CarouselSectionProps> = ({ images, sliderConfig, type }) => {
  const { isMobile } = useResolution();

  return (
    <div
      className="w-full md:w-[clamp(1px,28.907vw,1100px)] h-full relative z-0"
      style={{ order: isMobile ? (type === 'Study' ? 1 : 0) : (type === 'Study' ? 0 : 1) }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
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
            className='w-full h-full md:h-[clamp(1px,28.594vw,1198px)] object-cover'
            loading='lazy'
          />
        ))}
      </ImageCarousel>
    </div>
  );
};
