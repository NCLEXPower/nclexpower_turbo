/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography } from "@mui/material";
import { IconButton, EvaIcon } from "../../../../../../../../../components";
import { PaginatedTable } from "../../../../../../../../../components/table";
import { Column } from "react-table";
import { useMemo } from "react";
import { formatSectionTitle } from "../../../../../../../../../utils";

interface ProgramSectionTableProps {
  tableData: Array<{ [key: string]: any }>;
  sectionType: string;
  onEdit: (row: string) => void;
  onDelete: (row: string) => void;
}

type ActionsCellProps = {
  sectionDataId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ActionsCell: React.FC<ActionsCellProps> = ({ sectionDataId, onEdit, onDelete }) => {
  return (
    <Box className="flex gap-2">
      <IconButton
        data-testid="edit-button"
        onClick={() => onEdit(sectionDataId)}
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
        onClick={() => onDelete(sectionDataId)}
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

  const columns: Column<any>[] = useMemo(() => {
    switch (sectionType) {
      case "document":
        return [
          { Header: "Title", accessor: "title", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
          {
            Header: "Link",
            accessor: "link",
            Cell: ({ value }: { value: any }) => <Typography>
            {String(value)}
            </Typography>
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: any }) => {
              const sectionDataId = row.original.sectionDataId;
              return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
            },
          },
        ];
      case "video":
        return [
          { Header: "Title", accessor: "title", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
          {
            Header: "Link",
            accessor: "link",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
          },
          {
            Header: "Description",
            accessor: "description",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: any }) => {
              const sectionDataId = row.original.sectionDataId;
              return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
            },
          },
        ];
      case "simulator":
        return [
          { Header: "Title", accessor: "title", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
          {
            Header: "ContentArea",
            accessor: "contentArea",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
          },
          {
            Header: "Guided",
            accessor: "guided",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>,
            minWidth: 40
          },
          {
            Header: "Unguided",
            accessor: "unguided",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>,
            minWidth: 40
          },
          {
            Header: "Practice",
            accessor: "practice",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>,
            minWidth: 40
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: any }) => {
              const sectionDataId = row.original.sectionDataId;
              return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
            },
          },
        ];
      case "content-cards":
        return [
          { Header: "Title", accessor: "title", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
          {
            Header: "Card Topic",
            accessor: "cardTopic",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
          },
          {
            Header: "Card Faces",
            accessor: "cardFaces",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: any }) => {
              const sectionDataId = row.original.sectionDataId;
              return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
            },
          },
        ];
      case "med-cards":
        return [
          { Header: "Title", accessor: "title", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
          {
            Header: "Link",
            accessor: "link",
            Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: any }) => {
              const sectionDataId = row.original.sectionDataId;
              return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
            },
          },
        ];
        case "CAT":
          return [
            { Header: "CAT Simulator", accessor: "catSimulator", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
            {
              Header: "Content Area Coverage",
              accessor: "contentAreaCoverage",
              Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography>
            },
            {
              Header: "Actions",
              accessor: "actions",
              Cell: ({ row }: { row: any }) => {
                const sectionDataId = row.original.sectionDataId;
                return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
              },
            },
          ];
      default:
        return [
          { Header: "Title", accessor: "title", Cell: ({ value }: { value: any }) => <Typography>{String(value)}</Typography> },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: any }) => {
              const sectionDataId = row.original.sectionDataId;
              return <ActionsCell sectionDataId={sectionDataId} onEdit={onEdit} onDelete={onDelete} />;
            },
          },
        ];
    }
  }, [sectionType, onEdit, onDelete]);

  return (
    <Box mt={8} sx={{ background: "rgba(59, 0, 134, 0.05)", borderRadius: "10px", height: "auto", marginX: "50px", paddingBottom: "20px", overflowX: 'auto'}}>
      <Box sx={{ borderBottom: "2px solid #3B0086", height: "auto", padding: "20px" }}>
        {formatSectionTitle(sectionType)} List
      </Box>
      <PaginatedTable
        columns={columns}
        data={tableData}
        noDataText="No data found"
        noDataFoundText="No data found"
        mobileFiltersConfig={{
          alwaysOnFilters: ["description"],
          menuFilters: ["title", "link"],
        }}
      />
    </Box>
  );
};
