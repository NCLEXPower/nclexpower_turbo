import { EvaIcon } from "../EvaIcon";
import { Box, Typography } from "@mui/material";

const sharedStyles = {
  color: "#3B0086",
  fontFamily: '"PT Sans", sans-serif',
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "-0.14px",
};

export const Menu_Items = [
  {
    id: "view-profile",
    icon: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...sharedStyles,
        }}
      >
        <EvaIcon
          id="edit-icon"
          name="edit-2-outline"
          fill="#3B0086"
          width={20}
          height={20}
          ariaHidden
        />
      </Box>
    ),
    label: <Typography sx={sharedStyles}>View Profile</Typography>,
  },
  {
    id: "more-menu-1",
    icon: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...sharedStyles,
        }}
      >
        <EvaIcon
          id="more-icon"
          name="inbox-outline"
          fill="#3B0086"
          width={20}
          height={20}
          ariaHidden
        />
      </Box>
    ),
    label: <Typography sx={sharedStyles}>More Menu 1</Typography>,
  },
  {
    id: "more-menu-2",
    icon: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...sharedStyles,
        }}
      >
        <EvaIcon
          id="more-icon"
          name="inbox-outline"
          fill="#3B0086"
          width={20}
          height={20}
          ariaHidden
        />
      </Box>
    ),
    label: <Typography sx={sharedStyles}>More Menu 2</Typography>,
  },
  {
    id: "more-menu-3",
    icon: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...sharedStyles,
        }}
      >
        <EvaIcon
          id="more-icon"
          name="inbox-outline"
          fill="#3B0086"
          width={20}
          height={20}
          ariaHidden
        />
      </Box>
    ),
    label: <Typography sx={sharedStyles}>More Menu 3</Typography>,
  },
  {
    id: "log-out",
    icon: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...sharedStyles,
        }}
      >
        <EvaIcon
          id="logout-icon"
          name="log-out-outline"
          fill="#3B0086"
          width={20}
          height={20}
          ariaHidden
        />
      </Box>
    ),
    label: <Typography sx={sharedStyles}>Log Out</Typography>,
    testId: "logout-button",
  },
];
