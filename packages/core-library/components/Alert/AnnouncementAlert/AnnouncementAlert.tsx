import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import { CoreZigmaLogo } from "../../../assets";
import { EvaIcon } from "../../EvaIcon";
import { IconButton } from "../../Button/IconButton";

interface AnnouncementProps {
  title: string;
  content?: string;
  Icon?: string;
  isOpen: boolean;
  bgColor?: string;
  handleClose: () => void;
}

export const AnnouncementAlert: React.FC<AnnouncementProps> = ({
  bgColor,
  isOpen,
  Icon,
  title,
  content,
  handleClose,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="w-full h-auto bg-darkBlue flex fixed justify-between flex-wrap gap-10 p-3 z-50"
          style={{ backgroundColor: bgColor }}
        >
          <div>
            <Image
              alt="NCLEXANNOUNCEMENT"
              src={CoreZigmaLogo || Icon}
              width={50}
            />
          </div>
          <div className="flex-1 text-white ">
            <Typography variant="body1" fontFamily={"sans-serif"}>
              {title}
            </Typography>
            <Typography variant="caption" fontFamily={"sans-serif"}>
              {content}
            </Typography>
          </div>
          <div>
            <IconButton onClick={handleClose} className="w-24">
              <EvaIcon
                id="close-icon"
                name="close"
                fill="#fcf2f2"
                aria-label="Close Modal"
                ariaHidden
              />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};
