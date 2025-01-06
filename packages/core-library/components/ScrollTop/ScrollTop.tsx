import { useScroll } from "../../core";
import NorthIcon from "@mui/icons-material/North";
import { IconButton, SxProps } from "@mui/material";
import { useCookie } from "../../hooks/useCookie";

const COOKIE_NAME = "user_cookie_consent";

export const ScrollTop = () => {
  const { scrollTop, isScrolled } = useScroll();
  const [cookieConsent] = useCookie<string | null>(COOKIE_NAME);
  console.log(cookieConsent);

  const ToTopButtonSx: SxProps = {
    position: "fixed",
    zIndex: 10000,
    bottom: cookieConsent ? "50px" : "120px",
    right: "50px",
    height: "45px",
    width: "45px",
    boxShadow: "2px",
    minWidth: "40px",
    bgcolor: "#f3c402",
    borderRadius: "50%",
    display: isScrolled ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      bgcolor: "#f3c402",
    },
  };

  return (
    <IconButton
      onClick={() => scrollTop()}
      sx={ToTopButtonSx}
      className="fadeIn"
    >
      <NorthIcon
        sx={{
          width: "25px",
          height: "25px",
        }}
        className="text-[#0f2a71]"
      />
    </IconButton>
  );
};
