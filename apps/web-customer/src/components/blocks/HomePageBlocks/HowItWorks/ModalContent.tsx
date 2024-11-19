/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from 'react';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import Image from 'next/image';
import { EvaIcon, IconButton } from 'core-library/components';
import { Box } from '@mui/material';

interface ModalContentProps {
  type: string;
  content: any;
  sliderConfig: any;
  onClose: () => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  type,
  content,
  sliderConfig,
  onClose,
}) => {
  return (
    <div className='absolute top-0 left-0 sm:overflow-hidden overflow-y-scroll bg-[#181818] w-full h-full flex flex-col sm:flex-row'>
      {type !== 'WatchVideos' && (
        <div
          className='w-full sm:w-1/2 h-1/2 sm:h-full relative'
          style={{ order: type === 'Study' ? 0 : 1 }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              background:
                type === 'Study'
                  ? 'linear-gradient(269.64deg, #181818 0%, rgba(24, 24, 24, 0) 15%, rgba(24, 24, 24, 0) 100%)'
                  : 'linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 20%, rgba(24, 24, 24, 0) 100%)',
              zIndex: 1,
            }}
          />
          <ImageCarousel sliderConfig={sliderConfig}>
            {content.carouselImages.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`${type} Slide ${index + 1}`}
                className='w-full h-[33.33vh] sm:h-[50vh] md:h-[66vh] lg:h-[90vh] object-cover'
              />
            ))}
          </ImageCarousel>
        </div>
      )}
      <div className='w-full sm:w-1/2 h-[66.67vh] sm:h-full p-6 sm:p-8 flex flex-col justify-start'>
        <h1 className='text-[#60AEF0] text-lg sm:text-2xl md:text-3xl font-bold font-ptSans mb-3 sm:mb-6 md:mb-8'>
          {content.title}
        </h1>

        <p className='text-xs sm:text-sm md:text-base lg:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-6 mb-2 sm:mb-4 md:mb-6'>
          {content.paragraphOne}
        </p>

        <p className='text-xs sm:text-sm md:text-base lg:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-6 mt-2 sm:mt-4 md:mt-6'>
          {content.paragraphTwo}
        </p>
      </div>
      {type === 'WatchVideos' && (
        <div className='w-full sm:w-1/2 h-1/2 sm:h-full relative'>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              right: '0',
              background:
                'linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 100%)',
              zIndex: 1,
            }}
          ></div>
          <Image
            src={content.image}
            alt={`${type} Image`}
            className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
          />
        </div>
      )}
      <Box className='absolute right-5 top-5 cursor-pointer z-10'>
        <div
          className='bg-[#7E7E7E] rounded-full w-full h-full flex items-center justify-center'
          style={{
            width: 'clamp(24px, 5vw, 40px)',
            height: 'clamp(24px, 5vw, 40px)',
          }}
        >
          <IconButton onClick={onClose} className='w-[100%] h-[100%]'>
            <EvaIcon
              id='close-icon'
              name='close'
              fill='#4B4B4B'
              className='w-[100%] h-[100%]'
              ariaHidden
            />
          </IconButton>
        </div>
      </Box>
    </div>
  );
};
