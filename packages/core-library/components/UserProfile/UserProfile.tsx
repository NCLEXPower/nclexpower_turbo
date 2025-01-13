import { useAccessControl } from "../../hooks/useAccessControl";
import { getRoleName } from "../../core/utils/permission";
import { useSensitiveInformation } from "../../hooks/useSensitiveInformation";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface Props {
  userName?: string;
  email?: string;
  role?: string;
}

export const UserProfile: React.FC<Props> = () => {
  const { internal } = useSensitiveInformation();
  const { accessLevel } = useAccessControl();
  const roleName = getRoleName(accessLevel ?? -1);

  const userName =
    internal?.firstname && internal?.lastname
      ? `${internal.firstname} ${internal.lastname}`
      : "Unknown User";
  const email = internal?.email || "No email provided";

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
        <Typography variant="h6">{userName}</Typography>
        <Typography variant="body2">
          {roleName || "No role assigned"}
        </Typography>
      </Box>
      <IconButton size="small" sx={{ marginLeft: "auto" }}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};
