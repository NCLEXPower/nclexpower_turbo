import { Box } from "@mui/material";
import { Button, EvaIcon, LottieAnimation } from "core-library/components";
import {
  HelpWidget,
  NCLEXYellowLogo,
} from "core-library/assets";
import Image from "next/image";
import { useRouter } from "core-library";
interface Props {}
export const HelpWidgetBlock: React.FC<Props> = ({}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/")
  };
  return (
    <section className="w-full flex items-center justify-center container-2xl bg-white">
      <Box className="flex items-center justify-center p-0 md:p-20">
        <Box className="w-auto lg:w-[1000px] relative bg-gradient-to-r from-mainBlue to-[#181E2F] flex flex-col items-center md:flex-row gap-8 rounded-none md:rounded-2xl px-12 lg:px-24 py-8 md:py-12">
          <Box className="flex flex-col gap-4 order-2 md:order-1 mb-4 md:mb-0">
            <Image alt="NCLEX Logo" src={NCLEXYellowLogo} />
            <Box className="flex flex-col gap-2">
              <h4 className="text-xl md:text-2xl font-bold font-Poppins text-white">
                Need Help with Your NCLEX Prep?
              </h4>
              <h4 className="text-md lg:text-lg font-medium font-Rajdhani text-white">
                Have questions or unsure about your next steps? Reach out here{" "}
                <br />
                for personalized guidance and expert support to help you succeed{" "}
                <br />
                on the NCLEX!
              </h4>
            </Box>
            <Button
              text="Get Started"
              sx={{
                width: "170px",
                borderRadius: "20px",
                background: "white",
                transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  background: "white",
                  boxShadow: "none",
                  transform: "scale(1.05)"
                }
              }}
              onClick={handleClick}
            >
              <Box className="w-full flex gap-2">
                <h4 className="font-Poppins text-lg text-darkBlue font-medium">Get Started</h4>
                <EvaIcon name="arrow-forward-outline" fill="#0F2A71" />
              </Box>
            </Button>
          </Box>
          <Box className="order-1 md:order-2 mt-[-10px] md:mb-0">
            <LottieAnimation
              animationData={HelpWidget}
              width={280}
              height={280}
            />
          </Box>
        </Box>
      </Box>
    </section>
  );
};