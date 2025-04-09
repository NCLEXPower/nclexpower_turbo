import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { ArxeniusLogoBlue, ArxeniusLogoYellow } from "../../assets";
import { useRouter, useScroll } from "../../core";

interface Props {}

export const HeaderLogo: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { isScrolled } = useScroll();

  const NCLEXLogo =
    router.pathname === "/404" || isScrolled
      ? ArxeniusLogoBlue
      : ArxeniusLogoYellow;

  const clickHandle = () => {
    router.push("/");
  };

  return (
    <Box
      position="relative"
      sx={{ cursor: "pointer" }}
      height={70}
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
        <Image
          width={150}
          src={NCLEXLogo}
          alt="NCLEX Logo"
          onClick={clickHandle}
        />
      </Typography>
    </Box>
  );
};
