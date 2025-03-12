import { Box, useMediaQuery } from "@mui/material";
import { Button, EvaIcon, LottieAnimation } from "core-library/components";
import {
  HelpWidget,
  NCLEXYellowLogo,
} from "core-library/assets";
import Image from "next/image";
import { useRouter } from "core-library";
interface Props { }
export const HelpWidgetBlock: React.FC<Props> = ({ }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push((route) => route.home)
  };

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section className="container bg-white">
      <Box className="flex items-center justify-center px-0 md:px-[clamp(1px,4.166665vw,160px)] py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)]">
        <Box className="relative bg-gradient-to-r from-mainBlue to-[#181E2F] flex flex-col items-center md:flex-row rounded-lg py-5 md:ps-[clamp(1px,4.999998vw,192px)]">
          <Box className="flex flex-col items-center md:items-start gap-[clamp(1px,0.84vw,32px)] px-3  order-2 md:order-1 mb-4 md:mb-0 md:pe-[clamp(1px,2.083331vw,80px)]">
            <Image alt="NCLEX Logo" src={NCLEXYellowLogo} className="w-[clamp(1px,58.14vw,600px)] md:w-[clamp(1px,10.417vw,400px)]" />
            <Box className="flex flex-col text-center md:text-left ">
              <h3 className="text-[clamp(1px,6.0465vw,70px)] md:text-[clamp(1px,1.770831vw,68px)] font-bold font-Poppins text-white">
                Need Help with Your NCLEX Prep?
              </h3>
              <p className="text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] font-medium font-sans text-white pb-0 pb-md-4">
                Have questions or unsure about your next steps? Reach out here
                for personalized guidance and expert support to help you succeed
                on the NCLEX!
              </p>
            </Box>
            <Button
              text="Get Started"
              sx={{
                minWidth: isMobile ? "clamp(1px,44.298vw,400px)" : "clamp(1px,10.417vw,400px)",
                minHeight: isMobile ? "clamp(1px,11.075vw,100px)" : "clamp(1px,2.865vw,110px) !important",
                borderRadius: isMobile ? "clamp(1px,2vw,20px)" : "clamp(1px,0.5vw,20px)",
                background: "white",
                transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                padding: "0px",
                "&:hover": {
                  background: "white",
                  boxShadow: "none",
                  transform: "scale(1.05)"
                }
              }}
              onClick={handleClick}
            >
              <Box className="w-full flex items-center justify-center">
                <h4 className="font-Poppins text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)] text-darkBlue font-medium me-3">Get Started</h4>
                <EvaIcon
                  name="arrow-forward-outline"
                  fill="#0F2A71"
                  className="w-[18px] md:!w-[clamp(1px,1.042vw,40px)] h-[18px] md:!h-[clamp(1px,1.042vw,40px)]"
                />
              </Box>
            </Button>
          </Box>
          <Box className="order-1 md:order-2  md:mb-0 ">
            <LottieAnimation
              animationData={HelpWidget}
              style={{
                width: isMobile ? "clamp(1px,69.77vw,600px)" : "clamp(1px,26.042vw,1000px)",
                height: "100%",
              }}
            />
          </Box>
        </Box>
      </Box>
    </section >
  );
};