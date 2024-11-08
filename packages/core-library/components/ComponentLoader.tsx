/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, CircularProgress } from "@mui/material";

interface Props {
  disableMarginBottom?: boolean;
}

export const ComponentLoader: React.FC<Props> = ({
  disableMarginBottom,
}) => {
  return (
    <Box
      data-testid="component-loader"
      mb={disableMarginBottom ? 0 : 16}
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={60}/>
    </Box>
  );
};
