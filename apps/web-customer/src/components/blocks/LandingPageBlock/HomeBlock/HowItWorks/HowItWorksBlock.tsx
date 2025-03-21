/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { PracticeTest, StudyCards, WatchVideos } from "core-library/assets";
import Image from "next/image";
import React, { useState } from "react";
import { DialogBox } from "core-library/components";
import { ModalContent } from "./ModalComponent/ModalContent";
import { modalContent, sliderConfig } from "./ModalComponent/modalData";

interface Props {}

type ModalType = "WatchVideos" | "Study" | "Practice";

const dialogStyles = {
  "& .MuiDialog-paper": {
    width: "90%",
    maxWidth: "1050px",
    height: "auto",
    maxHeight: "90vh",
    overflowY: "auto",
    color: "#FFFFFF",
    borderRadius: "6px",
    padding: "1rem",
  },
};

export const HowItWorksBlock: React.FC<Props> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState<{
    modalType: ModalType;
    isOpen: boolean;
  }>({
    modalType: "WatchVideos",
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
    <div className="bg-softGrayBlue h-fit py-20 items-center justify-center flex">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col gap-5 items-center px-10 text-center">
          <p className="lg:text-4xl text-3xl font-bold ">
            <span className="text-darkBlue">Step-by-step</span> till you pass!
          </p>
          <p className="font-bold">
            Elevate your learning and critical thinking like never before!
          </p>
          <p>
            With the CORE-Zigma System, you will build your knowledge,
            confidence, and test-taking skills - step by step with our proven
            method!
          </p>
        </div>
        <div className="w-4/6 flex items-center justify-center py-10 flex-wrap gap-5 lg:gap-0 sm:w-[100%]">
          <div
            className="w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => openModal("WatchVideos")}
          >
            <Image src={WatchVideos} alt="WatchVideos" />
            <p>
              Step 1 :
              <span className="text-darkBlue font-bold">By Watching</span>
            </p>
          </div>
          <div
            className="w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => openModal("Study")}
          >
            <Image src={StudyCards} alt="StudyCards" />
            <p>
              Step 2 :
              <span className="text-darkBlue font-bold">By Studying</span>
            </p>
          </div>
          <div
            className="w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => openModal("Practice")}
          >
            <Image
              src={PracticeTest}
              alt="PracticeTest"
              className="md:h-[460px]"
            />
            <p>
              Step 3 :<span className="text-darkBlue font-bold">By Doing</span>
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
        <div className="lg:flex w-5/6 justify-center pt-10 ">
          <div className="lg:w-2/5 lg:pl-16 text-center lg:text-left flex flex-col gap-5">
            <p className="lg:text-4xl text-3xl font-bold">
              Watch <span className="text-darkBlue"> How it Works</span>
            </p>
            <p className="font-ptSansNarroxw lg:text-lg text-md">
              Day-by-day, step-by-step till you succeed! Watch this video on how
              we lead you throughout the review process - you'll be amazed at
              how simple yet effective our training method is!
            </p>
          </div>
          <div className=" h-64 lg:w-3/5 px-5 flex justify-center">
            <div className="bg-darkBlue w-full mt-5 lg:w-3/4 h-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
