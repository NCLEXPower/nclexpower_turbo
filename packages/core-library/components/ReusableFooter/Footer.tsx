/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import Image from "next/image";
import { NCLEXYellowLogo } from "../../assets";
import { FooterProps } from "../../types/global";
import { useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useIsDesignVisible } from "../../hooks";
import { useAuthContext } from "../../contexts";

export const Footer: React.FC<FooterProps> = (props) => {
  const yearData = new Date().getFullYear();
  const memoYear = useMemo(() => yearData, [yearData]);
  const { isAuthenticated } = useAuthContext();
  const isHidden = useIsDesignVisible();

  return (
    isHidden || !isAuthenticated && (
      <Box
        width={1}
        sx={{
          color: "white",
          backgroundColor: "#040814",
          fontFamily: "PT Sans",
          flexGrow: 1,
          paddingX: {
            xs: "1.5rem",
            sm: "6rem",
            md: "5rem",
            lg: "10rem",
            xl: "15rem",
          },
          paddingY: { xs: "2rem", md: "4rem" },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 2, lg: 4 }}
          columns={{ xs: 2, sm: 2, md: 12 }}
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {props.list.length > 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                width: "25%",
                gap: 5,
                marginBottom: { xs: 3, md: 0 },
              }}
            >
              <Image
                style={{ width: 150 }}
                src={NCLEXYellowLogo}
                alt="NCLEXLogo"
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "start",
              width: "100%",
              gap: { xs: 2, md: 4 },
            }}
          >
            <Grid
              item
              xs={12}
              sm={7}
              md={6}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "start" },
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              <Typography
                sx={{
                  marginBottom: { xs: 5, sm: 6, md: 10 },
                  fontSize: { xs: "14px", sm: "15px", md: "16px", lg: "17px" },
                }}
              >
                {props.info.address}
              </Typography>
              <Grid
                sx={{
                  marginBottom: { xs: "1px", md: 6 },
                  gap: 3,
                  width: "100%",
                  display: "flex",
                  justifyContent: { xs: "space-evenly", sm: "space-between" },
                  flexDirection: { xs: "row", sm: "column" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    width: "fit-content",
                  }}
                >
                  {props.info.phone}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    width: "fit-content",
                  }}
                >
                  {props.info.website}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "start",
                marginBottom: { xs: "0rem", md: 2 },
              }}
            >
              {props.list.length > 0 &&
                props.list.map((list, index) => (
                  <div key={index}>
                    <ul>
                      {props.list.length > 0 &&
                        list.items.map((item, index) => (
                          <li key={index}>
                            <a
                              href={item.path}
                              className="text-white "
                              style={{
                                fontSize: `clamp(0.75rem, 1vw + 0.3rem, 1.1rem)`,
                              }}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <div
          className="text-xs "
          style={{
            fontSize: `clamp(0.5rem, 1vw + 0.2rem, 0.8rem)`,
            marginTop: 10,
          }}
        >
          <p className="w-full text-center pt-4">
            NCLEX-RN® and NCLEX-PN® are registered trademarks of the National
            Council of State Boards of Nursing, Inc (NCSBN®)
          </p>
          <p className="w-full text-center pt-4">
            © {memoYear} NCLEXPower ™. All rights reserved.
          </p>
        </div>
      </Box>
    )
  );
};
