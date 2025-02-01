/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { EvaIcon, CustomTooltip, CustomPopover, StateStatus } from "../..";
import { Box, ListItemButton } from "@mui/material";
import {
  useDialogContext,
  useExecuteToast,
  usePageLoaderContext,
} from "../../../contexts";
import { ColumnDef, RowModel } from "@tanstack/react-table";
import { AuthorizedContentsResponseType } from "../../../api/types";
import { useAtom } from "jotai";
import { actionButtons } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import {
  ContentDateAtom,
  ContentDateType,
} from "../../Dialog/DialogFormBlocks/contentApproval/validation";
import { useEffect, useState } from "react";
import { ApprovalListView } from "./ApprovalListView";

export interface ApprovalProps {
  nextStep(values: ContentDateType): void;
  data?: AuthorizedContentsResponseType[];
  isLoading?: boolean;
  isError?: boolean;
}

export const ApprovalListViewBlock: React.FC<ApprovalProps> = ({
  nextStep,
  data,
  isLoading,
  isError,
}) => {
  const [approvalAtom, setApprovalAtom] = useAtom<ContentDateType | undefined>(
    ContentDateAtom
  );

  const [multiple, setMultiple] = useState(false);
  const [selectedValues, setSelectedValues] = useState<ContentDateType>();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState<number>();
  const { contentLoader, setContentLoader } = usePageLoaderContext();

  const { showToast } = useExecuteToast();
  const { openDialog } = useDialogContext();

  useEffect(() => {
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, [setContentLoader]);

  useEffect(() => {
    if (data?.length === 0) {
      setIsEmpty(true);
    }
  }, [data]);

  const handleMultipleSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMultiple(event.target.checked);
  };

  const handleSelectedRows = (
    selectedRowModel: RowModel<AuthorizedContentsResponseType>
  ) => {
    const selectedData = selectedRowModel.flatRows.map((row) => ({
      contentId: row.original.mainContent.id,
      contentAuthorId: row.original.author.id,
    }));
    setSelectedValues({
      data: selectedData,
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
      data: [{ contentId, contentAuthorId }],
      implementationSchedule: new Date(),
    };
    switch (action) {
      case "view":
        setApprovalAtom(values);
        nextStep(values);
        break;
      case "approval":
        setApprovalAtom(values);
        openDialog("approval", "");
        break;
      case "multipleSelectApproval":
        if (selectedValues?.data && selectedValues.data.length > 0) {
          setApprovalAtom(selectedValues);
          openDialog("approval", "");
        } else {
          showToast("No Selected Content", "info");
        }
        break;
      case "multipleSelectRejection":
        if (selectedValues?.data && selectedValues.data.length > 0) {
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
    actionButtons.length > 0 &&
    actionButtons.map((btn) => {
      const disabled = selectedRows ? true : btn.action == "reject";
      const tooltipTitle =
        btn.action == "reject" ? "Reject action will be on page viewer" : "";

      return (
        <CustomTooltip title={tooltipTitle} key={btn.action}>
          <span>
            <ListItemButton
              data-testid="approvalAction"
              onClick={() =>
                handleSelection(btn.action, contentId, contentAuthorId)
              }
              sx={{ bgcolor: "white", color: "black" }}
              disabled={disabled}
            >
              {btn.label}
            </ListItemButton>
          </span>
        </CustomTooltip>
      );
    });

  const columns: ColumnDef<AuthorizedContentsResponseType>[] = [
    { id: "id", header: "ID", accessorKey: "id", enablePinning: true },
    { id: "contentsId", header: "ContentID", accessorKey: "mainContent.id" },
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
        const contentId = params.row.original.mainContent.id;
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

  if (isError || isEmpty || isLoading || contentLoader) {
    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          borderRadius: "15px",
          minWidth: "250px",
          width: "100%",
          height: "400px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: 2,
        }}
      >
        <StateStatus
          isError={false}
          isLoading={(isLoading as boolean) || contentLoader}
          isEmpty={isEmpty}
        />
      </Box>
    );
  }

  return (
    <ApprovalListView
      multiple={multiple}
      handleMultipleSelection={handleMultipleSelection}
      selectedRows={selectedRows ?? 0}
      handleSelection={handleSelection}
      columns={columns}
      data={data ?? []}
      handleSelectedRows={handleSelectedRows}
    />
  );
};
