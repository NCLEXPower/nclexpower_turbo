/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import {
  Button,
  GenericSelectField,
} from "../../../../../../../../../../../components";
import {
  Control,
  useFormContext,
} from "react-hook-form";
import { RouteManagementSchema } from "../../../../validation";
import {
  SystemRequirements,
} from "../../constant/constant";
import React, { useMemo } from 'react';

type RouteCreationFormPropsType = {
  onSubmit: (value: RouteManagementSchema) => void;
}

export const RouteCreationForm: React.FC<RouteCreationFormPropsType> = ({ onSubmit }) => {
  const { handleSubmit } =
    useFormContext<RouteManagementSchema>();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        {SystemRequirements.length > 0 &&
          SystemRequirements.map((item, index) => (
            <Box key={index} sx={{ width: "33%" }}>
              <GenericSelectField
                name={item.value}
                label={item.label}
                options={item.options ?? []}
                sx={{ width: "100%" }}
              />
            </Box>
          ))}
      </Box>
      <Button
        buttonActionType="submit"
        onClick={handleSubmit(onSubmit)}
        sx={{ borderRadius: "10px", width: "150px", alignSelf: "end" }}
      >
        Create Menu
      </Button>
    </Box>
  );
};
