import React, { useMemo } from "react";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export type PlatformType = "facebook" | "instagram" | "twitter";

export type SocialMediaConfig = {
  platform: PlatformType;
  link: string;
};

const ICON_MAP: Record<PlatformType, JSX.Element> = {
  facebook: <FacebookIcon style={{ fontSize: "2rem" }} />,
  instagram: <InstagramIcon style={{ fontSize: "2rem" }} />,
  twitter: <TwitterIcon style={{ fontSize: "2rem" }} />,
};

export const useSocialMediaIcons = (configs: SocialMediaConfig[]) => {
  return useMemo(
    () =>
      configs.map(({ platform, link }) => (
        <Link
          key={platform}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
          }}
        >
          {ICON_MAP[platform]}
        </Link>
      )),
    [configs]
  );
};
