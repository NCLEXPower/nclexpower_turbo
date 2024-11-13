import { ThemeProvider } from "@mui/material";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import rtlEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import {
  BusinessQueryContextProvider,
  FormSubmissionContextProvider,
  HeaderTitleContextProvider,
  StripeContextProvider,
} from "../contexts";
import { theme } from "../contents/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "@testing-library/jest-dom";
import { PageLoaderContextProvider } from "../contexts/PageLoaderContext";

export * from "@testing-library/react";

export function noTranslation(t: string) {
  return t;
}

export function submittedResult() {
  return {
    loading: false,
    called: true,
  };
}

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PageLoaderContextProvider>
          <BusinessQueryContextProvider>
            <DndProvider backend={HTML5Backend}>
              <QueryClientProvider client={new QueryClient()}>
                <StripeContextProvider publishableKey="">
                  <ThemeProvider theme={theme()}>
                    <HeaderTitleContextProvider>
                      <FormSubmissionContextProvider>
                        {children}
                      </FormSubmissionContextProvider>
                    </HeaderTitleContextProvider>
                  </ThemeProvider>
                </StripeContextProvider>
              </QueryClientProvider>
            </DndProvider>
          </BusinessQueryContextProvider>
        </PageLoaderContextProvider>
      </LocalizationProvider>
    ),
    ...options,
  });

export const userEvent = rtlEvent;
