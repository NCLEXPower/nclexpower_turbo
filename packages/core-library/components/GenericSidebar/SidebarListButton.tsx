import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SidebarButton } from "./SidebarButton";
import { useRouter } from "../../core";
import { MenuItems } from "../../api/types";
import { IconComponent } from "../GenericDrawerLayout/utils/icon-component";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
export interface SidebarListButtonProps extends Partial<WebSidebarStylesType> {
  navigation: MenuItems;
  pathname: string;
  isAuthenticated: boolean;
  showDivider?: boolean;
  isDrawerOpen: boolean;
  onNavigate: () => void;
  setDrawerOpen: () => void;
}

export const SidebarListButton: React.FC<SidebarListButtonProps> = ({
  navigation,
  pathname,
  isAuthenticated,
  listStyles,
  showDivider = true,
  isDrawerOpen,
  onNavigate,
  setDrawerOpen,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const path = router?.pathname;
  const navPaths = navigation.children.map((c) => c.path);
  const isActive = !!navPaths.find((p) => path?.startsWith(p));

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isDrawerOpen && !isActive) {
      setOpen(false);
    }
  }, [isDrawerOpen, isActive]);

  const handleCollapseButton = () => {
    if (!isDrawerOpen && open === false) {
      setDrawerOpen();
    }
    setOpen((prev) => !prev);
  };

  return (
    <Box width="100%">
      <Box sx={isAuthenticated && open ? listStyles?.sidebarSx : {}}>
        <Box sx={isAuthenticated && open ? listStyles?.paddingSx : {}}>
          {!navigation.hide && (
            <Box overflow="hidden" borderRadius={3}>
              <ListItemButton
                disabled={navigation.path === path}
                onClick={handleCollapseButton}
                sx={{
                  padding: "8px 12px",
                }}
              >
                <ListItemIcon sx={{ color: "red" }}>
                  {IconComponent(navigation.icon, open)}
                </ListItemIcon>

                <ListItemText>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={13}
                    flexGrow={1}
                    whiteSpace="nowrap"
                  >
                    {navigation.label}
                  </Typography>
                </ListItemText>
                <KeyboardArrowDownIcon
                  fontSize="small"
                  sx={{
                    ...listStyles?.opacitySx,
                    mr: -1,
                    opacity: open ? 1 : 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
            </Box>
          )}
        </Box>
        {open &&
          isDrawerOpen &&
          navigation.children &&
          navigation.children.length > 0 &&
          !navigation.hide &&
          navigation.children.map((childNav, idx) => (
            <SidebarButton
              navigation={childNav}
              key={idx}
              pathname={pathname}
              isAuthenticated={isAuthenticated}
              listStyles={listStyles}
              isDrawerOpen={isDrawerOpen}
              onNavigate={onNavigate}
            />
          ))}
        {open && showDivider && <Divider sx={listStyles?.dividerSx} />}
      </Box>
    </Box>
  );
};
