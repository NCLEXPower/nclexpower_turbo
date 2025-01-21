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
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
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
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#FFF",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
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
        <MenuItem
          onClick={handleClose}
          sx={{
            color: "#3B0086",
            fontFamily: '"PT Sans", sans-serif',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.14px",
          }}
        >
          <PermIdentityIcon fontSize="small" sx={{ marginRight: 1 }} />
          View Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            color: "#3B0086",
            fontFamily: '"PT Sans", sans-serif',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.14px",
          }}
        >
          <ViewInArIcon fontSize="small" sx={{ marginRight: 1 }} />
          More Menu
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            color: "#3B0086",
            fontFamily: '"PT Sans", sans-serif',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.14px",
          }}
        >
          <ViewInArIcon fontSize="small" sx={{ marginRight: 1 }} />
          More Menu
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            color: "#3B0086",
            fontFamily: '"PT Sans", sans-serif',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.14px",
          }}
        >
          <ViewInArIcon fontSize="small" sx={{ marginRight: 1 }} />
          More Menu
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            color: "#3B0086",
            fontFamily: '"PT Sans", sans-serif',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.14px",
          }}
        >
          <LogoutIcon fontSize="small" sx={{ marginRight: 1 }} />
          Log Out
        </MenuItem>
      </Popover>
    </Box>
  );
};
