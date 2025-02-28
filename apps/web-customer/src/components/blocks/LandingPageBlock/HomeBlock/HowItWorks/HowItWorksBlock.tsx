/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { PracticeTest, StudyCards, WatchVideos } from 'core-library/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { DialogBox } from 'core-library/components';
import { ModalContent } from './ModalComponent/ModalContent';
import { modalContent, sliderConfig } from './ModalComponent/modalData';
import { Margin } from '@mui/icons-material';

interface Props { }

type ModalType = 'WatchVideos' | 'Study' | 'Practice';

const dialogStyles = {
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: {
      xs: '100%',
      md: 'clamp(1px,54.688vw,2100px)',
    },
    height: 'auto',
    maxHeight: {
      xs: '100%',
      md: 'clamp(1px,28.594vw,1198px)',
    },
    overflowY: 'auto',
    color: '#FFFFFF',
    borderRadius: '6px',
  },
};


export const HowItWorksBlock: React.FC<Props> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState<{
    modalType: ModalType;
    isOpen: boolean;
  }>({
    modalType: 'WatchVideos',
    isOpen: false,
  });

  const openModal = (modalType: ModalType) => {
    setIsOpenModal({ modalType, isOpen: true });
  };

  const closeModal = () => {
    setIsOpenModal((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <div className='bg-softGrayBlue h-fit py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)] items-center justify-center flex'>
      <div className='container'>
        <div className='w-full flex flex-col '>
          <div className='text-center pb-[clamp(.5rem,6.1111vw,1.5rem)] md:pb-0'>
            <h2 className='text-[clamp(1px,9.30232vw,70px)] md:text-[clamp(1px,2.5vw,96px)] font-Poppins font-bold '>
              <span className='text-darkBlue'>Step-by-step</span> till you pass!
            </h2>
            <p className='font-Sans font-bold text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]'>
              Elevate your learning and critical thinking like never before!
            </p>
            <p className='font-Sans font-normal text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] '>
              With the CORE-Zigma System, you will build your knowledge,
              confidence, and test-taking skills - step by step with our proven
              method!
            </p>
          </div>
          <div className='flex items-end justify-around py-[clamp(1px,2.083331vw,80px)] flex-wrap '>
            <div
              className='flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer'
              onClick={() => openModal('WatchVideos')}
            >
              <Image src={WatchVideos} alt='WatchVideos' className='md:w-[clamp(1px,21.9792vw,844px)]' />
              <p className='font-Sans font-normal pb-[clamp(.5rem,6.1111vw,1.5rem)] md:pb-[0] text-[clamp(1px,4.18604vw,40px)] md:text-[clamp(1px,1.041665vw,40px)]'>
                Step 1:<span className='text-darkBlue  font-bold '> By Watching</span>
              </p>
            </div>
            <div
              className='flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer'
              onClick={() => openModal('Study')}
            >
              <Image src={StudyCards} alt='StudyCards' className='md:w-[clamp(1px,21.3021vw,818px)]' />
              <p className='font-Sans font-normal pb-[clamp(.5rem,6.1111vw,1.5rem)] md:pb-[0] text-[clamp(1px,4.18604vw,40px)] md:text-[clamp(1px,1.041665vw,40px)]'>
                Step 2:<span className='text-darkBlue  font-bold '> By Studying</span>
              </p>
            </div>
            <div
              className='flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer'
              onClick={() => openModal('Practice')}
            >
              <Image
                src={PracticeTest}
                alt='PracticeTest'
                className='md:w-[clamp(1px,19.948vw,766px)]'
              />
              <p className='font-Sans font-normal text-[clamp(1px,4.18604vw,40px)] md:text-[clamp(1px,1.041665vw,80px)]'>
                Step 3:<span className='text-darkBlue  font-bold '> By Doing</span>
              </p>
            </div>
          </div>
          <DialogBox
            open={isOpenModal.isOpen}
            handleClose={closeModal}
            hideCloseButton
            sx={dialogStyles}
          >
            {isOpenModal.isOpen && modalContent[isOpenModal.modalType] && (
              <ModalContent
                type={isOpenModal.modalType}
                content={modalContent[isOpenModal.modalType]}
                sliderConfig={sliderConfig}
                onClose={closeModal}
              />
            )}
          </DialogBox>
          <div className="flex flex-col md:flex-row justify-between py-[clamp(1px,2.083331vw,80px)]">
            <div className="w-full md:w-[clamp(1px,24.4792vw,958px)] text-start md:ms-[clamp(1px,4.21875vw,162px)] mb-[clamp(.5rem,5.1vw,2.5rem)] md:mb-0">
              <p className="text-center md:text-start font-Poppins font-bold text-[clamp(1px,7.44185vw,80px)] md:text-[clamp(1px,2.0833307vw,80px)]">
                Watch <span className="text-darkBlue">How it Works</span>
              </p>
              <p className="font-Sans text-center md:text-start font-normal text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]">
                See for yourself how to use our system, and how much fun and different it is to learn and prepare for NCLEX!
              </p>
            </div>
            <div className="w-full md:w-[clamp(1px,29.688vw,1640px)] h-[clamp(1px,47.307vw,640px)] md:h-[clamp(1px,16.667vw,640px)] md:mx-[clamp(1px,2.96875vw,114px)]">
              <div className="bg-darkBlue w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
