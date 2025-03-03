import { Box } from "@mui/material";
import { ContactUsBanner } from "core-library/assets";
import Image from "next/image";

export const ContactHero: React.FC = () => {
  return (
    <Box className="h-auto" position="relative">
      <div className="relative h-screen md:h-[clamp(1px,32.96875vw,1266px)]">
        <Image
          className="w-full h-screen md:h-[clamp(1px,32.96875vw,1266px)] relative object-cover"
          loading="lazy"
          src={ContactUsBanner}
          alt="ContactUsBanner"
          data-testid="contactus-banner"
        />
        <div className="absolute inset-0 z-10  ">
          <div className="container">
            <div className="flex flex-col items-center justify-center h-screen  md:items-start md:h-[clamp(1px,32.96875vw,1266px)]">
              <h1 className="text-[clamp(1px,11.1628vw,200px)] md:text-[clamp(1px,5.20834vw,200px)] font-Poppins text-yellow font-bold text-center ">
                Get In Touch
              </h1>
              <p className="text-[clamp(1px,5.5814vw,48px)] md:text-[clamp(1px,1.25vw,48px)] font-ptSans font-normal text-primary text-center lg:text-left px-4 lg:px-0 !m-0">
                We'd love to hear from you! Reach out with any questions or
                feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
