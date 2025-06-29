import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { useRouter } from "core-library/core/router";
import { LoginOptions } from "core-library/contexts/auth/types";
import { useExtraConfig } from "core-library/hooks";

export interface SavedDataProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginFormBlock() {
  const { login } = useAuthContext();
  const config = useExtraConfig();
  const [loading, setLoading] = useState(false);
  const toast = useExecuteToast();
  const router = useRouter();

  const handleBack = () => {
    router.push((route) => route.home);
  };

  async function handleSubmit({ email, password }: LoginOptions) {
    try {
      setLoading(true);
      const result = await login({ email, password });
      if (result?.requires2FA) {
        await router.push((router) => router.account_verification_otp);
      } else {
        if (!config?.config.isPaid) {
          await router.push((router) => router.payment_setup);
        } else {
          await router.push((router) => router.hub);
        }
      }
    } catch (err) {
      toast.showToast("Something went wrong during login", "error");
      console.error(`Something went wrong during login: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginForm
      onSubmit={handleSubmit}
      submitLoading={loading}
      handleBack={handleBack}
    />
  );
}
