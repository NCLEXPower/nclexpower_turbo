import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { NavigationType } from "../../types/navigation";
import { useState } from "react";
import { Button } from "../Button/Button";
import { config } from "../../config";
import { useRouter } from "../../core";
import { useResolution } from "../../hooks";
import { useAccessControl } from "../../hooks/useAccessControl";
import { getRoleName } from "../../core/utils/permission";
import { useSensitiveInformation } from "../../hooks/useSensitiveInformation";
import { Menu_Items } from "../UserProfile/Menu-Items";
import { EvaIcon } from "../EvaIcon";

interface Props {
  label: string;
  icon?: React.ReactNode;
  accountItem: NavigationType[];
  onLogout?: () => void;
}

export const AccountMenu: React.FC<Props> = ({
  icon,
  label,
  accountItem,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? "simple-popper" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleParentClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const router = useRouter();
  const appName = config.value.BASEAPP;
  const isInHub = router.pathname?.startsWith("/hub") || false;
  const isInWebcHub = isInHub && appName.includes("c");

  const { isMobile } = useResolution();

  const { internal } = useSensitiveInformation();
  const { accessLevel } = useAccessControl();
  const roleName = getRoleName(accessLevel ?? -1);

  const userName =
    internal?.firstname && internal?.lastname
      ? `${internal.firstname} ${internal.lastname}`
      : "Unknown User";

  return (
    <Box>
      <Button
        sx={{ gap: 2 }}
        aria-describedby={id}
        onClick={handleClick}
        variant={isInWebcHub ? "text" : "outlined"}
        data-testid="account-menu-button"
      >
        {icon}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: "12px",
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
              fontSize: "8.5px",
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

        {openMenu ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #EBEBEB",
              borderRadius: "50%",
            }}
          >
            <EvaIcon
              id="more-vertical-icon"
              name="more-vertical"
              fill="#3B0086"
              width={20}
              height={20}
              ariaHidden
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #3B0086",
              borderRadius: "50%",
            }}
          >
            <EvaIcon
              id="more-vertical-icon"
              name="more-vertical"
              fill="#3B0086"
              width={20}
              height={20}
              ariaHidden
            />
          </Box>
        )}
      </Button>
      <Popper
        sx={{ zIndex: 1500, width: "150px", textAlign: "center" }}
        id={id}
        open={openMenu}
        anchorEl={anchorEl}
      >
        <Box
          sx={{
            boxShadow: 1,
            zIndex: "1500",
            borderRadius: "5px",
            marginTop: 1,
          }}
        >
          {accountItem.length > 0 &&
            accountItem.map((item, index) => (
              <div key={index}>
                <Button
                  fullWidth
                  sx={
                    isInWebcHub
                      ? {
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "PT Sans",
                          fontSize: "16px",
                          color: "#00173F",
                          backgroundColor: "#DBDFEA",
                          "&:hover": {
                            backgroundColor: "#DBDFEA",
                          },
                        }
                      : {
                          display: "flex",
                          justifyContent: "space-between",
                        }
                  }
                  onClick={() => handleParentClick(index)}
                >
                  {item.icon}
                  <Typography variant="button"> {item.label}</Typography>
                </Button>
                {expandedIndex === index &&
                  item.subItem &&
                  item.subItem.length > 0 &&
                  item.subItem.map((subMenu, subIndex) => (
                    <Button
                      key={subIndex}
                      fullWidth
                      sx={
                        isInWebcHub
                          ? {
                              display: "flex",
                              justifyContent: "space-between",
                              fontFamily: "PT Sans",
                              paddingLeft: 4,
                              fontSize: "16px",
                              color: "#00173F",
                              backgroundColor: "#DBDFEA",
                              "&:hover": {
                                backgroundColor: "#DBDFEA",
                              },
                            }
                          : {
                              display: "flex",
                              justifyContent: "space-between",
                              paddingLeft: 4,
                            }
                      }
                    >
                      {subMenu.icon}
                      <Typography variant="button">{subMenu.label}</Typography>
                    </Button>
                  ))}
              </div>
            ))}

          {Menu_Items.map((item) => (
            <div key={item.id}>
              <Button
                fullWidth
                sx={
                  isInWebcHub
                    ? {
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "PT Sans",
                        paddingLeft: 4,
                        fontSize: "16px",
                        color: "#00173F",
                        backgroundColor: "#DBDFEA",
                        "&:hover": {
                          backgroundColor: "#DBDFEA",
                        },
                      }
                    : {
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: 4,
                      }
                }
              >
                {item.icon}
                <Typography variant="button">{item.label}</Typography>
              </Button>
            </div>
          ))}
          <Button
            onClick={onLogout}
            fullWidth
            sx={
              isInWebcHub
                ? {
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "PT Sans",
                    fontSize: "16px",
                    color: "#00173F",
                    alignItems: "center",
                    backgroundColor: "#DBDFEA",
                    "&:hover": {
                      backgroundColor: "#DBDFEA",
                    },
                  }
                : {
                    display: "flex",
                    justifyContent: "space-between",
                  }
            }
            data-testid="logout-button"
          >
            <LogoutIcon fontSize="small" />
            <Typography variant="button"> Logout</Typography>
          </Button>
        </Box>
      </Popper>
    </Box>
  );
};
