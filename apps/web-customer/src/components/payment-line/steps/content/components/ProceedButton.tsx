import { Box } from "@mui/material"
import { Button, EvaIcon } from "core-library/components"
import React from "react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  btnTitle?: string;
}

export const ProceedButton: React.FC<Props> = ({ onClick, disabled, btnTitle = "Proceed" }) => {
  return (
    <Box className="w-full flex items-center justify-end my-4">
      <Button
        onClick={onClick}
        disabled={disabled}
        data-testid="proceed-button"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          color: "#fff",
          boxShadow: 4,
          gap: 2,
          borderRadius: '10px',
          paddingX: 12,
          backgroundColor: "#0F2A71",
          background: "var(--linear-main-blue, linear-gradient(90deg, #0F2A71 0%, #181E2F 100%))",
        }}>
        {btnTitle}
        <EvaIcon name="arrow-ios-forward-outline" fill="#f3f3f3" width={20} height={20} />
      </Button>
    </Box>
  )
}