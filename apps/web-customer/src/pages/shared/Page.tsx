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
import Layout from "./Layout";
import { ControlledToast, ErrorBox } from "core-library/components";
import { ClientSecretKeyContextProvider } from "core-library/contexts";
import { SsrTypes } from "core-library/types/global";
import CSPHead from "core-library/components/CSPHead";
import { MaintenanceBlock } from "@/components/blocks/MaintenanceBlock/MaintenanceBlock";

interface Props {
  data?: SsrTypes;
  generatedNonce?: string;
  error?: any;
}

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  data,
  generatedNonce,
  error,
}) => {
  if (error) {
    return <ErrorBox label={error.message} />;
  }

  if (data?.loadMaintenanceMode?.maintenanceModeType === 1) {
    return <MaintenanceBlock />;
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Page;
