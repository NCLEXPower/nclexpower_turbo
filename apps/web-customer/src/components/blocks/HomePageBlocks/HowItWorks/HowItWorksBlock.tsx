/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  PracticeTest,
  PracticeCarouselOne,
  PracticeCarouselThree,
  PracticeCarouselTwo,
  StudyCards,
  StudyCarouselOne,
  StudyCarouselThree,
  StudyCarouselTwo,
  WatchVideos,
  WatchVideosModal,
  CloseButton,
} from 'core-library/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { DialogBox } from 'core-library/components/Dialog/DialogBox';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';

interface Props {}

const sliderConfig = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 500,
  fade: true,
  speed: 700,
  cssEase: 'linear',
  arrows: false,
};

export const HowItWorksBlock: React.FC<Props> = (props) => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className='bg-softGrayBlue h-fit py-20 items-center justify-center flex'>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col gap-5 items-center px-10 text-center'>
          <p className='lg:text-4xl text-3xl font-bold '>
            <span className='text-darkBlue'>Step-by-step</span> till you pass!
          </p>
          <p className='font-bold'>
            Elevate your learning and critical thinking like never before!
          </p>
          <p>
            With the CORE-Zigma System, you will build your knowledge,
            confidence, and test-taking skills - step by step with our proven
            method!
          </p>
        </div>
        <div className='w-4/6 flex items-center justify-center py-10 flex-wrap gap-5 lg:gap-0 sm:w-[100%]'>
          <div
            className='w-auto min-w-[200px] flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer'
            onClick={() => handleOpenModal('WatchVideos')}
          >
            <Image src={WatchVideos} alt='WatchVideos' />
            <p>
              Step 1 :
              <span className='text-darkBlue font-bold'>By Watching</span>
            </p>
          </div>
          <div
            className='w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer'
            onClick={() => handleOpenModal('Study')}
          >
            <Image src={StudyCards} alt='StudyCards' />
            <p>
              Step 2 :
              <span className='text-darkBlue font-bold'>By Studying</span>
            </p>
          </div>
          <div
            className='w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer'
            onClick={() => handleOpenModal('Practice')}
          >
            <Image src={PracticeTest} alt='PracticeTest' />
            <p>
              Step 3 :<span className='text-darkBlue font-bold'>By Doing</span>
            </p>
          </div>
        </div>
        <DialogBox
          open={!!openModal}
          handleClose={handleCloseModal}
          hideCloseButton
          sx={{
            '& .MuiDialog-paper': {
              width: '90%',
              maxWidth: '1050px',
              height: 'auto',
              maxHeight: '90vh',
              overflowY: 'auto',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '1rem',
            },
          }}
        >
          {openModal === 'WatchVideos' && (
            <div className='absolute top-0 left-0 overflow-hidden bg-[#181818] w-full h-full flex flex-col sm:flex-row'>
              <Image
                src={CloseButton}
                alt='Close Button'
                className='absolute right-0 top-0 mr-5 mt-5 w-[30px] h-[30px] cursor-pointer z-10'
                onClick={handleCloseModal}
              />
              <div className='w-full sm:w-1/2 h-[66.67vh] sm:h-[20vh] p-6 sm:p-8  flex flex-col justify-start '>
                <h1 className='text-[#60AEF0] text-2xl sm:text-3xl font-bold font-ptSans mb-2.5'>
                  Watch Videos
                </h1>
                <p className='text-sm sm:text-base md:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-12'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p className='text-sm sm:text-base md:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-12'>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className='w-full sm:w-1/2 h-1/2 sm:h-full relative'>
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    background:
                      'linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 100%)',
                  }}
                ></div>
                <Image
                  src={WatchVideosModal}
                  alt='Watch Videos'
                  className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
                />
              </div>
            </div>
          )}
          {openModal === 'Study' && (
            <div className='absolute top-0 left-0 overflow-hidden bg-[#181818] w-full h-full flex flex-col sm:flex-row'>
              <div className='w-full sm:w-1/2  h-[33.33vh] sm:h-full relative'>
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    background:
                      'linear-gradient(269.64deg, #181818 0%, rgba(24, 24, 24, 0) 15%, rgba(24, 24, 24, 0) 100%)',
                    zIndex: '1',
                  }}
                ></div>
                <ImageCarousel sliderConfig={sliderConfig}>
                  <Image
                    src={StudyCarouselOne}
                    alt='Study Slide 1'
                    className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
                  />
                  <Image
                    src={StudyCarouselTwo}
                    alt='Study Slide 2'
                    className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
                  />
                  <Image
                    src={StudyCarouselThree}
                    alt='Study Slide 3'
                    className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
                  />
                </ImageCarousel>
              </div>
              <div className='w-full sm:w-1/2 h-[66.67vh] sm:h-[20vh] p-6 sm:p-8 flex flex-col justify-start'>
                <div>
                  <h1 className='text-[#60AEF0] text-2xl sm:text-[32px] font-bold font-ptSans sm:mb-5 md:mb-10 mb-5'>
                    Study Cards
                  </h1>
                  <p className='text-sm sm:text-base md:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-12'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p className='text-sm sm:text-base md:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-12'>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                <Image
                  src={CloseButton}
                  alt='Close Button'
                  className='absolute right-0 top-0 mr-5 mt-5 w-[30px] h-[30px] cursor-pointer z-10'
                  onClick={handleCloseModal}
                />
              </div>
            </div>
          )}
          {openModal === 'Practice' && (
            <div className='absolute top-0 left-0 overflow-hidden bg-[#181818] w-full h-full flex flex-col sm:flex-row'>
              <Image
                src={CloseButton}
                alt='Close Button'
                className='absolute right-0 top-0 mr-5 mt-5 w-[30px] h-[30px] cursor-pointer z-10'
                onClick={handleCloseModal}
              />
              <div className='w-full sm:w-1/2 h-[66.67vh]  sm:h-full p-6  sm:p-8 flex flex-col justify-start'>
                <h1 className='text-[#60AEF0] text-2xl sm:text-[32px] font-bold font-ptSans sm:mb-5 md:mb-10 mb-3'>
                  Practice Test
                </h1>
                <p className='text-sm sm:text-base md:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-12'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p className='text-sm sm:text-base md:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-12'>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className='w-full sm:w-1/2   h-[33.33vh] sm:h-full relative'>
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    background:
                      'linear-gradient(90deg, #181818 0%, rgba(24, 24, 24, 0) 20%, rgba(24, 24, 24, 0) 100%)',
                    zIndex: '1',
                  }}
                ></div>
                <ImageCarousel sliderConfig={sliderConfig}>
                  <Image
                    src={PracticeCarouselOne}
                    alt='Practice Slide 1'
                    className='w-full h-[33.33vh] md:h-[50vh] lg:h-[100vh] object-cover'
                  />
                  <Image
                    src={PracticeCarouselTwo}
                    alt='Practice Slide 2'
                    className='w-full h-full md:h-[50vh] lg:h-[100vh] object-cover'
                  />
                  <Image
                    src={PracticeCarouselThree}
                    alt='Practice Slide 3'
                    className='w-full h-full md:h-[50vh] lg:h-[100vh] object-cover'
                  />
                </ImageCarousel>
              </div>
            </div>
          )}
        </DialogBox>
        <div className='lg:flex w-5/6 justify-center pt-10 '>
          <div className='lg:w-2/5 lg:pl-16 text-center lg:text-left flex flex-col gap-5'>
            <p className='lg:text-4xl text-3xl font-bold'>
              Watch <span className='text-darkBlue'> How it Works</span>
            </p>
            <p className='font-ptSansNarroxw lg:text-lg text-md'>
              See for yourself how to use our system, and how much fun and
              different it is to learn and prepare for NCLEX!
            </p>
          </div>
          <div className=' h-64 lg:w-3/5 px-5 flex justify-center'>
            <div className='bg-darkBlue w-full mt-5 lg:w-3/4 h-full rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  );
};
