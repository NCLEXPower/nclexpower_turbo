import { ChevronLeft } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useRouter } from "../../core";
import React from "react";

interface Props {
  label: string;
  link?: string | null;
  loading?: boolean;
  isNativeBack?: boolean;
  isInStickOutPage?: boolean;
  onClick?: () => void;
}

export const BackButton: React.FC<Props> = ({
  label,
  link,
  isNativeBack,
  isInStickOutPage,
  loading,
  onClick,
}) => {
  const router = useRouter();
  const isLoading = loading || router.loading;

  return (
    <Button
      variant="text"
      disabled={isLoading}
      href={link ?? undefined}
      onClick={handleClick}
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <ChevronLeft
        color={isLoading ? "disabled" : "primary"}
        sx={{ fontSize: isInStickOutPage ? 32 : 40, mb: 1 }}
      />
      <Typography
        color={isLoading ? "disabled" : "primary"}
        variant={isInStickOutPage ? "body2" : "h5"}
        fontWeight={isInStickOutPage ? "bold" : "normal"}
        component="span"
      >
        {label}
      </Typography>
    </Button>
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isNativeBack) return window.history.back();
    if (onClick) return onClick();
    if (link === null) return router.back();
    link && router.push(link);
  }
};
