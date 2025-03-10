import Image from "next/image";
import { EmptyStateImage, ErrorStateImage } from "../../assets";
import { Box } from "@mui/material";
import { ComponentLoader } from "../ComponentLoader";
import { PropsWithChildren, useEffect, useState } from "react";
import { ComponentStateStyles } from "../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/style";

export const ComponentState: React.FC<PropsWithChildren<unknown | any>> = ({
  data,
  isError,
  isLoading,
  children,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if ((data.result?.length === 0 || data.result == null) && isSuccess) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [data.result, data.status]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (isEmpty && !isLoading) return <EmptyState />;

  return <>{children}</>;
};

const ErrorState = () => {
  return (
    <Box sx={ComponentStateStyles}>
      <Image src={ErrorStateImage} alt="Error Occured" />
      <Box data-testid="component-is-error-id">
        <p className="h-fit font-bold leading-3 w-full">Error!</p>
        <p className="h-fit text-[.8rem] leading-3 -mt-3 w-full">
          Something went wrong
        </p>
      </Box>
    </Box>
  );
};

const LoadingState = () => {
  return (
    <Box sx={ComponentStateStyles}>
      <Box data-testid="component-is-loading-id">
        <ComponentLoader disableMarginBottom />
        <Box sx={{ bgcolor: "Background" }}>
          <p className="h-fit font-bold leading-3 w-full">Loading</p>
          <p className="h-fit text-[.8rem] leading-3 -mt-3 w-full">
            Please Wait...
          </p>
        </Box>
      </Box>
    </Box>
  );
};

const EmptyState = () => {
  return (
    <Box sx={ComponentStateStyles}>
      <Image src={EmptyStateImage} alt="Empty Data" />
      <Box data-testid="component-is-empty-id">
        <p className="h-fit font-bold leading-3 w-full">Empty!</p>
        <p className="h-fit text-[.8rem] leading-3 -mt-3 w-full">
          No Data Available
        </p>
      </Box>
    </Box>
  );
};
