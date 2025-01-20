import { Box } from "@mui/material";
import { AnimatedBoxSkeleton } from "core-library/components";
import { useMemo } from "react";

interface ProgramSkeletonLoaderProps {
  listView: boolean;
  itemCount?: number;
}

interface SkeletonProps {
  itemArray: number[];
}

const ListViewSkeleton: React.FC<SkeletonProps> = ({ itemArray }) => (
  <Box className="flex flex-col gap-4 fadeIn">
    {itemArray.map(() => (
      <AnimatedBoxSkeleton
        light
        sx={{
          height: "162px",
          borderRadius: "16px",
        }}
      />
    ))}
  </Box>
);

const GridViewSkeleton: React.FC<SkeletonProps> = ({ itemArray }) => (
  <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full fadeIn">
    {itemArray.map(() => (
      <div className="w-full lg:w-[254px] relative overflow-hidden rounded-2xl">
        <div className="aspect-[422/379.8]" />
        <div className="w-full h-[122px]" />
        <AnimatedBoxSkeleton
          light
          sx={{
            position: "absolute",
            inset: 0,
          }}
        />
      </div>
    ))}
  </Box>
);

export const ProgramSkeletonLoader: React.FC<ProgramSkeletonLoaderProps> = ({
  listView,
  itemCount = 9,
}) => {
  if (itemCount < 1) {
    return <p>No items to load...</p>;
  }

  const itemArray = useMemo(
    () => Array.from({ length: itemCount }, (_, i) => i),
    [itemCount]
  );

  return listView ? (
    <ListViewSkeleton itemArray={itemArray} />
  ) : (
    <GridViewSkeleton itemArray={itemArray} />
  );
};
