import React from "react";
import { Box, Typography, TableRow, TableCell } from "@mui/material";
import {
  DataTable,
  DataTableHeader,
} from "../../../../../../../../../../../../../../../components";
import { ContainedCaseStudyQuestionType } from "../../../../../types";

interface Props {
  data: Partial<ContainedCaseStudyQuestionType>;
}

export const TableView: React.FC<Props> = ({ data }) => {
  const tableHeaders: DataTableHeader[] = [
    {
      name: "Item Number",
      align: "center",
      sx: {
        cell: { border: "1px solid #D4AEF2" },
      },
    },
    {
      name: "Sequence Number",
      align: "center",
      sx: {
        cell: { border: "1px solid #D4AEF2" },
      },
    },
    {
      name: "Question Type",
      align: "center",
      sx: {
        cell: { border: "1px solid #D4AEF2" },
      },
    },
    {
      name: "Max Points",
      align: "center",
      sx: {
        cell: { border: "1px solid #D4AEF2" },
      },
    },
  ];

  const rows =
    data.questionnaires?.map((content, index) => ({
      id: index,
      itemNum: content.itemNum,
      seqNum: content.seqNum,
      questionType: content.questionType,
      maxPoints: content.maxPoints,
    })) || [];

  const renderRow = (rowData: (typeof rows)[0], index: number) => (
    <TableRow key={index}>
      <TableCell align="center" sx={{ border: "1px solid #D4AEF2" }}>
        {rowData.itemNum}
      </TableCell>
      <TableCell align="center" sx={{ border: "1px solid #D4AEF2" }}>
        {rowData.seqNum}
      </TableCell>
      <TableCell align="center" sx={{ border: "1px solid #D4AEF2" }}>
        {rowData.questionType}
      </TableCell>
      <TableCell align="center" sx={{ border: "1px solid #D4AEF2" }}>
        {rowData.maxPoints}
      </TableCell>
    </TableRow>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box margin="25px">
        {data.caseName && data.caseName.length > 0 && (
          <Typography fontWeight="bold">
            {data.caseName.join(" and ")}
          </Typography>
        )}
      </Box>
      <Box border="1px solid #D4AEF2" width="80%">
        <DataTable
          data={rows}
          tableHeaders={tableHeaders}
          bodyRowComponent={renderRow}
          loading={false}
        />
      </Box>
    </Box>
  );
};
