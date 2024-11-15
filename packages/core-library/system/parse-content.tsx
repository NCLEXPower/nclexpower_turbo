import React from "react";
import { AuthProvider, ToastProvider } from "../contexts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Page from "./Page";

export type SystemTypes = "webc_app" | "webdev_app";
interface Props {
  appName: SystemTypes;
}

export const ParseContents: React.FC<React.PropsWithChildren<Props>> = ({
  appName,
  children,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <ToastProvider>
          <Page appName={appName}>{children}</Page>
        </ToastProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
};
