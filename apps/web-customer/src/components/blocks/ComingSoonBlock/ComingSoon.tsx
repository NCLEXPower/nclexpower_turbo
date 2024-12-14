import React from 'react'
import {
  ComingSoon,
  CoreZigmaLogo,
  NCLEXYellowLogo
} from "core-library/assets";
import Image from "next/image";
import { useCountdown } from 'core-library/hooks/useCountdown';
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

const dateData = [{
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
}]

export const ComingSoonPage: React.FC = () => {
  const { timeRemaining } = useCountdown({ timeRemaining: '30:04:30:00' });

  return (
    <div className="w-full h-full lg:h-screen ">
      <div className="w-full flex justify-center items-center h-full flex-col">
        <Image
          src={ComingSoon}
          alt="CoreZigma"
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div className="flex items-center justify-center flex-col z-10 px-12 lg:px-80 space-y-2 lg:space-y-3">
          <div className="flex items-center justify-center gap-6">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
              }}
            />
            <Image
              src={NCLEXYellowLogo}
              alt="CoreZigma"
              style={{
                width: "161px",
                height: "40px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          </div>
          <Typography
            sx={{
              fontFamily: "PT Sans",
              fontWeight: "bold",
              color: "#f3f3f3",
              marginBottom: 4,
              fontSize: "clamp(1.6rem, 2.5vw, 3rem)",
            }}
          >
            Coming Soon
          </Typography>
          <div className="pt-sans-bold">
            <Typography
              sx={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
                color: "#f3f3f3",
                marginBottom: 4,
                fontSize: "clamp(2.3rem, 5cqw, 8rem)",
                textAlign: "center",
              }}
            >
              {timeRemaining}
            </Typography>
            {dateData.length > 0 && dateData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.days}
                </div>
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.hours}
                </div>
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.minutes}
                </div>
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.seconds}
                </div>
              </div>
            ))}
          </div>
          <p className="pt-sans-narrow-regular text-white text-[clamp(1.2rem,3cqw,1.7rem)] text-center px-4">
            Stay tuned as we prepare to unveil a brand-new experience just for you.
            Our team is working hard behind the scenes to bring something innovative and engaging.
            Check back soon for updates—you won&apos;t want to miss this!
          </p>
          <div className="flex items-center justify-center space-x-3 text-white">
            <FacebookIcon sx={{ fontSize: "2rem", }} />
            <InstagramIcon sx={{ fontSize: "2rem", }} />
            <TwitterIcon sx={{ fontSize: "2rem", }} />
          </div>
        </div>
      </div>
    </div>
  )
}