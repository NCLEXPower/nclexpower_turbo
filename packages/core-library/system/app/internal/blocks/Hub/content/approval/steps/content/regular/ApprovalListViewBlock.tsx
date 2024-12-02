/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  EvaIcon,
  ComponentLoader,
  CustomTooltip,
  CustomPopover,
} from "../../../../../../../../../../components";
import { Box, ListItemButton } from "@mui/material";
import {
  useBusinessQueryContext,
  useDialogContext,
  useExecuteToast,
  usePageLoaderContext,
} from "../../../../../../../../../../contexts";
import { useAccountId } from "../../../../../../../../../../contexts/auth/hooks";
import { ColumnDef, RowModel } from "@tanstack/react-table";
import { AuthorizedContentsResponseType } from "../../../../../../../../../../api/types";
import { useAtom } from "jotai";
import { actionButtons } from "../../../../../Settings/SettingsManagement/constants/constants";
import {
  ContentDateAtom,
  ContentDateType,
} from "../../../../../../../../../../components/Dialog/DialogFormBlocks/contentApproval/validation";
import { useEffect, useState } from "react";
import { ApprovalListView } from "./ApprovalListView";
import { mockData } from "./mockData";

export interface ApprovalProps {
  nextStep(values: ContentDateType): void;
}

export const ApprovalListViewBlock: React.FC<ApprovalProps> = ({
  nextStep,
}) => {
  const [approvalAtom, setApprovalAtom] = useAtom<ContentDateType | undefined>(
    ContentDateAtom
  );
  const [getAccountId] = useAccountId();
  const [multiple, setMultiple] = useState(false);
  const [selectedValues, setSelectedValues] = useState<ContentDateType>();
  const accountId = getAccountId ?? "no-account-id";
  const { businessQueryGetContents } = useBusinessQueryContext();
  const [selectedRows, setSelectedRows] = useState<number>();
  const { data, isLoading } = businessQueryGetContents(
    ["getAuthorizeContentContents"],
    {
      MainType: "Regular",
      AccountId: accountId,
    }
  );

  console.log(accountId);
  const { contentLoader, setContentLoader } = usePageLoaderContext();

  useEffect(() => {
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, [setContentLoader]);

  const { openDialog } = useDialogContext();
  const handleMultipleSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMultiple(event.target.checked);
  };
  const { showToast } = useExecuteToast();

  const handleSelectedRows = (
    selectedRowModel: RowModel<AuthorizedContentsResponseType>
  ) => {
    const selectedData = selectedRowModel.flatRows.map((row) => ({
      contentId: row.original.contentId,
      contentAuthorId: row.original.contentAuthorId,
    }));
    setSelectedValues({
      approval: selectedData,
      implementationSchedule: new Date(),
    });
    setSelectedRows(selectedRowModel.rows.length);
  };

  const handleSelection = (
    action: string,
    contentId = "",
    contentAuthorId = ""
  ) => {
    const values: ContentDateType = {
      approval: [{ contentId, contentAuthorId }],
      implementationSchedule: new Date(),
    };
    switch (action) {
      case "view":
        setApprovalAtom(selectedValues);
        nextStep(values);
        break;
      case "approval":
        setApprovalAtom(values);
        openDialog("approval", "");
        break;
      case "multipleSelectApproval":
        if (selectedValues?.approval && selectedValues.approval.length > 0) {
          setApprovalAtom(selectedValues);
          openDialog("approval", "");
        } else {
          showToast("No Selected Content", "info");
        }
        break;
      case "multipleSelectRejection":
        if (selectedValues?.approval && selectedValues.approval.length > 0) {
          setApprovalAtom(selectedValues);
          nextStep(selectedValues);
        } else {
          showToast("No Selected Content", "info");
        }
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };

  const renderActionButtons = (contentId: string, contentAuthorId: string) =>
    actionButtons.map((btn) => {
      const isReject = btn.action === "reject";
      const tooltipTitle = isReject
        ? "Reject action will be on page viewer"
        : "";

      return (
        <CustomTooltip title={tooltipTitle} key={btn.action}>
          <span>
            <ListItemButton
              data-testid="Approval-View-Reject"
              onClick={() =>
                handleSelection(btn.action, contentId, contentAuthorId)
              }
              sx={{ bgcolor: "white", color: "black" }}
              disabled={isReject}
            >
              {btn.label}
            </ListItemButton>
          </span>
        </CustomTooltip>
      );
    });

  const columns: ColumnDef<AuthorizedContentsResponseType>[] = [
    { id: "id", header: "ID", accessorKey: "id", enablePinning: true },
    { id: "contentsId", header: "ContentID", accessorKey: "contentId" },
    { id: "authorId", header: "Author Id", accessorKey: "author.id" },
    {
      id: "mainContentType",
      header: "Main Type",
      accessorKey: "mainContent.mainType",
    },
    {
      id: "mainContentStatus",
      header: "Status",
      accessorKey: "mainContentStatus",
    },
    { id: "createdDate", header: "Created At", accessorKey: "createdDate" },
    {
      id: "action",
      header: "Actions",
      cell: (params) => {
        const contentId = params.row.original.contentId;
        const contentAuthorId = params.row.original.author.id;
        return (
          <Box>
            <CustomPopover
              open
              label="Actions"
              withIcon
              iconButton={
                <EvaIcon
                  id="open-icon"
                  name="more-vertical"
                  width={20}
                  height={20}
                  ariaHidden
                />
              }
            >
              {renderActionButtons(contentId, contentAuthorId)}
            </CustomPopover>
          </Box>
        );
      },
    },
  ];

  if (contentLoader) {
    return <ComponentLoader />;
  }

  return (
    <ApprovalListView
      multiple={multiple}
      handleMultipleSelection={handleMultipleSelection}
      selectedRows={selectedRows ?? 0}
      handleSelection={handleSelection}
      columns={columns}
      data={mockData ?? []}
      handleSelectedRows={handleSelectedRows}
    />
  );
};
