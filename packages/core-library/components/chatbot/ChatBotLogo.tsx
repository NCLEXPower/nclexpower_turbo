import Image from "next/image";
import React from "react";
import { ArxeniusLogoYellow } from "../../assets";

interface Props {
  width: number;
  height: number;
}

export const ChatBotLogo: React.FC<Props> = ({ width, height }) => {
  return (
    <img
      data-testid="company-logo"
      src={ArxeniusLogoYellow}
      alt="CoreZigma"
      width={width}
      height={height}
    />
  );
};
