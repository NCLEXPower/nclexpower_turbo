import React, { useEffect, useState } from "react";
import { Box, SxProps } from "@mui/material";
import { useCookie } from "../../hooks/useCookie";
import { useScroll } from "core-library";
import { useRouter } from "next/router";
import { useResolution } from "../../hooks";
import { Button } from "../Button/Button";
import { ScrollTopIcon } from "../ScrollTop/ScrollTop";

const COOKIE_NAME = "user_cookie_consent";

const buttonSx: SxProps = {
  fontWeight: 600,
  fontFamily: "PT Sans, sans-serif",
  fontSize: "1rem",
  minHeight: "unset",
  height: "2.5rem",
  padding: "0 16px",
  borderRadius: "15px",
  textWrap: "nowrap",
};

export const CookieConsentDialog: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useCookie<string | null>(
    COOKIE_NAME
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isScrolled } = useScroll();
  const { isMobile } = useResolution();
  const router = useRouter();
  const isScrolledOrRoute = router.pathname === "/404" || isScrolled;

  useEffect(() => {
    if (!cookieConsent) {
      setIsDialogOpen(true);
    }
  }, [cookieConsent]);

  const handleAcceptCookie = () => {
    setCookieConsent("accepted", {
      path: "/",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    setIsDialogOpen(false);
  };

  const handleDeclineCookie = () => {
    setCookieConsent("declined", {
      path: "/",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    setIsDialogOpen(false);
    //decide either we should direct user to an error page or not.
    //if user can still proceed with the application then do not initialize tracking scripts or analytics.
  };

  return (
    <>
      {isDialogOpen && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            bottom: "0px",
            zIndex: "9999999",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ScrollTopIcon />
          <Box
            sx={{
              bgcolor: !isScrolledOrRoute ? "white" : "rgba(0, 0, 0, 1)",
              color: isScrolledOrRoute ? "white" : "black",
              padding: "1rem 2rem",
              minHeight: "100px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "center",
                alignItems: isMobile ? "end" : "center",
                gap: "1rem",
              }}
            >
              <div>
                <span className="font-bold">We Value Your Privacy</span>
                <p className="text-sm" style={{ margin: "0" }}>
                  We use cookies to enhance your experience, analyze site
                  traffic, and serve personalized content. By accepting, you
                  consent to our cookie policy. You can decline if you prefer
                  limited functionality.
                </p>
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    ...buttonSx,
                    color: isScrolledOrRoute ? "white" : "black",
                    borderColor: isScrolledOrRoute ? "white" : "black",
                  }}
                  onClick={handleDeclineCookie}
                >
                  Decline
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ...buttonSx,
                    color: !isScrolledOrRoute ? "white" : "black",
                    bgcolor: !isScrolledOrRoute ? "#0f2a71" : "#f3c402",
                    "&:hover": {
                      backgroundColor: !isScrolledOrRoute
                        ? "#071c51"
                        : "#cca406",
                    },
                    ":disabled": {
                      color: !isScrolledOrRoute ? "#071c51" : "#cca406",
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleAcceptCookie}
                >
                  Accept All
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
