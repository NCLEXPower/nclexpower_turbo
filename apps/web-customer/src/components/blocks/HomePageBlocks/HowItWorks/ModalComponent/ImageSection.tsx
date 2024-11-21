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
  background: 'linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 100%)',
  zIndex: 1,
};

export const ImageSection: React.FC<ImageSectionProps> = ({
  image,
  altText,
}) => (
  <div className='w-full sm:w-1/2 h-1/2 sm:h-full relative order-1'>
    <div style={overlayStyle}></div>
    <Image
      src={image}
      alt={altText}
      loading='lazy'
      className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
    />
  </div>
);
