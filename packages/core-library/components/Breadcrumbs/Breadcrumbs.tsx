import { useRouter } from "../../core";
import { Link } from "../Link";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Global, css } from "@emotion/react";

const BreadcrumbStyles = () => (
  <Global
    styles={css`
      .MuiBreadcrumbs-root a:focus {
        background-color: transparent !important;
      }
    `}
  />
);

const formatSegment = (segment: string): string =>
  segment
    .split("-")
    .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const BreadCrumbs: React.FC = () => {
  const { pathname } = useRouter();
  const pathSegments: string[] = pathname.split("/").filter(Boolean);

  if (
    pathSegments.length === 0 ||
    (pathSegments.length === 1 && pathSegments[0] === "hub")
  ) {
    return null;
  }

  return (
    <>
      <BreadcrumbStyles />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={
          <NavigateNextIcon
            fontSize="small"
            sx={{ color: "white", fontFamily: "PT Sans" }}
          />
        }
      >
        {pathSegments.map((segment, index) => {
          if (segment === "hub") return null;

          const route: string = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const label: string = formatSegment(segment);

          return index === pathSegments.length - 1 ? (
            <Typography
              key={route}
              color="white"
              sx={{ fontWeight: "bold", fontFamily: "PT Sans" }}
            >
              {label}
            </Typography>
          ) : (
            <Link
              key={route}
              href={route}
              sx={{
                textDecoration: "none",
                color: "white",
                fontFamily: "PT Sans",
              }}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};
