/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ContentDateAtom, ContentDateType } from "./validation";
import { useDialogContext, useExecuteToast } from "../../../../contexts";
import { usePageLoaderContext } from "../../../../contexts/PageLoaderContext";
import { ApprovalDialogForm } from "./ApprovalDialogForm";
import { useAtom } from "jotai";

export const ApprovalDialogBlock = () => {
  const { closeDialog } = useDialogContext();
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const [approvalAtom, setApprovalAtom] = useAtom(ContentDateAtom);

  const toast = useExecuteToast();

  const onSubmit = async (values: ContentDateType) => {
    try {
      console.log("onSubmit", values);
      toast.executeToast("Successfully submitted..", "top-right", false, {
        toastId: 1,
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

  const defaultValues: ContentDateType = {
    approval: [],
    implementationSchedule: new Date(),
  };

  return (
    <ApprovalDialogForm
      onSubmit={onSubmit}
      values={approvalAtom ?? defaultValues}
    />
  );
};
