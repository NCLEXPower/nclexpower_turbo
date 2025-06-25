import React, { createContext, useContext, useMemo } from "react";
import { useStandardAuth } from "./standard/useStandardAuth";
import { AUTH_METHODS, AuthMethod, AuthService } from "./types";

const context = createContext<AuthService | undefined>(undefined);

const mapAuthService = (authService: AuthService) => ({
  loading: authService.loading,
  isAuthenticating: authService.isAuthenticating,
  isAuthenticated: authService.isAuthenticated,
  login: authService.login,
  logout: authService.logout,
  register: authService.register,
  softLogout: authService.softLogout,
  setIsAuthenticated: authService.setIsAuthenticated,
  setIsAuthTasksRunning: authService.setIsAuthTasksRunning,
  setSecurityMeasures: authService.setSecurityMeasures,
});

const StandardAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService = useStandardAuth();
  const value = useMemo(() => mapAuthService(authService), [authService]);
  return <context.Provider value={value}>{children}</context.Provider>;
};

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  authMethod?: AuthMethod;
}> = ({ children, authMethod = AUTH_METHODS.STANDARD_AUTH }) => {
  if (authMethod == AUTH_METHODS.OPENAM) {
    return <></>; //open am auth method soon.
  }

  return <StandardAuthProvider>{children}</StandardAuthProvider>;
};

export const useAuthContext = () => {
  const authContext = useContext(context);
  if (!authContext) {
    throw new Error("useAuthContext must be used with an AuthProvider");
  }
  return authContext;
};

export const useSafeAuthContext = () => {
  const authContext = useContext(context);
  if (!authContext) {
    return {
      loading: false,
      isAuthenticating: false,
      isAuthenticated: false,
      login: async () => {},
      logout: async () => {},
      register: async () => {},
      softLogout: async () => {},
      setIsAuthenticated: () => {},
    };
  }
  return authContext;
};
