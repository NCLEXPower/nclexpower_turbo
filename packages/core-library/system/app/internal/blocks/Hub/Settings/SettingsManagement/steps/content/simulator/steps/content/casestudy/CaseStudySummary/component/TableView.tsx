import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { ContainedCaseStudyQuestionType } from "../../../../../types";
import { Column, FilterProps } from "react-table";
import {
  DefaultColumnFilter,
  PaginatedTable,
  usePaginatedTable,
} from "../../../../../../../../../../../../../../../components/table";

interface Props {
  data: Partial<ContainedCaseStudyQuestionType>;
}

export const TableView: React.FC<Props> = ({ data }) => {
  const { updateFilters } = usePaginatedTable<
    Partial<ContainedCaseStudyQuestionType>
  >({ propertyName: "questionnaires" }, {});
  const columns = useMemo(
    () =>
      [
        {
          Header: "Item Number",
          accessor: "itemNum",
          Filter: (props: FilterProps<{}>) =>
            DefaultColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
            }),
          filter: "contains",
          width: "25%",
        },
        {
          Header: "Sequence Number",
          accessor: "seqNum",
          Filter: (props: FilterProps<{}>) =>
            DefaultColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
            }),
          filter: "contains",
          width: "25%",
        },

        {
          Header: "Question Type",
          accessor: "questionType",
          filter: "equals",
          width: "25%",
        },
        {
          Header: "Max Points",
          accessor: "maxPoints",
          filter: "equals",
          width: "25%",
        },
      ] as Column<
        Partial<ContainedCaseStudyQuestionType["questionnaires"][0]>
      >[],
    []
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      bgcolor="Background"
    >
      <Box sx={{ width: "100%", paddingX: "120px" }} margin="25px">
        {data.caseName && data.caseName.length > 0 && (
          <Typography fontSize="24px" fontWeight="bold">
            Case Name :{" "}
            <Typography
              component="span"
              sx={{ color: "#0C225C", fontSize: "24px", fontWeight: "bold" }}
            >
              {data.caseName.join(" and ")}
            </Typography>
          </Typography>
        )}
      </Box>
      <Box
        sx={{ bgcolor: "ButtonFace", overflow: "hidden", borderRadius: "7px" }}
        border="1px solid #D4AEF2"
        width="80%"
      >
        <PaginatedTable
          columns={columns}
          data={data.questionnaires ?? []}
          noDataText="No data found"
          noDataFoundText="No data found"
          disableCheckbox
          mobileFiltersConfig={{
            alwaysOnFilters: ["seqNum"],
            menuFilters: ["maxPoints"],
          }}
        />
      </Box>
    </Box>
  );
};
