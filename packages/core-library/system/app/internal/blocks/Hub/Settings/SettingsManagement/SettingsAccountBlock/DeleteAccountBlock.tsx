import { Box, Typography } from "@mui/material";
import { blockSx } from "../SettingsStyles";
import { Button, EvaIcon } from "../../../../../../../../components";

export const DeleteAccountBlock = () => {
  return (
    <Box
      className="space-y-5"
      sx={{
        ...blockSx,
        padding: "20px",
        "@media (min-width: 1200px)": {
          flexGrow: 1,
          width: "410px",
          height: "232px",
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'PT Sans','sans-serif'",
          fontWeight: 700,
          fontSize: "20px",
          color: "#FF0000",
        }}
      >
        Delete Account
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
        Once you delete your account, there is no going back. Please be certain
      </Typography>
      <Button
        sx={{
          minHeight: "40px",
          minWidth: "112px",
          borderRadius: "10px",
          backgroundColor: "#FF0000",
          gap: "8px",
          fontFamily: "'PT Sans','sans-serif'",
          fontWeight: 700,
          fontSize: "20px",
          boxShadow: "none",
        }}
      >
        <EvaIcon name="alert-triangle-outline" fill="#FFF" /> Delete
      </Button>
    </Box>
  );
};
