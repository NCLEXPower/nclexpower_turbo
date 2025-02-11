/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Button,
  EvaIcon,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../../components";
import { formatSectionTitle } from "../../../../../../../../../../utils";
import { Control } from "react-hook-form";
import { GetCategoryType } from "../../../../../../../../../../api/types";

interface EditCATSimulatorFieldProps {
  lists: Omit<GetCategoryType, "id">[] | undefined;
  section?: string;
  control: Control<{ catSimulator: string; contentAreaCoverage: string[] }>;
  handleChange: (selectedValue: string, index: number) => void;
  onSave: (values: any) => void;
  handleAddNew: () => void;
  coverageList: string[];
}

export const EditCATSimulatorField: React.FC<EditCATSimulatorFieldProps> = ({
  lists,
  section,
  control,
  handleChange,
  handleAddNew,
  onSave,
  coverageList,
}) => {
  return (
    <Box
      sx={{
        mt: 8,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingX: 12,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "rgba(59, 0, 134, 0.05)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ padding: 4, borderBottom: "2px solid #3B0086" }}
        >
          Create {formatSectionTitle(section)} item
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "#3B0086" }}>Title*:</Typography>
            <TextField
              name="catSimulator"
              control={control}
              placeholder="Enter title"
              sx={{
                borderRadius: "10px",
                width: "100%",
                background: "white",
              }}
              inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
            />
          </Box>

          <Typography sx={{ color: "#3B0086" }}>
            Content Area Coverage*:
          </Typography>
          {coverageList?.map((value, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
              <GenericSelectField
                control={control}
                name={`contentAreaCoverage.${index}`}
                options={lists ?? []}
                value={value}
                onChange={(e) => handleChange(e, index)}
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  backgroundColor: "#FFF",
                  border: "1px solid #3B0086",
                }}
              />
            </Box>
          ))}

          <Button
            sx={{
              mt: 4,
              alignSelf: "flex-start",
              width: "157px",
              background: "#3B0086",
              borderRadius: "10px",
              color: "white",
              display: "flex",
            }}
            onClick={handleAddNew}
          >
            <EvaIcon name="plus-outline" fill="#ffffff" />{" "}
            <Typography>Add New</Typography>
          </Button>

          <Button
            sx={{
              mt: 4,
              alignSelf: "flex-end",
              width: "157px",
              background: "#3B0086",
              borderRadius: "10px",
              color: "white",
            }}
            onClick={onSave}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
