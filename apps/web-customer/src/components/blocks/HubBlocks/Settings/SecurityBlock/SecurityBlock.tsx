import React from "react";
import { Box } from "@mui/material";
import { TextField } from "core-library/components";
import { Box, Switch, SxProps } from "@mui/material";
import { Button, EvaIcon } from "core-library/components";

const boxSx: SxProps = {
  bgcolor: "#0F2A710D",
  borderRadius: "15px",
  fontFamily: "'PT Sans','sans-serif'",
  fontWeight: "700",
};

const boxSx2: SxProps = {
  bgcolor: "#fff",
  borderBottom: 1,
  borderColor: "#33333333",
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  gap: "1rem",
  width: "100%",
  fontWeight: "700",
  fontFamily: "'PT Sans','sans-serif'",
};

const buttonSx: SxProps = {
  padding: "0",
  fontSize: "20px",
  fontWeight: "700",
  borderRadius: "5px",
  marginLeft: "auto",
  minHeight: 35,
  minWidth: 77,
};

interface SecurityProps {
  title: string;
  subTitle: string;
}
export const SecurityBlock: React.FC<SecurityProps> = ({ title, subTitle }) => {
  return (
    <>
      <Box className="flex flex-col mb-8">
        <h4 className="font-ptSans text-[28px] text-black font-bold">
          {title}
        </h4>
        <h4 className="font-ptSans text-[20px] text-[#333333] font-regular">
          {subTitle}
        </h4>
      </Box>
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        <SecurityAndPassword />

        <div className="flex flex-col gap-10">
          <ThisDevice />
          <ActiveDevice />
        </div>
      </div>
    </>
  );
};

const SecurityAndPassword: React.FC = () => {
  return (
    <Box
      sx={{
        ...boxSx,
      }}
      className="grow"
    >
      <h2 className="py-4 px-8 text-base sm:text-xl font-ptSans font-[700] border-[#0F2A7180] border-b">
        Security & Password
      </h2>
      <Box className="p-1 py-8 sm:p-10 lg:mt-6 ">
        <div className="w-full">
          <Box
            sx={{
              ...boxSx2,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            className="text-base sm:text-xl"
          >
            <EvaIcon name="lock-outline" />
            <span className="grow">Update Password</span>
            <Button
              sx={{
                ...buttonSx,
                minHeight: "40px",
                minWidth: 100,
              }}
            >
              Update
            </Button>
          </Box>
          <Box
            sx={{
              ...boxSx2,
            }}
            className="text-base sm:text-xl"
          >
            <EvaIcon name="shield-off-outline" />
            <span>Two-Factor Authenticator</span>
            <Switch
              size="medium"
              sx={{
                marginLeft: "auto",
              }}
            />
          </Box>
          <Box
            sx={{
              ...boxSx2,
              paddingLeft: "3.5rem",
            }}
            className="text-base sm:text-xl"
          >
            <div>
              <p className="m-0">Authentication App</p>
              <p className="text-[18px] m-0 font-normal text-[#333333B2]">
                Google auth app
              </p>
            </div>
            <Button
              variant="outlined"
              sx={{
                ...buttonSx,
              }}
            >
              Setup
            </Button>
          </Box>
          <Box
            sx={{
              ...boxSx2,
              paddingLeft: "3.5rem",
            }}
            className="text-base sm:text-xl"
          >
            <div>
              <p className="m-0">Primary Email</p>
              <p className="text-[18px] m-0 font-normal text-[#333333B2]">
                E-mail used to send notifications
              </p>
            </div>
            <Button
              variant="outlined"
              sx={{
                ...buttonSx,
              }}
            >
              Setup
            </Button>
          </Box>
          <Box
            sx={{
              ...boxSx2,
              paddingLeft: "3.5rem",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              border: "none",
            }}
            className="text-base sm:text-xl"
          >
            <div>
              <p className="m-0">SMS Recovery</p>
              <p className="text-[18px] m-0 font-normal text-[#333333B2]">
                Your phone number
              </p>
            </div>
            <Button
              variant="outlined"
              sx={{
                ...buttonSx,
              }}
            >
              Setup
            </Button>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

const ThisDevice: React.FC = () => {
  return (
    <Box sx={{ ...boxSx }}>
      <h2 className="py-4 px-8 text-xl font-ptSans font-[700] border-[#0F2A7180] border-b">
        This Device
      </h2>
      <Box className="p-8 font-[700]">
        <Box className=" flex gap-4 border-b border-[#0F2A7180] pb-8">
          <EvaIcon name="monitor-outline" />
          <div className="mr-auto">
            <p className="m-0">MacBook Pro</p>
            <p className="text-[18px] m-0 font-normal text-[#333333B2]">
              Manila, Philippines · Online
            </p>
          </div>
          <div className="flex items-center">
            <EvaIcon name="more-vertical-outline" />
          </div>
        </Box>
        <Box className="flex gap-4 items-center text-[#FF0000]">
          <EvaIcon fill="#FF0000" name="trash-outline" />
          <p>Terminate all other sessions</p>
        </Box>
      </Box>
    </Box>
  );
};

const ActiveDevice: React.FC = () => {
  return (
    <Box sx={{ ...boxSx }}>
      <h2 className="py-4 px-8 text-xl font-ptSans font-[700] border-[#0F2A7180] border-b">
        Active Device
      </h2>
      <Box className="p-8 font-[700]">
        <Box className=" flex gap-4 border-b border-[#0F2A7180] pb-8">
          <EvaIcon name="smartphone-outline" />
          <div className="mr-auto">
            <p className="m-0">IPhone 11</p>
            <p className="text-[18px] m-0 font-normal text-[#333333B2]">
              Manila, Philippines · 2 hours ago
            </p>
          </div>
          <div className="flex items-center">
            <EvaIcon name="more-vertical-outline" />
          </div>
        </Box>
        <Box className=" flex gap-4 pt-8">
          <EvaIcon name="smartphone-outline" />
          <div className="mr-auto">
            <p className="m-0">MacBook Pro</p>
            <p className="text-[18px] m-0 font-normal text-[#333333B2]">
              Cavite, Philippines · 09/11/24
            </p>
          </div>
          <div className="flex items-center">
            <EvaIcon name="more-vertical-outline" className="" />
          </div>
        </Box>
      </Box>
    </Box>
  );
};
