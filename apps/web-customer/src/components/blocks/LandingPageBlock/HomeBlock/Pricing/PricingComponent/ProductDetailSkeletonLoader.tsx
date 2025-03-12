import { Box } from "@mui/material";
import { AnimatedBoxSkeleton } from "core-library/components";

interface Props {
  inclusionsCount?: number;
}

export const ProductDetailSkeletonLoader = ({ inclusionsCount }: Props) => {
  return (
    <div className="">
      <div className="w-full flex flex-col py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)] md:flex-row  justify-between">
        <div className="w-full pe-5 pe-md-0 pb-0 pb-md-5">
          <Box className=" md:w-[clamp(1px,39.063vw,1400px)] pe-5 pe-md-0">
            <Box >
              <AnimatedBoxSkeleton className="h-[34px] my-3" />
            </Box>

            <AnimatedBoxSkeleton className="h-[50px] pt-3" />
            <AnimatedBoxSkeleton className="h-[70px] mt-2" />

            <Box className="my-3">
              <AnimatedBoxSkeleton className="h-[34px] mb-2"

              />
              <AnimatedBoxSkeleton className="h-[52px]" />
            </Box>

            <AnimatedBoxSkeleton className="h-[74px] mb-3" />

            <Box >
              {Array(inclusionsCount)
                .fill(null)
                .map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AnimatedBoxSkeleton className="h-[29px] mb-2"
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </div>

        <div className="w-full ">
          <Box className="md:w-[clamp(1px,25.261vw,970px)] flex flex-col justify-between  text-[#232323] bg-[#F2F2F2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[clamp(1px,1.1vw,40px)]">
            <Box className="md:px-[clamp(1px,2.083331vw,80px)] px-[clamp(1px,4.65116vw,80px)] md:py-[clamp(1px,2.083331vw,80px)] py-[clamp(1px,4.65116vw,80px)]">
              <AnimatedBoxSkeleton
                className="h-[25px]"
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
                    <AnimatedBoxSkeleton className="h-[107px]" />
                  </Box>
                ))}
              </Box>

              <AnimatedBoxSkeleton height={1} sx={{ marginY: 4 }} />

              <Box sx={{ marginTop: 4 }}>
                <AnimatedBoxSkeleton
                  className="h-[200px]"
                  sx={{ marginBottom: 2 }}
                />
                <AnimatedBoxSkeleton className="h-[50px]" sx={{ marginBottom: 2 }} />
                <AnimatedBoxSkeleton className="h-[20px]" />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
