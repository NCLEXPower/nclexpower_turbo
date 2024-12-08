import { Box, Typography } from '@mui/material';
import { Button, EvaIcon } from 'core-library/components';
import { useAuthContext } from 'core-library/contexts';
import React from 'react';

export function SignOutButton() {
  const { logout } = useAuthContext();

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
    }}>
      <Button
        sx={{
          backgroundColor: 'transparent',
          color: "#0F2A71",
          boxShadow: 4,
          gap: 2,
          borderRadius: '10px',
          border: '1px solid #0F2A71/50%',
          ":hover": {
            backgroundColor: '#F3F3F3',
            color: '#0F2A71',
            transition: '0.15s'
          }
        }}
        onClick={logout}
      >
        <EvaIcon name="log-out-outline" fill="#0F2A71" width={20} height={20} />
        <Typography sx={{ fontFamily: "PT Sans", fontWeight: "bold" }}>Sign Out</Typography>
      </Button>
    </Box>
  )
}