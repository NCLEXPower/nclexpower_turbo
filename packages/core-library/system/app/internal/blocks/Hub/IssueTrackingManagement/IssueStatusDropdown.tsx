/**
Property of the Arxon Solutions, LLC.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import React, { useState } from "react";
import { FormControl, Select, MenuItem, Box } from "@mui/material";
import { StatusStyles, StatusBadge } from "./utils/StatusBadge";
import { statusDropdownStyle, getStatusDropdownStyle } from "./styles/style"; 
import { getStatusLabel } from "./utils/statusHelpers";

interface StatusDropdownProps extends React.HTMLAttributes<HTMLSelectElement>{
  selectedStatus: number;
  setSelectedStatus: (status: number) => void;
  statusOptions: number[];
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
    setSelectedStatus(parseInt(event.target.value));
  };

  const statusLabel = getStatusLabel(selectedStatus);
  const bgColor = StatusStyles[statusLabel]?.backgroundColor || "#6c757d";

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
          ...statusDropdownStyle,
          ...getStatusDropdownStyle(isDropdownOpen, bgColor),
        }}
        renderValue={() => (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <StatusBadge status={getStatusLabel(selectedStatus)} />
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
              <StatusBadge status={getStatusLabel(status)} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};