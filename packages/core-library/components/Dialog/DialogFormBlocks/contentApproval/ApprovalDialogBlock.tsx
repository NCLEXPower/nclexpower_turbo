/**
 * Property of the Arxon Solutions, LLC.
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
import { defaultValues } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";

export const ApprovalDialogBlock = () => {
  const { closeDialog } = useDialogContext();
  const { setContentLoader } = usePageLoaderContext();
  const [approvalAtom] = useAtom(ContentDateAtom);

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

  return (
    <ApprovalDialogForm
      data-testId="approval-form"
      onSubmit={onSubmit}
      values={approvalAtom ?? defaultValues}
    />
  );
};
