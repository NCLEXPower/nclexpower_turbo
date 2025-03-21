import React, { useState } from "react";
import { FormControl, Select, MenuItem, Box } from "@mui/material";
import { StatusStyles, StatusBadge } from "./StatusBadge";
import { statusDropdownStyle } from "./style"; 

interface StatusDropdownProps extends React.HTMLAttributes<HTMLSelectElement>{
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  statusOptions: string[];
}

export const IssueStatusDropdown: React.FC<StatusDropdownProps> = ({
  selectedStatus,
  setSelectedStatus,
  statusOptions,
  ...rest
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { "data-testid": testId, ...otherProps } = rest as { "data-testid"?: string } & Omit<
    React.HTMLAttributes<HTMLSelectElement>,
    "data-testid"
  >;

  const handleChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <FormControl>
      <Select
        value={selectedStatus}
        onChange={handleChange}
        onOpen={() => setIsDropdownOpen(true)}
        onClose={() => setIsDropdownOpen(false)}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transform: "translateY(0px) !important",
            },
          },
        }}
        sx={{
          "&.Mui-focused": {
            backgroundColor: StatusStyles[selectedStatus]?.backgroundColor || "#6c757d",
            borderRadius: "6px",
            outline: "none !important",
            boxShadow: "none",
          },
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 5px 0px 8px !important",
            borderRadius: "6px",
            backgroundColor: StatusStyles[selectedStatus]?.backgroundColor || "#6c757d",
          },
          "& .MuiSelect-icon": {
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: isDropdownOpen ? "translateY(-50%) rotate(0deg)" : "translateY(-50%) rotate(-90deg)",
            transition: "transform 0.3s ease",
            fill: "white",
            backgroundColor: "transparent",
            borderRadius: "6px",
          },
          ...statusDropdownStyle,
        }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", backgroundColor: "inherit" }}>
            <StatusBadge status={selected as string} />
            <Box sx={{ width: "24px" }} />
          </Box>
        )}
      >
        {statusOptions
          .filter((status) => status !== selectedStatus)
          .map((status) => (
            <MenuItem
              key={status}
              value={status}
              sx={{
                justifyContent: "center",
                padding: "5px",
                margin: "0px",
                "&:last-child": {
                  marginBottom: "0px",
                },
                "&:first-child": {
                  marginTop: "0px",
                },
              }}
            >
              <StatusBadge status={status} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};