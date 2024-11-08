import Image from "next/image";
import React from "react";

interface Props {
  width: number;
  height: number;
}

export const ChatBotLogo: React.FC<Props> = ({ width, height }) => {
  return (
    <img
      data-testid="company-logo"
      src="https://dev-nclexpower.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNCLEXYellowLogo.59a5d31e.png&w=256&q=75"
      alt="CoreZigma"
      width={width}
      height={height}
    />
  );
};
