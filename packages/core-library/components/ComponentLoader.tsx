/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, CircularProgress } from "@mui/material";

interface Props {
  disableMarginBottom?: boolean;
}

export const ComponentLoader: React.FC<Props> = ({ disableMarginBottom }) => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3a7e7e8ac81f784afb9b7504c02c181f9e6b33b5
    <div className="flex items-center justify-center w-100 min-h-screen">
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
    </div>
<<<<<<< HEAD
=======
    <Box
      data-testid="component-loader"
      mb={disableMarginBottom ? 0 : 16}
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={60} />
    </Box>
>>>>>>> 1408a5116e9031ef10fe9c60c2f1c8c0a22b0404
=======
>>>>>>> 3a7e7e8ac81f784afb9b7504c02c181f9e6b33b5
  );
};
