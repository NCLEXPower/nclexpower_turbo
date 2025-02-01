import { useAccessControl } from "../../hooks/useAccessControl";
import { getRoleName } from "../../core/utils/permission";
import { useSensitiveInformation } from "../../hooks/useSensitiveInformation";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Menu_Items } from "./Menu-Items";

interface Props {
  userName?: string;
  email?: string;
  role?: string;
  onLogout?: () => void;
}

export const UserProfile: React.FC<Props> = ({ onLogout }) => {
  const { internal } = useSensitiveInformation();
  const { accessLevel } = useAccessControl();
  const roleName = getRoleName(accessLevel ?? -1);

  const userName =
    internal?.firstname && internal?.lastname
      ? `${internal.firstname} ${internal.lastname}`
      : "Unknown User";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (id: string) => {
    if (id === "log-out" && onLogout) {
      onLogout();
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        padding: 4,
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#FFF",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
      data-testid="account-menu-button"
    >
      <Avatar sx={{ width: 40, height: 40 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            whiteSpace: "nowrap",
            fontFamily: "PT Sans",
            fontStyle: "normal",
            color: "#3B0086",
            lineHeight: "13px",
            letterSpacing: "0.5px",
          }}
        >
          {userName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: "10px",
            whiteSpace: "nowrap",
            fontFamily: "PT Sans",
            fontStyle: "normal",
            color: "#7C7C7C",
            lineHeight: "13px",
            letterSpacing: "0.5px",
          }}
        >
          {roleName || "No role assigned"}
        </Typography>
      </Box>
      <IconButton
        size="small"
        sx={{ marginLeft: "auto" }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {Menu_Items.map((item) => (
          <MenuItem
            key={item.id}
            data-testid={item.testId || undefined}
            onClick={() => handleMenuItemClick(item.id)}
          >
            {item.icon}
            <Box sx={{ marginLeft: 1 }}>{item.label}</Box>
          </MenuItem>
        ))}
      </Popover>
    </Box>
  );
};
