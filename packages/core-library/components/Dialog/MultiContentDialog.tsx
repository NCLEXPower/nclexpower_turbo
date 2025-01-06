import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import ReactPlayer from "react-player";
import { DialogBox } from "./DialogBox";
import { Button } from "../Button/Button";

export type DialogContents = {
  id: number;
  title: string;
  contentType: "video" | "text";
  content: string;
  image?: StaticImageData | string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  content: DialogContents[];
  showTour?: boolean;
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

const IndicatorDots = ({ count, activeIndex }: {
  count: number;
  activeIndex: number
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    my={1.5}
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

export const MultiContentDialog: React.FC<Props> = ({
  open,
  handleClose,
  content,
  showTour = false,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderContent = useMemo(() => {
    const data = content[activeTab];

    if (!data) return null;

    switch (data.contentType) {
      case "video":
        return (
          <ReactPlayer
            url={data.content}
            controls
            width="100%"
            height="340px"
          />
        );
      case "text":
        return <>{data.content}</>;
      default:
        return null;
    }
  }, [content, activeTab]);

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
        fontSize: "1.2rem",
        flexDirection: "column",
        color: "#343a40",
      }}>
        {renderContent}
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
        {showTour ? (
          <Button
            onClick={isLastIndex ? handleClose : handleNext}
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