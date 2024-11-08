import { Box } from "@mui/material";
import React from "react";

interface Props {
  stickOut?: boolean;
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  stickOut,
}) => {
  return (
    <Box
      component="main"
      id="mainContent"
      role="main"
      flex={1}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        flex={1}
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        my={{ xs: 0, sm: stickOut ? 12 : 0 }}
        boxShadow={{ xs: 0, sm: stickOut ? 8 : 0 }}
        sx={{
          width: (theme) => ({
            xs: "100%",
            sm: stickOut ? "660px" : "100%",
          }),
        }}
      >
        <Box
          flex={1}
          position="relative"
          display="flex"
          flexDirection="column"
          alignSelf="center"
          mr="auto"
          ml="auto"
          py={5}
          width="100%"
          height="100%"
          sx={{
            maxWidth: (theme) => ({
              xs: "100vw",
              md: stickOut ? "660px" : "1440px",
            }),
            px: (theme) => ({
              xs: "0px",
              md: "0px",
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
