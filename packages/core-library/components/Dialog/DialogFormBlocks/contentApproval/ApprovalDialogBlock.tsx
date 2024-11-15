/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ContentDateAtom, ContentDateType } from "./validation";
import {
  useDialogContext,
  useExecuteToast,
  usePageLoaderContext,
} from "../../../../contexts";
import { ApprovalDialogForm } from "./ApprovalDialogForm";
import { useAtom } from "jotai";

export const ApprovalDialogBlock = () => {
  const { closeDialog } = useDialogContext();
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const [approvalAtom, setApprovalAtom] = useAtom(ContentDateAtom);

  const { showToast } = useExecuteToast();

  const onSubmit = async (values: ContentDateType) => {
    try {
      showToast("Successfully submitted.", "success");
      setContentLoader(true);
    } catch (err) {
      showToast("Something wrong", "error");
    } finally {
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
      data-testId="approval-form"
      onSubmit={onSubmit}
      values={approvalAtom ?? defaultValues}
    />
  );
};
