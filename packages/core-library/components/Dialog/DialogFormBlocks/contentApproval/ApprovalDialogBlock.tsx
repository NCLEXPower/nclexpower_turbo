/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ContentDateType } from "./validation";
import { useDialogContext, useExecuteToast } from "../../../../contexts";
import { usePageLoaderContext } from "../../../../contexts/PageLoaderContext";
import { ApprovalDialogForm } from "./ApprovalDialogForm";

export const ApprovalDialogBlock = () => {
  const { closeDialog } = useDialogContext();
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  console.log("contentLoader in approvalDialogBlock", contentLoader);
  const toast = useExecuteToast();

  const onSubmit = async (values: ContentDateType) => {
    try {
      console.log("onSubmit", values);
      toast.executeToast("Successfully submitted..", "top-right", false, {
        toastId: 0,
        type: "success",
      });
    } catch (err) {
      console.error("Something wrong", err);
    } finally {
      setContentLoader(true);
      closeDialog();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setContentLoader(false);
    }
  };
  return <ApprovalDialogForm onSubmit={onSubmit} />;
};
