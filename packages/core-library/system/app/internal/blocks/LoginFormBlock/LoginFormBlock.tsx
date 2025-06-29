/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { Box } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { useAuthContext, useExecuteToast } from "../../../../../contexts";
import { useState } from "react";
import { LoginOptions } from "../../../../../contexts/auth/types";
import { useRouter } from "../../../../../core";

export interface SavedDataProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginFormBlock() {
  const { login, loading } = useAuthContext();
  const toast = useExecuteToast();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit({ email, password }: LoginOptions) {
    try {
      await login({ email, password });
      await router.push((router) => router.hub);
    } catch (err) {
      toast.showToast("Something went wrong during login", "error");
      console.error(`Something went wrong during login: ${err}`);
    } finally {
      setSubmissionLoading(false);
    }
  }

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
        submitLoading={submissionLoading || loading}
      />
    </Box>
  );
}
