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
      ? `[${internal.firstname} ${internal.lastname}]`
      : "Unknown User";
  const email = internal?.email || "No email provided";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Avatar sx={{ width: 40, height: 40 }} /> {/* Smaller Avatar */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            whiteSpace: "nowrap",
            fontFamily: "PT Sans",
          }}
        >
          {userName}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "0.8rem", fontFamily: "PT Sans" }}
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
        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Popover>
    </Box>
  );
};
