import React, { useState } from 'react';
import {
  BlueDocument,
  CompletedBlueIcon,
  GreenDocument,
  LightBulbGreen,
  NCLEXBlueLogo,
} from 'core-library/assets';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Toolbar,
} from '@mui/material';

import { LightBulbBlue } from 'core-library/assets';
import { PricingDetailProps } from 'core-library/types/global';

const PricingDetail = ({ cardData, onClose }: PricingDetailProps) => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProduct(Number(event.target.value));
  };

  const getBackgroundColor = (
    programType: number,
    selectedProduct: number,
    option: number
  ) => {
    if (programType === 0) {
      return option === selectedProduct ? 'bg-[#0F2A7126]' : 'bg-white';
    }

    if (programType === 1) {
      return option === selectedProduct ? 'bg-[#084A4E26]' : 'bg-white';
    }

    return 'bg-white';
  };

  return (
    <div className="w-full min-h-full flex flex-col  p-6  xl:flex-row  xl:gap-24 xl:p-12  ">
      <div className="w-full   xl:w-4/6 pl-6 lg:pl-16 my-6 ">
        <Box sx={{ position: 'relative', cursor: 'pointer' }}>
          <Toolbar onClick={onClose} aria-label="close">
            <ArrowBackIcon />
            <p className="text-base ml-3 underline text-darkBlue font-bold">
              Go Back
            </p>
          </Toolbar>
        </Box>
        <div className="ml-8 space-y-6 ">
          <Image width={150} src={NCLEXBlueLogo} alt="NCLEX Logo" />

          <h1 className="text-3xl lg:text-5xl font-ptSans font-semibold">
            Detailed Pricing
          </h1>

          <div>
            <h3 className="text-[#818181] text-lg lg:text-2xl font-ptSans ">
              Product Type
            </h3>
            <h2 className="text-darkBlue text-2xl lg:text-4xl font-ptSans font-semibold">
              Registed Nurse (RN)
            </h2>
          </div>
          <p className="text-curveGray font-ptSansNarrow  text-lg">
            Transform your learning experience with our comprehensive package,
            designed specifically to help you excel in patient care and medical
            practice.
          </p>

          <div className="flex flex-col text-lg lg:text-2xl text-[#202020]">
            <div className="flex ">
              <div className="flex items-start">
                <Image
                  width={42}
                  src={CompletedBlueIcon}
                  alt="Completed Blue Icon"
                  className=" pt-3"
                />
              </div>
              <div className="flex-1  ">
                <p className=" font-normal font-ptSansNarrow">
                  <span className="font-bold ">Comprehensive Review: </span> A
                  complete learning package with med cards, engaging videos, an
                  adaptive simulator, and a guided schedule to master patient
                  care
                </p>
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-start">
                <Image
                  width={42}
                  src={CompletedBlueIcon}
                  alt="Completed Blue Icon"
                  className=" pt-3"
                />
              </div>
              <div className="flex-1 font-ptSansNarrow ">
                <p className=" font-normal">
                  <span className="font-bold">
                    {' '}
                    Content and Med Cards Included:
                  </span>{' '}
                  Dive into detailed, high-quality resources like comprehensive
                  content and medication cards to enhance your understanding and
                  retention..
                </p>
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-start">
                <Image
                  width={42}
                  src={CompletedBlueIcon}
                  alt="Completed Blue Icon"
                  className=" pt-3"
                />
              </div>
              <div className="flex-1 font-ptSansNarrow ">
                <p className=" font-normal">
                  <span className="font-bold">Engaging Topic Videos: </span>{' '}
                  Stay captivated and informed with expertly crafted videos that
                  bring critical topics to life.
                </p>
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-start">
                <Image
                  width={42}
                  src={CompletedBlueIcon}
                  alt="Completed Blue Icon"
                  className=" pt-3"
                />
              </div>
              <div className="flex-1 font-ptSansNarrow">
                <p className=" font-normal">
                  <span className="font-bold">
                    100% Computer Adaptive Simulator:{' '}
                  </span>
                  Test and improve your skills with our advanced simulator that
                  adjusts to your level, providing a personalized learning
                  experience.
                </p>
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-start">
                <Image
                  width={42}
                  src={CompletedBlueIcon}
                  alt="Completed Blue Icon"
                  className=" pt-3"
                />
              </div>
              <div className="flex-1 font-ptSansNarrow text-[#202020]">
                <p className=" font-normal ">
                  <span className="font-bold">
                    Step-by-Step Guided Schedule:
                  </span>{' '}
                  Stay on track and motivated with a structured schedule
                  tailored to guide you every step of the way toward your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full   xl:w-2/6 flex flex-col justify-between px-8 py-12 bg-[#F2F2F2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  rounded-2xl">
        <div className="flex flex-col h-full space-y-12">
          <FormControl className="h-1/2">
            <FormLabel id="product-selection">
              <h2 className="font-ptSans text-xl lg:text-3xl font-bold mb-6">
                Product Selection
              </h2>
            </FormLabel>
            <RadioGroup
              aria-labelledby="product-selection"
              name="product-selection-group"
              value={selectedProduct}
              onChange={handleChange}
              className="space-y-3"
            >
              <div
                className={`flex items-center justify-between w-full px-6 py-6 rounded-2xl 
                transition-all duration-300
               shadow-[0px_1px_4.2px_0px_rgba(0,0,0,0.25)]
                border border-[#0F2A716B]
                cursor-pointer
                ${getBackgroundColor(cardData.programType, selectedProduct, 0)}
              `}
                onClick={() => setSelectedProduct(0)}
              >
                <div className=" flex items-center justify-center w-full">
                  <Radio
                    value="0"
                    checked={selectedProduct === 0}
                    className="hidden"
                  />
                  <div className="w-full font-ptSans">
                    <h1 className="text-xl font-ptSans  lg:text-3xl font-bold -mb-4">
                      Fast Track{' '}
                    </h1>
                    <p className="text-sm font-ptSans font-normal text-curveGray">
                      {' '}
                      Eight (8) Days
                    </p>
                  </div>
                </div>

                <div className="w-full mx-auto text-right font-bold text-2xl  lg:text-4xl">
                  $ 180
                </div>
              </div>

              <div
                className={`flex items-center justify-between w-full px-6 py-6 rounded-2xl 
                transition-all duration-300
               shadow-[0px_1px_4.2px_0px_rgba(0,0,0,0.40)]
                border border-[#084A4E6B]
                cursor-pointer
              ${getBackgroundColor(cardData.programType, selectedProduct, 1)}
    
              `}
                onClick={() => setSelectedProduct(1)}
              >
                <div className="flex w-full">
                  <Radio
                    value="1"
                    checked={selectedProduct === 1}
                    className="hidden"
                  />
                  <div className="w-2/3 lg:w-full font-ptSans">
                    <h1 className=" text-xl font-ptSans  lg:text-3xl font-bold -mb-4">
                      Standard{' '}
                    </h1>
                    <p className=" text-sm font-ptSans font-normal text-curveGray  ">
                      Twenty Three (23) Days
                    </p>
                  </div>
                </div>
                <div className="w-1/3 lg:w-full text-right font-bold text-xl lg:text-4xl">
                  $ 230
                </div>
              </div>
            </RadioGroup>
          </FormControl>

          <hr className="text-[#BFBFBF]" />

          <div className="h-full flex flex-col justify-end px-12">
            <div className="relative w-full  flex flex-col items-end">
              <div className="relative  flex flex-col items-end w-full -bottom-6 z-10 ">
                <Image
                  src={
                    cardData.programType === 0 ? BlueDocument : GreenDocument
                  }
                  alt="Blue Document"
                  className="w-[204px] h-[211px]"
                />
                <Image
                  src={
                    cardData.programType === 0 ? LightBulbBlue : LightBulbGreen
                  }
                  alt="Light Bulb Blue"
                  className="absolute -bottom-14 -right-16  w-[227px] h-[264px] "
                />
              </div>
              <button
                className={`text-primary py-3 ${cardData.programType === 0 ? 'bg-darkBlue' : 'bg-[#084A4E]'}  rounded-xl w-full z-20`}
              >
                Get Started
              </button>
            </div>
            <p className="text-sm  text-[#8A8A8A]">
              Both programs allow up to 6 months access to the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetail;
