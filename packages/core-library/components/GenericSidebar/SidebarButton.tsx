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
  onNavigate: () => void;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  navigation,
  pathname,
  isAuthenticated,
  listStyles,
  onNavigate,
}) => {
  const router = useRouter();
  const path = router?.pathname;

  const isActive = navigation.path === path;

  if (navigation.label === "Dashboard") {
    console.log(isAuthenticated);
    console.log(navigation.path);
    console.log(isActive);
    console.log(listStyles);
  }

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
      <Box overflow="hidden" borderRadius={3} sx={listStyles?.hovericonSx}>
        <ListItemButton
          disabled={isActive}
          component="a"
          onClick={handleNavigate}
          sx={{
            whiteSpace: "nowrap",
            padding: "8px 12px",
            ...(isAuthenticated && isActive
              ? listStyles?.activeSx || {
                  color: "#F4C501 !important",
                  fontWeight: "bold !important",
                  opacity: "1 !important",
                  textDecoration: "underline !important",
                  ".MuiSvgIcon-root": {
                    color: "#F4C501 !important",
                  },
                }
              : {}),
            "&:focus": {
              backgroundColor: "transparent !important",
            },
          }}
        >
          <ListItemIcon sx={isAuthenticated ? listStyles?.listItemIconSx : {}}>
            {IconComponent(navigation.icon, false)}
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
