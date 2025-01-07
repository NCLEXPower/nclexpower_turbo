import { useScroll } from "../../core";
import { IconButton } from "../Button/IconButton";
import { useCookie } from "../../hooks/useCookie";
import { useWebHeaderStyles } from "../../hooks";
import { EvaIcon } from "../EvaIcon";

interface ScrollTopProps {
  forCookieConsent?: boolean;
}

const COOKIE_NAME = "user_cookie_consent";

export const ScrollTop: React.FC<ScrollTopProps> = ({
  forCookieConsent = false,
}) => {
  const { scrollTop } = useScroll();
  const [cookieConsent] = useCookie<string | null>(COOKIE_NAME);
  const { ToTopButtonSx } = useWebHeaderStyles();

  return (
    <IconButton
      onClick={() => scrollTop()}
      sx={{
        ...ToTopButtonSx,
        ...(!forCookieConsent &&
          !cookieConsent && {
            display: "none",
          }),
        ...(forCookieConsent && {
          position: "absolute",
          top: "-60px",
        }),
      }}
      className="fadeIn"
    >
      <EvaIcon name="arrow-upward-outline" />
    </IconButton>
  );
};
