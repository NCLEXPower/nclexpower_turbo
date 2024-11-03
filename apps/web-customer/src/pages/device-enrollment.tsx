import React from "react";
import { DeviceEnrollmentBlock } from "@/components";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { useDeviceNotRecognized } from "core-library/contexts/auth/hooks";
import { useDesignVisibility, useDeviceInfo } from "core-library/hooks";
import { NotFoundBlock } from "@/components/blocks/NotFoundBlock/NotFoundBlock";

const DeviceEnrollment: React.FC = () => {
  const [IsDeviceNotRecognized] = useDeviceNotRecognized();
  const { deviceInfo } = useDeviceInfo();
  useDesignVisibility();

  if (IsDeviceNotRecognized) {
    return <DeviceEnrollmentBlock deviceInfo={deviceInfo} />;
  }

  return <NotFoundBlock />;
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default DeviceEnrollment;
