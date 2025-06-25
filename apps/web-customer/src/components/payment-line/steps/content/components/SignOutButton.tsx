import { Box, Typography } from "@mui/material";
import { useRouter } from "core-library";
import { Button, EvaIcon } from "core-library/components";
import { useAuthContext } from "core-library/contexts";
import { useActiveSteps } from "core-library/hooks";
import React from "react";

export function SignOutButton() {
  const router = useRouter();
  const { logout } = useAuthContext();
  const { reset } = useActiveSteps(0);

  const handleLogout = async () => {
    await logout();
    reset();
    await router.push((router) => router.login);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Button
        sx={{
          backgroundColor: "transparent",
          color: "#0F2A71",
          boxShadow: 4,
          gap: 2,
          borderRadius: "10px",
          border: "1px solid #0F2A71/50%",
          ":hover": {
            backgroundColor: "#F3F3F3",
            color: "#0F2A71",
            transition: "0.15s",
          },
        }}
        onClick={handleLogout}
      >
        <EvaIcon name="log-out-outline" fill="#0F2A71" width={20} height={20} />
        <Typography sx={{ fontFamily: "PT Sans", fontWeight: "bold" }}>
          Sign Out
        </Typography>
      </Button>
    </Box>
  );
}
