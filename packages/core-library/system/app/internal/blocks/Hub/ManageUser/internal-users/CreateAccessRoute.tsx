import { useState } from "react";
import { MenuItems } from "../../../../../../../api/types";
import { Button, EvaIcon } from "../../../../../../../components";
import { Box, Typography } from "@mui/material";

interface CreateAccessRouteProps {
  menu: MenuItems;
}

export const CreateAccessRoute: React.FC<CreateAccessRouteProps> = ({
  menu,
}) => {
  const [expandList, setExpandList] = useState<boolean>(true);

  const toggleList = () => setExpandList((prev) => !prev);
  return (
    <li>
      {!menu.parentId ? (
        <div className="mb-2">
          <Button
            disabled={!menu.children.length}
            onClick={toggleList}
            variant="text"
            sx={{
              minWidth: "fit-content",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                color: "#3B0086",
                fontWeight: 700,
                fontSize: "clamp(14px,4vw,18px)",
              }}
            >
              [ {menu.label} ]{" "}
            </Typography>
            {!!menu.children.length && (
              <Box
                sx={{
                  transform: expandList ? "rotate(0)" : "rotate(-180deg)",
                  transition: "0.2s",
                }}
              >
                <EvaIcon name="arrow-ios-downward-outline" fill="#3B0086" />
              </Box>
            )}
          </Button>
          {menu.path && (
            <div className="bg-white min-h-10 p-2 rounded-[5px] flex items-center">
              <Typography
                sx={{
                  color: "#3B0086",
                  fontSize: "14px",
                  paddingLeft: "20px",
                  padding: "5px",
                  backgroundColor: "#FFF",
                  wordBreak: "break-all",
                }}
              >
                [ {menu.path} ]
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white ml-10 min-h-10 p-2 rounded-[5px]">
          <Typography
            sx={{
              color: "#3B0086",
              fontSize: "14px",
              paddingLeft: "20px",
              wordBreak: "break-all",
            }}
          >
            [ {menu.path} ]
          </Typography>
        </div>
      )}
      {expandList && (
        <Box component="ul" className="space-y-2">
          {menu.children &&
            !!menu.children.length &&
            menu.children.map((child) => (
              <CreateAccessRoute key={child.id} menu={child} />
            ))}
        </Box>
      )}
    </li>
  );
};
