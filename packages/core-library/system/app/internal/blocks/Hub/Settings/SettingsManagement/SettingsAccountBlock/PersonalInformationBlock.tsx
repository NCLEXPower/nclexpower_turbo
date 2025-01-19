import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import { Button, EvaIcon, TextField } from "../../../../../../../../components";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema, AccountSchemaType } from "../validation";
import {
  buttonSx,
  inputIconStyle,
  inputStyle,
  textFieldSx,
} from "./personalInformationStyles";
import { CustomerTokenizeInformations } from "../../../../../../../../api/types";
import { useEffect } from "react";

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
    name: "firstname",
    icon: <EvaIcon name="person" fill="#3333334D" style={inputIconStyle} />,
  },
  {
    id: 2,
    label: "Middle Name",
    name: "middlename",
    icon: <EvaIcon name="person" fill="#3333334D" style={inputIconStyle} />,
  },
  {
    id: 3,
    label: "Last Name",
    name: "lastname",
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
  userInfo?: CustomerTokenizeInformations;
}

export const PersonalInformationBlock: React.FC<
  PersonalInformationBlockProps
> = ({ userInfo }) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(accountSchema),
    defaultValues: userInfo,
  });
  const { control, handleSubmit, setValue, reset } = form;

  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [userInfo, reset]);

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
          gap: "30px",
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
            {userInfo?.imgUrl && userInfo?.imgUrl !== "None" && (
              <Image
                src={userInfo.imgUrl}
                alt="profile picture"
                fill
                className="object-cover"
              />
            )}
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
