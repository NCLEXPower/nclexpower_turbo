import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { NCLEXBlueLogo, NCLEXYellowLogo } from "../../assets";
import { useRouter, useScroll } from "../../core";
import { useResolution } from "../../hooks";

interface Props { }

export const HeaderLogo: React.FC<Props> = ({ }) => {
  const router = useRouter();
  const { isScrolled } = useScroll();
  const { isMobile } = useResolution();

  const NCLEXLogo =
    router.pathname === "/404" || isScrolled ? NCLEXBlueLogo : NCLEXYellowLogo;

  const clickHandle = () => {
    router.push('/')
  }

  return (
    <Box
      position="relative"
      sx={{ cursor: "pointer" }}
      display="flex"
      alignItems="center"
      role="button"
      data-testid="header-logo"
    >
      <Typography
        variant="h3"
        component="span"
        fontWeight="bold"
        color="primary"
        noWrap
        fontSize={(theme) => ({
          xs: theme.typography.h6.fontSize,
          sm: theme.typography.h4.fontSize,
          md: theme.typography.h3.fontSize,
        })}
      >
        <Box sx={{ width: isMobile ? "clamp(1px,34.884vw,400px) !important" : "clamp(1px,10.417vw,400px)" }}>
          <Image src={NCLEXLogo} alt="NCLEX Logo" onClick={clickHandle} />
        </Box>

      </Typography>
    </Box>
  );
};
