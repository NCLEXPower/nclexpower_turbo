import {
  ComingSoon,
  CoreZigmaLogo,
  ArxeniusYellowLogo,
} from "core-library/assets";
import Image from "next/image";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { comingSoonSchema, ComingSoonType } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "core-library/components";
import { SocialMediaConfig, useSocialMediaIcons } from "core-library/hooks";
import { Schedule } from "core-library/api/types";

interface Props {
  schedule?: Schedule | undefined;
  onSubmit: (values: ComingSoonType) => void;
  loading: boolean;
}

const socialMediaConfigs: SocialMediaConfig[] = [
  {
    platform: "facebook",
    link: "https://www.facebook.com/profile.php?id=61573493806921",
  },
  { platform: "instagram", link: "https://www.instagram.com/ncpreview/" },
];

export const ComingSoonPage: React.FC<Props> = ({
  schedule,
  onSubmit,
  loading,
}) => {
  const socialMediaIcons = useSocialMediaIcons(socialMediaConfigs);

  const method = useForm<ComingSoonType>({
    mode: "onSubmit",
    resolver: yupResolver(comingSoonSchema),
  });

  const { handleSubmit, control } = method;

  return (
    <div className="w-full min-h-screen relative bg-[#0F2A71] pt-10">
      <div className="w-full flex justify-center items-center min-h-screen flex-col">
        <Image
          src={ComingSoon}
          alt="CoreZigma"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
        <div className="flex items-center justify-center flex-col z-10 px-8 w-full max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
            />
            <Image
              src={ArxeniusYellowLogo}
              alt="CoreZigma"
              style={{
                width: "auto",
                height: "38px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          </div>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#CDCDCD",
              mt: 3,
              fontSize: "clamp(2.5rem,8vw,4.5rem)",
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Coming Soon
          </Typography>
          <FormProvider {...method}>
            <div className="flex w-[95%] gap-2 flex-col justify-center md:items-end md:flex-row md:gap-4 mt-4">
              <TextField
                control={control}
                name="email"
                placeholder="Email"
                disabled={loading}
                sx={{
                  borderRadius: "10px",
                  flexGrow: 1,
                  height: "56px",
                  border: "2px solid #D9D9D9",
                  fontSize: "1rem",
                  "& .MuiInputBase-input": {
                    color: "#D9D9D9",
                  },
                  "& .MuiInputBase-input:focus": {},
                }}
                inputProps={{
                  style: {
                    borderRadius: "16px",
                    boxShadow: "none",
                  },
                }}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                loading={loading}
                sx={{
                  color: "#0F2A71",
                  backgroundColor: "#ffffff !important",
                  borderRadius: "10px",
                  fontFamily: "'Poppins'",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  minWidth: "180px",
                  height: "56px",
                  minHeight: "56px",
                  maxHeight: "56px",
                  zIndex: 1,
                  marginTop: "4px",
                  padding: {
                    xs: "6px 12px",
                    lg: "8px 16px",
                  },
                  "&:hover": {
                    backgroundColor: "#F3f3f3",
                  },
                }}
              >
                Notify Me
              </Button>
            </div>
          </FormProvider>
          <p className="font-['Poppins'] text-white text-base text-center px-4 flex flex-col mt-8 mb-4">
            Stay tuned as we prepare to unveil a brand-new experience just for
            you! Our team is working hard behind the scenes to bring the most
            innovative and engaging review for the NCLEX. Check back soon for
            updates—you won&apos;t want to miss this!
          </p>
          <div className="flex items-center justify-center space-x-1.5 text-white mt-4">
            {socialMediaIcons}
          </div>
        </div>
      </div>
    </div>
  );
};
