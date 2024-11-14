/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  Alert,
  Card,
  ComponentLoader,
  CustomBadge,
  EvaIcon,
  ReactTable,
  CustomPopover,
} from "../../../../../../../../../../components";
import { Box, Container, ListItemButton, Switch, Tooltip } from "@mui/material";
import { ColumnDef, RowModel } from "@tanstack/react-table";
import { AuthorizedContentsResponseType } from "../../../../../../../../../../api/types";

export interface ApprovalBlockProps {
  multiple: boolean;
  handleMultipleSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRows: number;
  handleSelection: (action: string) => void;
  columns: ColumnDef<AuthorizedContentsResponseType>[];
  handleSelectedRows: (
    selectedRowModel: RowModel<AuthorizedContentsResponseType>
  ) => void;
  data: AuthorizedContentsResponseType[];
}

export const ApprovalListView: React.FC<ApprovalBlockProps> = ({
  columns,
  data,
  multiple,
  handleMultipleSelection,
  selectedRows,
  handleSelection,
  handleSelectedRows,
}) => {
  return (
    <Box data-testid="approval-list-view">
      <Container>
        <Alert
          severity="info"
          title="Manage Approvals"
          description="View and manage the approval list, including content revisions and schedules."
        />
        <Card sx={{ mt: 5, p: 4, width: "100%" }} elevation={5}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Switch checked={multiple} onChange={handleMultipleSelection} />
              Multiple Selection
            </Box>
            <Box paddingY={4}>
              <CustomBadge
                data-testId="custom-badge"
                badgeContent={selectedRows}
                color="primary"
              >
                <CustomPopover
                  open
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
                  sx={{
                    padding: "8px",
                    paddingY: "40px",
                    backgroundColor: "#343a40",
                    borderRadius: "10px",
                    color: "#F3F3F3",
                    "&:hover": { backgroundColor: "#212529" },
                  }}
                >
                  <ListItemButton
                    onClick={() => handleSelection("multipleSelectApproval")}
                  >
                    Approve
                  </ListItemButton>
                  <Tooltip title={"Reject action will be on view"}>
                    <ListItemButton
                      onClick={() => handleSelection("multipleSelectRejection")}
                    >
                      Reject
                    </ListItemButton>
                  </Tooltip>
                </CustomPopover>
              </CustomBadge>
            </Box>
          </Box>
          <ReactTable<AuthorizedContentsResponseType>
            data-testId="react-table"
            rightPinnedIds={["action"]}
            checkBoxSelection={multiple}
            columns={columns}
            data={data ?? []}
            selectedRows={handleSelectedRows}
          />
        </Card>
      </Container>
    </Box>
  );
};
