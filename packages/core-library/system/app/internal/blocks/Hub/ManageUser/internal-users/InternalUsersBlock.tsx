import React from "react";
import InternalUsersForm from "./InternalUsersForm";
import { AccountSetupType } from "./validation";
import { useAuthContext, useExecuteToast } from "../../../../../../../contexts";

export function InternalUsersBlock() {
  const { createInternal, loading } = useAuthContext();
  const toast = useExecuteToast();

  async function onSubmit(value: AccountSetupType) {
    await createInternal(value);
    toast.executeToast("Successfully Added", "top-right", false, {
      type: "success",
    });
  }

  return <InternalUsersForm onSubmit={onSubmit} isLoading={loading} />;
}
