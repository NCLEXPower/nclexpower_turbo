import React, { useState } from "react";
import { Button, DialogBox } from "core-library/components";
import { Box, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import ReactPlayer from "react-player";

type DialogContents = {
  id: number;
  title: string;
  contentType: string;
  content: string;
  image?: StaticImageData | string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  content: DialogContents[];
  startTour?: boolean;
  handleTour?: () => void;
};

const btnStyle = {
  paddingY: 2.5,
  fontFamily: "PT Sans Narrow",
  fontWeight: "bold",
  backgroundColor: "transparent",
  border: "1px solid #0F2A71",
  color: "#0F2A71",
  borderRadius: "6px",
};

const IndicatorDots = ({ count, activeIndex }: { count: number; activeIndex: number }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    my={2}
  >
    {Array.from({ length: count }).map((_, index) => (
      <Box
        key={index}
        width={8}
        height={8}
        borderRadius="50%"
        bgcolor={
          index === activeIndex
            ? '#10B981'
            : '#0F2A71'
        }
        mx={0.5}
      />
    ))}
  </Box>
);

const renderContent = (contentType: string, data: DialogContents, activeTab: number) => {
  switch (contentType) {
    case "video":
      return (
        <ReactPlayer
          url={data.content}
          controls
          width="100%"
          height="400px"
        />
      );
    case "text":
      return <>{data.content}</>;
    default:
      return null;
  }
};

export const MultiContentDialog: React.FC<Props> = ({
  open,
  handleClose,
  content,
  startTour = false,
  handleTour,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleNext = () => {
    if (activeTab < content.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const isLastIndex = activeTab === content.length - 1;

  if (!content[activeTab]) {
    return null;
  }

  return (
    <DialogBox
      handleClose={handleClose}
      loading={false}
      maxWidth="md"
      open={open}
      hideCloseButton
      sx={{ height: "auto" }}
      isOverflowing={false}
    >
      <div className="flex items-center justify-center flex-col gap-2">
        {content[activeTab].image && (
          <div className="w-[100px] h-auto overflow-hidden">
            <Image
              src={content[activeTab].image}
              alt="Dialog Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <Typography
          align="center"
          sx={{
            fontFamily: "PT Sans",
            color: "#0F2A71",
            fontSize: "1.5rem",
            fontWeight: "bold"
          }}>
          {content[activeTab].title}
        </Typography>
      </div>
      <Box sx={{
        width: "100%",
        textAlign: "center",
        fontFamily: "PT Sans Narrow",
        fontSize: "1.3rem",
        flexDirection: "column",
        color: "#343a40",
      }}>
        {renderContent(content[activeTab].contentType, content[activeTab], activeTab)}
      </Box>
      <IndicatorDots count={content.length} activeIndex={activeTab} />
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: activeTab === 0
          ? "end"
          : "space-between",
      }}>
        {activeTab > 0 && (
          <Button onClick={handlePrevious} variant="text" sx={btnStyle}>
            Previous
          </Button>
        )}
        {startTour ? (
          <Button
            onClick={isLastIndex ? handleTour : handleNext}
            variant="text"
            sx={btnStyle}
          >
            {isLastIndex ? "Start Tour" : "Next"}
          </Button>
        ) :
          <Button
            onClick={isLastIndex ? handleClose : handleNext}
            variant="text"
            sx={btnStyle}
          >
            {isLastIndex ? "Close" : "Next"}
          </Button>
        }
      </Box>
    </DialogBox>
  );
};
