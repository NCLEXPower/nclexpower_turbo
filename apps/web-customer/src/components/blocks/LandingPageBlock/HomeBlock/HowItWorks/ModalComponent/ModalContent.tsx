/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { EvaIcon, IconButton } from "core-library/components";
import { Box } from "@mui/material";
import { CarouselSection, SliderConfig } from "./CarouselSection";
import { ImageSection } from "./ImageSection";
import { ContentSection } from "./ContentSection";

interface Content {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
  paragraphThree?: string;
  bullets?: string[];
  carouselImages?: string[];
  image?: string;
}

interface ModalContentProps {
  type: "WatchVideos" | "Study" | "Practice";
  content: Content;
  sliderConfig: SliderConfig;
  onClose: () => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  type,
  content,
  sliderConfig,
  onClose,
}) => {
  return (
    <div className="absolute top-0 left-0 sm:overflow-hidden overflow-y-scroll bg-[#181818] w-full h-full flex flex-col sm:flex-row">
      {type !== "WatchVideos" && content.carouselImages && (
        <CarouselSection
          images={content.carouselImages}
          sliderConfig={sliderConfig}
          type={type}
        />
      )}
      {type === "WatchVideos" && content.image && (
        <ImageSection image={content.image} altText={`${type} Image`} />
      )}
      <ContentSection
        title={content.title}
        paragraphOne={content.paragraphOne}
        paragraphTwo={content.paragraphTwo}
        paragraphThree={content.paragraphThree}
        bullets={content.bullets}
      />
      <Box className="absolute right-5 top-5 cursor-pointer z-10">
        <div
          className="bg-[#7E7E7E] rounded-full w-full h-full flex items-center justify-center"
          style={{
            width: "clamp(24px, 5vw, 40px)",
            height: "clamp(24px, 5vw, 40px)",
          }}
        >
          <IconButton onClick={onClose} className="w-[100%] h-[100%]">
            <EvaIcon
              id="close-icon"
              name="close"
              fill="#4B4B4B"
              className="w-[100%] h-[100%]"
              aria-label="Close Modal"
              ariaHidden
            />
          </IconButton>
        </div>
      </Box>
    </div>
  );
};
