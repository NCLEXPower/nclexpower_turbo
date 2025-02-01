import { Box } from "@mui/material";
import { AnimatedBoxSkeleton } from "core-library/components";

interface Props {
  inclusionsCount?: number;
}

export const ProductDetailSkeletonLoader = ({ inclusionsCount }: Props) => {
  return (
    <div className="w-full min-h-full flex flex-col p-6 xl:flex-row xl:gap-24 xl:p-12">
      <div className="w-full xl:w-4/6 pl-6 lg:pl-16 my-6">
        <Box sx={{ position: "relative", marginBottom: 4 }}>
          <AnimatedBoxSkeleton width={20} height={32} />
        </Box>

        <div className="ml-8  space-y-6 ">
          <AnimatedBoxSkeleton width={150} height={40} />
          <AnimatedBoxSkeleton width={300} height={48} />

          <Box sx={{ marginY: 3 }}>
            <AnimatedBoxSkeleton
              width={150}
              height={24}
              sx={{ marginBottom: 1 }}
            />
            <AnimatedBoxSkeleton width={250} height={36} />
          </Box>

          <AnimatedBoxSkeleton height={60} />

          <Box sx={{ marginTop: 4 }}>
            {Array(inclusionsCount)
              .fill(null)
              .map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <AnimatedBoxSkeleton
                    width={20}
                    height={20}
                    sx={{ marginRight: 2 }}
                  />
                </Box>
              ))}
          </Box>
        </div>
      </div>

      <div className="w-full min-h-full xl:w-2/6">
        <Box className="bg-[#F2F2F2] px-8 py-12 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <AnimatedBoxSkeleton
            width={200}
            height={36}
            sx={{ marginBottom: 4 }}
          />

          <Box sx={{ marginBottom: 4 }}>
            {[1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor: "white",
                }}
              >
                <AnimatedBoxSkeleton height={80} />
              </Box>
            ))}
          </Box>

          <AnimatedBoxSkeleton height={1} sx={{ marginY: 4 }} />

          <Box sx={{ marginTop: 4 }}>
            <AnimatedBoxSkeleton
              width={204}
              height={350}
              sx={{ marginBottom: 2 }}
            />
            <AnimatedBoxSkeleton height={50} sx={{ marginBottom: 2 }} />
            <AnimatedBoxSkeleton width="80%" height={50} />
          </Box>
        </Box>
      </div>
    </div>
  );
};
