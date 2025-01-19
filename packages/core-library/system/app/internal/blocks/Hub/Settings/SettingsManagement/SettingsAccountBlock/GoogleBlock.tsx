import { Box, ThemeProvider, Typography } from "@mui/material";
import { blockSx } from "../SettingsStyles";
import Link from "next/link";
import Image from "next/image";
import { google } from "../../../../../../../../assets";

export const GoogleBlock = () => {
  return (
    <Box
      className="space-y-5"
      sx={{
        ...blockSx,
        padding: "20px",
        "@media (min-width: 1200px)": {
          flexGrow: 0,
          width: "410px",
          height: "232px",
        },
      }}
    >
      <Box className="flex items-center justify-between">
        <Image src={google} alt="google logo" height={42} width={119} />
        <Typography
          className="flex items-center justify-center"
          sx={{
            width: "100px",
            height: "37px",
            backgroundColor: "#C5ECD2",
            color: "#12B76A",
            borderRadius: "10px",
            fontFamily: "'PT Sans','sans-serif'",
            fontWeight: 700,
          }}
        >
          Connected
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: "'PT Sans','sans-serif'",
          fontWeight: 700,
          fontSize: "20px",
        }}
      >
        Google
      </Typography>
      <Typography
        component="p"
        sx={{
          fontFamily: "'PT Sans','sans-serif'",
          fontWeight: 400,
          fontSize: "20px",
          color: "#333333B2",
        }}
      >
        Use Google to sign in to your account.{" "}
        <Link href="#">Click here to learn more</Link>
      </Typography>
    </Box>
  );
};
