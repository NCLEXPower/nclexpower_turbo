import InternalUsersForm from "./InternalUsersForm";
import { useAuthContext, useExecuteToast } from "../../../../../../../contexts";
import { InternalOptions } from "../../../../../../../types/global";

export function InternalUsersBlock() {
  const { loading, register } = useAuthContext();
  const toast = useExecuteToast();

  async function onSubmit(value: InternalOptions) {
    await register(value);
    toast.executeToast("Successfully Added", "top-right", false, {
      type: "success",
    });
  }

  return <InternalUsersForm onSubmit={onSubmit} isLoading={loading} />;
}
