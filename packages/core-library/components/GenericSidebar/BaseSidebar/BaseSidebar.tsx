import React from "react";
import { ImageCollectionType } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/ImageManagement/types/types";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Typography,
} from "@mui/material";

import { useRouter } from "../../../core";
import { IconComponent } from "../../GenericDrawerLayout/utils/icon-component";
import Image from "next/image";
import Divider from "../../Divider/Divider";

interface Props {
  logo: string;
  menuList: ImageCollectionType[];
  selectedMenu: number;
  setSelectedMenu: (value: number) => void;
  navigate?: boolean;
  sx?: SxProps;
}

export const BaseSidebar: React.FC<Props> = ({
  logo,
  menuList,
  selectedMenu,
  setSelectedMenu,
  navigate,
  sx,
}) => {
  const router = useRouter();
  const path = router?.pathname;

  const handleNavigate = (item: ImageCollectionType) => {
    {
      if (navigate) {
        setSelectedMenu(item.id);
        router.push({
          pathname: item.path ?? "/",
        });
      } else {
        setSelectedMenu(item.id);
      }
    }
  };
  return (
    <Box sx={sx}>
      <Box
        sx={{
          bgcolor: "#D9D9D9",
          height: "100%",
          paddingY: "30px",
          borderRadius: "10px",
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image style={{ width: 150 }} src={logo} alt={logo} />
        <Divider color="black" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "15px",
            gap: "5px",
          }}
        >
          {menuList &&
            menuList.map((item: ImageCollectionType, index: number) => (
              <ListItemButton
                key={index}
                disabled={navigate && item.path === path}
                component="a"
                onClick={() => handleNavigate(item)}
                sx={{
                  width: "100%",
                  bgcolor: selectedMenu == item.id ? "#fcb900" : "transparent",
                  borderRadius: "10px",
                  "&:hover": {
                    bgcolor: "#d69d00",
                  },
                }}
              >
                <ListItemIcon>{IconComponent(item.icon, false)}</ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" fontSize={13}>
                    {item.label}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
