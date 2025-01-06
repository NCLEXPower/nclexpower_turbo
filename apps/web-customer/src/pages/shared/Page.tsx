/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import {
  AuthProvider,
  BusinessQueryContextProvider,
  ToastProvider,
} from "core-library/contexts";
import { useCountdown } from "core-library/hooks";
import Layout from "./Layout";
import { ControlledToast, ErrorBox } from "core-library/components";
import { ClientSecretKeyContextProvider } from "core-library/contexts";
import { SsrTypes } from "core-library/types/global";
import CSPHead from "core-library/components/CSPHead";
import { MaintenanceBlock } from "@/components/blocks/MaintenanceBlock/MaintenanceBlock";
import withAuth from "core-library/core/utils/withAuth";
import { config } from "core-library/config";
import { ContentDataContextProvider } from "core-library/contexts/content/ContentDataContext";
import { GoLiveBlock } from "@/components/blocks/GoLive/GoLiveBlock";

interface Props {
  slug?: string;
  data?: SsrTypes;
  generatedNonce?: string;
  error?: any;
}

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  data,
  generatedNonce,
  error,
  slug,
}) => {
  // const { countdown } = useCountdown();
  const MaintenanceMode =
    data && data.MaintenanceStatus?.currentMaintenanceMode;

  if (error) {
    return <ErrorBox label={error.message} />;
  }

  if (MaintenanceMode && MaintenanceMode.includes(config.value.SYSENV)) {
    return <MaintenanceBlock />;
  }

  if (data?.hasGoLive) {
    return <GoLiveBlock />; //Replace with actual Go-Live UI
  }

  return (
    <React.Fragment>
      <ContentDataContextProvider slug={slug ?? "/"}>
        <CSPHead nonce={generatedNonce ?? "no-nonce"} />
        <BusinessQueryContextProvider>
          <AuthProvider>
            <ToastProvider>
              <ClientSecretKeyContextProvider>
                <ControlledToast autoClose={5000} hideProgressBar={false} />
                <Layout children={children} />
              </ClientSecretKeyContextProvider>
            </ToastProvider>
          </AuthProvider>
        </BusinessQueryContextProvider>
      </ContentDataContextProvider>
    </React.Fragment>
  );
};

export default Page;
