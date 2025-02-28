/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import Image from 'next/image';
import { CSSProperties } from 'react';

interface ImageSectionProps {
  image: string;
  altText: string;
}

const overlayStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  background: 'linear-gradient(90.15deg, #181818  4.55%, rgba(24, 24, 24, 0) 99.87%)',
  zIndex: 1,
};

export const ImageSection: React.FC<ImageSectionProps> = ({
  image,
  altText,
}) => (
  <div className='w-full md:w-[clamp(1px,31.25vw,1200px)] h-full md:h-[clamp(1px,28.594vw,1198px)] relative order-0 md:order-1'>
    <div style={overlayStyle}></div>
    <Image
      src={image}
      alt={altText}
      loading='lazy'
      className='w-full h-full  object-cover'
    />
  </div>
);
