import { Grid } from "@mui/material";
import { AnimatedBoxSkeleton } from "../AnimatedBoxSkeleton/AnimatedSkeletonBox";

interface Props {
  id?: string;
  loadersCount?: number;
  isFullWidth?: boolean;
  spacing?: number;
  "data-testid"?: string;
}

export const ListLoader: React.FC<Props> = ({
  id,
  loadersCount = 1,
  isFullWidth,
  spacing = 16,
  ...props
}) => (
  <Grid id={id} container spacing={spacing} width="100%" {...props}>
    {Array.from(Array(loadersCount)).map((item, idx) => (
      <Grid key={idx} item container xs={12} spacing={4}>
        <Grid item xs={12} container>
          <Grid item xs={isFullWidth ? 12 : 8}>
            <AnimatedBoxSkeleton height={24} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={isFullWidth ? 12 : 4}>
            <AnimatedBoxSkeleton height={24} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={isFullWidth ? 12 : 6}>
            <AnimatedBoxSkeleton
              height={24}
              sx={{ backgroundColor: "appColors.tertiary.light" }}
            />
          </Grid>
        </Grid>
      </Grid>
    ))}
  </Grid>
);
