import React from "react";
import { AnimatedBoxSkeleton } from "../../../../../../../../../../../../components";
import { Box, Card, Grid } from "@mui/material";

const SkeletonBox: React.FC<{
  height: number;
  width?: string | number;
  light?: string;
  sx?: object;
}> = ({ height, width = "100%", light = "true", sx = {} }) => (
  <Box width={width} sx={sx}>
    <AnimatedBoxSkeleton height={height} light={light} />
  </Box>
);

const SkeletonGridItem: React.FC<{
  height: number;
  light?: string;
  xs?: number;
}> = ({ height, light = "true", xs = 6 }) => (
  <Grid item xs={xs}>
    <AnimatedBoxSkeleton height={height} light={light} />
  </Grid>
);

const gridItems = [
  { width: "150px", skeletonWidth: "100%", skeletonHeight: 325 },
  { width: "100px", skeletonWidth: "100%", skeletonHeight: 325 },
];

export const QuestionTypeSelectionLoader: React.FC = () => (
  <Grid
    container
    sx={{ mt: 3 }}
    rowSpacing={1}
    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
  >
    {[1, 2].map((_, idx) => (
      <SkeletonGridItem key={idx} height={135} />
    ))}
  </Grid>
);

export const CreateQuestionLoader: React.FC = () => (
  <Grid>
    <Box
      marginTop="10px"
      paddingX="8px"
      height="80px"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <SkeletonBox width="155px" height={50} />
      <Box
        width="225px"
        gap="5px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SkeletonBox height={25} />
        <SkeletonBox width="85px" height={25} />
      </Box>
      <SkeletonBox width="185px" height={20} />
    </Box>
    <Box height="80px" display="flex" justifyContent="end" alignItems="center">
      {[1, 2].map((_, idx) => (
        <SkeletonBox key={idx} width="155px" height={50} />
      ))}
    </Box>
    <SkeletonBox height={350} sx={{ marginTop: "10px" }} />
    <SkeletonBox
      width="155px"
      height={50}
      sx={{ float: "right", marginTop: "10px" }}
    />
  </Grid>
);

export const SummaryAccordionLoader: React.FC = () => (
  <Grid>
    <Box
      marginTop="10px"
      paddingX="8px"
      height="80px"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <SkeletonBox width="155px" height={50} />
      <Box
        width="225px"
        gap="5px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SkeletonBox height={25} />
        <SkeletonBox width="85px" height={25} />
        <SkeletonBox width="650px" height={20} sx={{ marginTop: "16px" }} />
      </Box>
    </Box>
    <SkeletonBox height={350} sx={{ marginTop: "24px" }} />
    <SkeletonBox
      width="155px"
      height={50}
      sx={{ float: "right", marginTop: "10px" }}
    />
  </Grid>
);

export const CasenameSelectionLoader: React.FC = () => (
  <Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Card
        sx={{
          padding: "25px",
          maxWidth: 600,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box width="100%" display="flex" justifyContent="center">
          <SkeletonBox width="255px" height={25} />
        </Box>
        <SkeletonBox height={100} />
        <SkeletonBox height={50} />
      </Card>
    </Box>
    <SkeletonBox
      width="155px"
      height={50}
      sx={{ float: "right", marginTop: "10px" }}
    />
  </Box>
);

export const CaseStudyLoader: React.FC = () => (
  <Box
    width="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <SkeletonBox width="255px" height={25} sx={{ marginY: "20px" }} />
    <Grid
      sx={{ mt: 3 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {gridItems.map((item, index) => (
        <Grid key={index} item xs={6}>
          <Box width={item.width} marginBottom="10px">
            <AnimatedBoxSkeleton height={25} light="true" />
          </Box>
          <Box>
            <Box width={item.skeletonWidth}>
              <AnimatedBoxSkeleton height={item.skeletonHeight} light="true" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {[1, 2].map((_, idx) => (
        <SkeletonBox
          key={idx}
          width="155px"
          height={50}
          sx={{ marginTop: "10px" }}
        />
      ))}
    </Box>
  </Box>
);
