import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "../../core";
import { MenuItems } from "../../api/types";
import { IconComponent } from "../GenericDrawerLayout/utils/icon-component";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";

export interface SidebarButtonProps extends Partial<WebSidebarStylesType> {
  navigation: MenuItems;
  pathname: string;
  isAuthenticated: boolean;
  isDrawerOpen: boolean;
  onNavigate: () => void;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  navigation,
  pathname,
  isAuthenticated,
  listStyles,
  isDrawerOpen,
  onNavigate,
}) => {
  const router = useRouter();
  const path = router?.pathname;
  const isActive = navigation.path === path;
  const minimizedIndicator = isAuthenticated && isActive && !isDrawerOpen;

  const handleNavigate = () => {
    router.push({
      pathname: navigation.path ?? "/",
    });
    onNavigate();
  };

  return (
    <Box
      width="100%"
      whiteSpace="nowrap"
      sx={isAuthenticated ? listStyles?.paddingSx : null}
    >
      <Box
        overflow="hidden"
        borderRadius={3}
        sx={{
          ...listStyles?.hovericonSx,
          ...(minimizedIndicator && {
            backgroundImage: "linear-gradient(90deg, #0F2A71 0%, #181E2F 100%)",
            borderRadius: "8px",
          }),
        }}
      >
        <ListItemButton
          disabled={isActive}
          component="a"
          onClick={handleNavigate}
          sx={{
            whiteSpace: "nowrap",
            padding: "8px 12px",
            ...(isAuthenticated && isActive
              ? listStyles?.activeSx || {
                  color: "#051e34 !important",
                  fontWeight: "bold !important",
                  opacity: "1 !important",
                  textDecoration: "underline !important",
                  ".MuiSvgIcon-root": {
                    color: "#051e34 !important",
                  },
                }
              : {}),
            "&:focus": {
              backgroundColor: "transparent !important",
            },
          }}
        >
          <ListItemIcon sx={isAuthenticated ? listStyles?.listItemIconSx : {}}>
            <span
              className={minimizedIndicator ? "text-white" : "text-[#0F2A71]"}
            >
              {IconComponent(navigation.icon, false)}
            </span>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" fontSize={13}>
              {navigation.label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Box>
    </Box>
  );
};
