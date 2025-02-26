/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import { IconButton, EvaIcon } from "../../../../../../../../../components";
import { PaginatedTable } from "../../../../../../../../../components/table";
import { useMemo } from "react";
import { formatSectionTitle } from "../../../../../../../../../utils";
import { CellProps, Column } from "react-table";

export type TableColumnType = {
    sectionId: string;
    sectionDataId: string;
    sectionType: string;
    title?: string;
    link?: string;
    contentArea?: string;
    guided?: boolean;
    unguided?: boolean;
    practice?: boolean;
    cardTopic?: string;
    catSimulator?: string;
    contentAreaCoverage?: string;
};

interface ProgramSectionTableProps {
  tableData: TableColumnType[];
  sectionType: string;
  onEdit: (sectionId: string, sectionDataId: string) => void;
  onDelete: (id: string, title: string) => void;
}

type ActionsCellProps = {
  sectionId: string;
  sectionDataId: string;
  sectionTitle: string;
  onEdit: (sectionId: string, sectionDataId: string) => void;
  onDelete: (id: string, title: string) => void;
};

const ActionsCell: React.FC<ActionsCellProps> = ({
  sectionId,
  sectionDataId,
  sectionTitle,
  onEdit,
  onDelete,
}) => {
  return (
    <Box className="flex gap-2">
      <IconButton
        data-testid="edit-button"
        onClick={() => onEdit(sectionId, sectionDataId)}
        sx={{
          height: "35px",
          background: "#F4C501",
          borderRadius: "5px",
          "&:hover": { background: "#F7D649" },
        }}
      >
        <EvaIcon name="edit-outline" fill="#ffffff" width={18} height={18} />
      </IconButton>
      <IconButton
        data-testid="delete-button"
        onClick={() => onDelete(sectionId, sectionTitle)}
        sx={{
          height: "35px",
          background: "#D40000",
          borderRadius: "5px",
          "&:hover": { background: "#E56666" },
        }}
      >
        <EvaIcon name="trash-outline" fill="#ffffff" width={18} height={18} />
      </IconButton>
    </Box>
  );
};

export const ProgramSectionTable: React.FC<ProgramSectionTableProps> = ({
  tableData,
  sectionType,
  onEdit,
  onDelete,
}) => {
  const columns: Column<TableColumnType>[] = useMemo(() => {
    switch (sectionType) {
      case "document":
        return [
          {
            Header: "Title",
            accessor: (row) => row.title,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Link",
            accessor: (row) => row.link,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.title ?? ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
        case "video":
        return [
          {
            Header: "Title",
            accessor: (row) => row.title,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Link",
            accessor: (row) => row.link,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.title || ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
      case "simulator":
        return [
          {
            Header: "Title",
            accessor: (row) => row.title,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "ContentArea",
            accessor: (row) => row.contentArea,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Guided",
            accessor: (row) => row.guided,
            Cell: ({ value }: CellProps<TableColumnType, boolean>) => (
              <Typography>{value}</Typography>
            ),
            minWidth: 40,
          },
          {
            Header: "Unguided",
            accessor: (row) => row.unguided,
            Cell: ({ value }: CellProps<TableColumnType, boolean>) => (
              <Typography>{value}</Typography>
            ),
            minWidth: 40,
          },
          {
            Header: "Practice",
            accessor: (row) => row.practice,
            Cell: ({ value }: CellProps<TableColumnType, boolean>) => (
              <Typography>{value}</Typography>
            ),
            minWidth: 40,
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.title || ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
      case "content-cards":
        return [
          {
            Header: "Title",
            accessor: (row) => row.title,
            id: "title",
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Card Topic",
            accessor: (row) => row.cardTopic,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.title || ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
      case "med-cards":
        return [
          {
            Header: "Title",
            accessor: (row) => row.title,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Link",
            accessor: (row) => row.link,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.title || ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
      case "cat":
        return [
          {
            Header: "CAT Simulator",
            accessor: (row) => row.catSimulator,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Content Area Coverage",
            accessor: (row) => row.contentAreaCoverage,
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.catSimulator || ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
      default:
        return [
          {
            Header: "Title",
            accessor: (row) => row.title,
            id: "title",
            Cell: ({ value }: CellProps<TableColumnType, string>) => (
              <Typography>{value}</Typography>
            ),
          },
          {
            Header: "Actions",
            accessor: (row) => row,
            id: "actions",
            Cell: ({ row }: CellProps<TableColumnType>) => {
              return (
                <ActionsCell
                  sectionId={row.original.sectionId}
                  sectionDataId={row.original.sectionDataId}
                  sectionTitle={row.original.title ?? ""}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            },
          },
        ];
    }
  }, [sectionType, onEdit, onDelete]);

  return (
    <Box
      mt={8}
      sx={{
        background: "rgba(59, 0, 134, 0.05)",
        borderRadius: "10px",
        height: "auto",
        marginX: "50px",
        paddingBottom: "20px",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          borderBottom: "2px solid #3B0086",
          height: "auto",
          padding: "20px",
        }}
      >
        {formatSectionTitle(sectionType)} List
      </Box>
      <PaginatedTable
        columns={columns}
        data={tableData}
        noDataText="No data found"
        noDataFoundText="No data found"
        mobileFiltersConfig={{
          alwaysOnFilters: ["title"],
          menuFilters: ["title", "link"],
        }}
      />
    </Box>
  );
};