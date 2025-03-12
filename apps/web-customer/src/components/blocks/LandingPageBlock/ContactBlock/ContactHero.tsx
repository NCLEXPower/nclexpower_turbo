import { Box } from "@mui/material";
import { ContactUsBanner } from "core-library/assets";
import Image from "next/image";

export const ContactHero: React.FC = () => {
  return (
    <Box className="h-auto" position="relative">
      <div className="relative h-screen lg:h-[clamp(1px,32.9688vw,1366px)] ">
        <Image
          className="w-full h-screen lg:h-[clamp(1px,32.9688vw,1366px)] relative object-cover"
          loading="lazy"
          src={ContactUsBanner}
          alt="ContactUsBanner"
          data-testid="contactus-banner"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4  ">
          <div className="container">
            <h2 className="text-[clamp(1px,7.44185vw,120px)] lg:text-[clamp(1px,3.13vw,120px)] font-ptSans text-yellow font-bold text-center lg:text-left">
              Get In Touch
            </h2>
            <p className="text-[clamp(1px,4.65116vw,48px)] lg:text-[clamp(1px,1.25vw,48px)] font-ptSans font-normal text-primary text-center lg:text-left px-4 lg:px-0">
              We'd love to hear from you! Reach out with any questions or
              feedback.
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};
