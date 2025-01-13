import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { CmsMenu } from "../../types/menu";
import { CmsTenant } from "../../types/tenant";
import { useResolution } from "../../hooks";
import { useRouter } from "../../core";
import { HeaderLogoNavigation } from "./HeaderLogoNavigation";
import { HeaderLogo } from "./HeaderLogo";

interface Props {
  menu: CmsMenu | null;
  tenant: CmsTenant | null;
  useRawLogoUrl?: boolean;
  onLogout(): void; //prep code for logout
  pageKey?: string;
}

export const Header: React.FC<Props> = ({
  tenant,
  useRawLogoUrl,
  onLogout,
  menu,
  pageKey,
}) => {
  const router = useRouter();
  const { isMobile } = useResolution();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Box
        role="banner"
        component="header"
        width="100%"
        height={100}
        display="flex"
        justifyContent="center"
        zIndex={999}
        sx={{
          backgroundColor: "background.default",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "divider",
        }}
      >
        <Grid
          container
          px={8}
          width="100%"
          position="relative"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Grid
            item
            container
            alignItems="flex-center"
            spacing={6}
            height="auto"
          >
            <Grid item container alignItems="flex-end" xs>
              <Grid item>
                <HeaderLogoNavigation
                  href={""}
                  shouldNavigateToNewTab={!isAuthenticated}
                >
                  <HeaderLogo useRawLogoUrl={useRawLogoUrl} tenant={tenant} />
                </HeaderLogoNavigation>
              </Grid>
              <Grid item>
                <HeaderLogoNavigation
                  id="cobranding_logo_button"
                  href={""}
                  shouldNavigateToNewTab={!isAuthenticated}
                ></HeaderLogoNavigation>
              </Grid>
            </Grid>
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isMobile && <Grid item></Grid>}
          </Grid>
          <Grid item xs={12} position="relative"></Grid>
        </Grid>
      </Box>
    </>
  );
};
