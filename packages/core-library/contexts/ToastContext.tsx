/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React, { createContext, useContext } from "react";
import { toast, ToastOptions, ToastPosition } from "react-toastify";

export interface ToastContextSetup {
  executeToast: (
    message: string,
    position: ToastPosition,
    hideProgressBar: boolean,
    options?: Partial<ToastOptions>
  ) => void;
    showToast: (message: string, type: "error" | "success") => void;
}

export const ToastContext = createContext<ToastContextSetup>({} as any);

export const useExecuteToast = () => {
  if (!ToastContext) {
    throw new Error("useExecuteToast must be used withing the ToastProvider.");
  }
  return useContext(ToastContext);
};

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const executeToast: ToastContextSetup["executeToast"] = (
    message,
    position,
    hideProgress,
    options = {}
  ) => {
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: hideProgress,
      ...options,
    });
  };

  const showToast = (message: string, type: "error" | "success") => {
    executeToast(message, "top-right", false, {
      toastId: 0,
      type,
    });
  };

  return (
    <ToastContext.Provider
      value={{
        executeToast,
        showToast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
