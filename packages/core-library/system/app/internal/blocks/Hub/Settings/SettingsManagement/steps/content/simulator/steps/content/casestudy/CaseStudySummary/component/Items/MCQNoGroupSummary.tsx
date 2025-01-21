import {
  Columns,
  QuestionnaireItem,
  Row
} from "../../../../../../../../../../../../../types";
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

export const MCQNoGroupSummary: React.FC<Partial<QuestionnaireItem>> = ({
  data
}) => {
  if (!data) return "No available data...";

  const renderRadio = (row: Row, columnIndex: number) => {
    const choice = row.choices[columnIndex - 1];
    return (
      <Radio
        checked={choice?.value}
        disabled
      />
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead style={{ backgroundColor: "#007AB7", color: "white" }}>
          <TableRow>
            {data.columns?.map((column: Columns) => (
              <TableCell
                key={column.label}
                align="center"
                style={{ color: "white" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: "#F0F0F0" }}>
          {data.rows?.map((row: Row) => (
            <TableRow key={row.rowId}>
              <TableCell component="th" scope="row">
                {row.rowTitle}
              </TableCell>
              {data.columns.slice(1).map((column: Columns, index: number) => (
                <TableCell key={column.label} align="center">
                  {renderRadio(row, index + 1)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}