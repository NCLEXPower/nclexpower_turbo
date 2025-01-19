import { Box, SxProps, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import { Button, EvaIcon, TextField } from "../../../../../../../../components";
import { profile } from "../../../../../../../../assets";
import Image from "next/image";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema, AccountSchemaType } from "../validation";
import { UserInfo } from "../types";

const textFieldSx: SxProps = {
  borderRadius: "10px",
  padding: 0,
  height: "45px",
};

const inputStyle: CSSProperties = {
  borderRadius: "10px",
  padding: "0 24px 0 50px",
  height: "45px",
};

const buttonSx: SxProps = {
  minWidth: "90px",
  minHeight: "30px",
  backgroundColor: "transparent",
  borderRadius: "50px",
  border: "1px solid #33333333",
  boxShadow: "none",
  color: "black",
  fontWeight: 400,
  padding: 0,
};

const inputIconStyle: CSSProperties = {
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
};

type TextFieldItem = {
  id: number;
  label: string;
  name: keyof AccountSchemaType;
  icon: React.ReactNode;
};

const textFieldItems: TextFieldItem[] = [
  {
    id: 1,
    label: "First Name",
    name: "firstName",
    icon: <EvaIcon name="person" fill="#3333334D" style={inputIconStyle} />,
  },
  {
    id: 2,
    label: "Middle Name",
    name: "middleName",
    icon: <EvaIcon name="person" fill="#3333334D" style={inputIconStyle} />,
  },
  {
    id: 3,
    label: "Last Name",
    name: "lastName",
    icon: <EvaIcon name="person" fill="#3333334D" style={inputIconStyle} />,
  },
  {
    id: 4,
    label: "Email Address",
    name: "email",
    icon: <EvaIcon name="at" fill="#3333334D" style={inputIconStyle} />,
  },
];

interface PersonalInformationBlockProps {
  userInfo: UserInfo;
}

export const PersonalInformationBlock: React.FC<
  PersonalInformationBlockProps
> = ({ userInfo }) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(accountSchema),
    defaultValues: userInfo,
  });
  const { control, handleSubmit, setValue } = form;

  return (
    <Box
      sx={{
        ...blockSx,
        flexGrow: 1,
        minWidth: {
          md: "550px",
        },
        maxHeight: {
          lg: "480px",
        },
      }}
    >
      <Box sx={boxHeaderSx}>
        <Typography
          component="h4"
          sx={{
            ...titleSx,
            fontSize: "20px",
          }}
        >
          Personal Information
        </Typography>
        <Button
          sx={{
            minWidth: "100px",
            minHeight: "45px",
            borderRadius: "10px",
            backgroundColor: "#0F2A71",
            padding: 0,
          }}
        >
          Update
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            md: "center",
          },
          gap: "10px",
          padding: "20px 40px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "500px",
          }}
        >
          <Box className="space-y-2 mx-auto">
            {textFieldItems.map((item) => (
              <TextField
                key={item.id}
                control={control}
                label={item.label}
                name={item.name}
                icon={item.icon}
                sx={textFieldSx}
                inputProps={{
                  sx: inputStyle,
                }}
              />
            ))}
          </Box>
        </Box>
        <Box className="flex flex-col items-center justify-center gap-2">
          <Box
            className="shadow-md"
            sx={{
              position: "relative",
              height: 200,
              width: 200,
              borderRadius: "9999999px",
              borderColor: "#00000040",
              border: "1px",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src={profile}
              alt="profile picture"
              fill
              className="object-cover"
            />
          </Box>
          <Typography
            sx={{
              fontWeight: 200,
              fontSize: "20px",
              fontFamily: "'PT Sans','sans-serif'",
            }}
          >
            Edit your photo
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button sx={buttonSx}>Upload</Button>
            <Button
              sx={{
                ...buttonSx,
                minWidth: "30px",
              }}
            >
              <EvaIcon name="trash-outline" width={16} height={16} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
