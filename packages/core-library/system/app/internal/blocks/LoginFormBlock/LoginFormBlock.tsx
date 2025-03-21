/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { Box } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { LoginParams } from "../../../../../types/types";
import { useAuthContext, useExecuteToast } from "../../../../../contexts";
import { useCallback, useEffect, useState } from "react";
import { getItem } from "../../../../../session-storage";
import { useLocalStorage } from "../../../../../hooks";
import { config } from "../../../../../config";
import { Decryption, Encryption } from "../../../../../utils";

export interface SavedDataProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginFormBlock() {
  const { login, loading } = useAuthContext();
  const toast = useExecuteToast();
  const [rememberMe, setRememberMe] = useState(false);
  const [savedData, setSavedData] = useState<SavedDataProps | null>(null);
  const { setItem, getItem, removeItem } = useLocalStorage("rm");

  const isEncrypted = (password: string) => {
    return password.includes(":");
  };

  const handleSubmit = useCallback(
    async (data: LoginParams) => {
      const key = config.value.SECRET_KEY;
      let passwordToUse = data.password;

      if (rememberMe) {
        const encryptedPassword = isEncrypted(data.password)
          ? data.password
          : await Encryption(data.password, key ?? "no-secret-key");

        const obj: SavedDataProps = {
          email: data.email,
          password: encryptedPassword,
          rememberMe: true,
        };
        setItem(JSON.stringify(obj));
      } else {
        removeItem();
      }

      if (savedData) {
        const decryptedPassword = Decryption(
          savedData.password,
          key ?? "no-secret-key"
        );
        const invalidPassword =
          data.password !== savedData.password &&
          data.password !== decryptedPassword;

        if (invalidPassword) {
          toast.executeToast("Invalid email or password", "top-right", false, {
            toastId: 0,
            type: "error",
          });
          return;
        }
        passwordToUse = decryptedPassword || data.password;
      }

      try {
        await login(data.email, passwordToUse);
      } catch (err) {
        console.error(err);
        toast.executeToast("Invalid email or password", "top-right", false, {
          toastId: 0,
          type: "error",
        });
      }
    },
    [savedData, rememberMe, setItem, removeItem, login, toast]
  );

  const handleChangeRememberMe = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  useEffect(() => {
    const item = getItem();
    if (typeof item === "string") {
      try {
        const parsedRm: SavedDataProps = JSON.parse(item);
        setSavedData(parsedRm);
        setRememberMe(parsedRm.rememberMe);
      } catch (error) {
        console.error("Failed to parse saved data", error);
      }
    }
  }, [getItem]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      sx={{
        height: "100%",
      }}
    >
      <LoginForm
        onSubmit={handleSubmit}
        submitLoading={loading}
        rememberMe={rememberMe}
        savedData={savedData}
        handleChangeRememberMe={handleChangeRememberMe}
      />
    </Box>
  );
}
