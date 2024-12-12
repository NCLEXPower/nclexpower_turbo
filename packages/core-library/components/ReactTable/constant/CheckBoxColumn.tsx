import { Checkbox } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

export const CheckBoxColumn = <T,>(): ColumnDef<T>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        data-testid="react-table-checkbox"
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          data-testid="react-table-checkbox"
          {...{
            disabled: !row.getCanSelect(),
            checked: row.getIsSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
];
