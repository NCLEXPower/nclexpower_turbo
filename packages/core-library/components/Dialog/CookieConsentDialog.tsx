import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useCookie } from "../../hooks/useCookie";

const COOKIE_NAME = "user_cookie_consent";

export const CookieConsentDialog: React.FC = () => {
  const [cookieConsent, setCookieConsent, clearCookieConsent] = useCookie<
    string | null
  >(COOKIE_NAME);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <Dialog open={isDialogOpen} onClose={handleDeclineCookie}>
      <DialogTitle>Cookies Consent</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We use cookies to enhance your experience, analyze site traffic, and
          serve personalized content. By accepting, you consent to our cookie
          policy. You can decline if you prefer limited functionality.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDeclineCookie}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAcceptCookie}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
