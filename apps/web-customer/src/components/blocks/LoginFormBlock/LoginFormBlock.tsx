import React, { useCallback, useEffect, useState } from "react";
import { LoginParams } from "core-library/types/types";
import { LoginForm } from "./LoginForm";
import { config } from "core-library/config";
import { Encryption } from "core-library/utils/Encryption";
import { Decryption } from "core-library/utils/Decryption";
import {
  useDeviceInfo,
  useGoogleSignIn,
  useLocalStorage,
} from "core-library/hooks";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { useRouter } from "core-library/core/router";
import { useDeviceSession } from "core-library/contexts/auth/hooks";

export interface SavedDataProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginFormBlock() {
  const { login, loading } = useAuthContext();
  const { signInWithGoogle } = useGoogleSignIn();
  const { setItem, getItem, removeItem } = useLocalStorage("rm");
  const [rememberMe, setRememberMe] = useState(false);
  const [savedData, setSavedData] = useState<SavedDataProps | null>(null);
  const toast = useExecuteToast();
  const router = useRouter();

  const handleBack = () => {
    router.push((route) => route.home);
  };

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
        toast.executeToast("Invalid email or password", "top-right", false, {
          toastId: 0,
          type: "error",
        });
      }
    },
    [savedData, rememberMe, setItem, removeItem, login, router, toast]
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
    <LoginForm
      onSubmit={handleSubmit}
      submitLoading={loading}
      handleChangeRememberMe={handleChangeRememberMe}
      rememberMe={rememberMe}
      savedData={savedData}
      handleBack={handleBack}
      signInWithGoogle={signInWithGoogle}
    />
  );
}
