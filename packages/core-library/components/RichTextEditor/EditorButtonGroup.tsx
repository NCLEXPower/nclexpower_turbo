import { Box, IconButton } from "@mui/material";
import { MenuButtonType } from "../../types/editor-type";
import React from "react";

type EditorButtonGroupPropsType = {
  menus: MenuButtonType[];
};

export const EditorButtonGroup: React.FC<EditorButtonGroupPropsType> = ({
  menus,
}) => {
  return menus.map((button, index) => (
    <Box
      key={index}
      sx={{ backgroundColor: button.isActive ? "#0B225C" : "" }}
      borderRadius="5px"
    >
      <IconButton
        sx={{
          color: button.isActive ? "white" : "#333",
          height: "30px",
          fontSize: "12px",
        }}
        onClick={button.onClick}
        disabled={button.disabled}
      >
        {button.icon ?? button.label}
      </IconButton>
    </Box>
  ));
};
