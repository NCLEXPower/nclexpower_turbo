import { Box } from "@mui/material";
import { ContactUsBanner } from "core-library/assets";
import Image from "next/image";

export const ContactHero: React.FC = () => {
  return (
    <Box className="h-auto" position="relative">
      <div className="relative h-screen lg:h-[633px]">
        <Image
          className="w-full h-screen lg:h-[633px] relative object-cover"
          loading="lazy"
          src={ContactUsBanner}
          alt="ContactUsBanner"
          data-testid="contactus-banner"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-4 lg:items-start lg:justify-start lg:ml-[12%] lg:mt-[12%]">
          <p className="text-6xl font-ptSans text-yellow font-bold text-center lg:text-left">
            Get In Touch
          </p>
          <p className="text-2xl font-ptSans font-normal text-primary text-center lg:text-left px-4 lg:px-0">
            We'd love to hear from you! Reach out with any questions or
            feedback.
          </p>
        </div>
      </div>
    </Box>
  );
};
