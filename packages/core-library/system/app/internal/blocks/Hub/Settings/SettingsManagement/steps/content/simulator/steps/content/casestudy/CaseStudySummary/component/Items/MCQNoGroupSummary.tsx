import { QuestionnaireItem } from "../../../../../../../../../../../../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio
} from '@mui/material';

type RowType = {
  rowId: string;
  rowTitle: string;
  choices: Record<string, boolean>;
}

type ColumnType = {
  label: string;
  columnId: string;
}

export const MCQNoGroupSummary: React.FC<Partial<QuestionnaireItem>> = ({
  data
}) => {
  if (!data.tableData) return "No available data...";

  const renderRadio = (row: RowType, column: ColumnType) => {
    return (
      <Radio
        checked={row.choices[column.columnId]}
        disabled
      />
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead style={{ backgroundColor: "#007AB7", color: "white" }}>
          <TableRow>
            {data.tableData.columns.map((column: ColumnType) => (
              <TableCell
                key={column.columnId}
                align="center"
                style={{ color: "white" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: "#F0F0F0" }}>
          {data.tableData.rows.map((row: RowType) => (
            <TableRow key={row.rowId}>
              <TableCell component="th" scope="row">
                {row.rowTitle}
              </TableCell>
              {data.tableData.columns.slice(1).map((column: ColumnType) => (
                <TableCell key={column.columnId} align="center">
                  {renderRadio(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}