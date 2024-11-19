import React from "react";
import { Button, Card } from "core-library/components";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  nextStep({}): void;
  previousStep(): void;
  values: {};
}

export const BasicInformation: React.FC<Props> = ({ nextStep }) => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={8}
        p={8}
      >
        <Stack sx={{ width: "100%" }}>
          <Card sx={{ mt: 5, p: 5 }}>
            <Button variant="text" size="small" sx={{ mb: 5 }}>
              Sign out
            </Button>
            <Card sx={{ p: 5 }}>
              <Typography variant="button">Basic Information</Typography>
            </Card>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};
