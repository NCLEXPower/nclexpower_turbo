/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import {
  Button,
  ControlledCheckbox,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../../components";
import { formatSectionTitle } from "../../../../../../../../../../utils";
import { Control } from "react-hook-form";
import { GetCategoryType } from "../../../../../../../../../../api/types";

interface EditSimulatorFieldProps {
  lists: Omit<GetCategoryType, "id">[] | undefined;
  section?: string;
  control: Control<{
    title: string;
    contentArea: string;
    guided: boolean;
    unguided: boolean;
    practice: boolean;
  }>;
  handleChange: (value: string) => void;
  onSave: () => void;
  isLoading?: boolean;
}

const checkboxes: {
  label: string;
  name: "guided" | "unguided" | "practice";
}[] = [
    { label: "Guided", name: "guided" },
    { label: "Unguided", name: "unguided" },
    { label: "Practice", name: "practice" },
  ];

export const EditSimulatorField: React.FC<EditSimulatorFieldProps> = ({
  lists,
  section,
  control,
  handleChange,
  onSave,
  isLoading,
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
          Edit {formatSectionTitle(section)} item
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: 4,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ color: "#3B0086" }}>Title*:</Typography>
                <TextField
                  name="title"
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
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {checkboxes.map(({ label, name }) => (
                  <Grid item xs={4} key={name}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: "#3B0086" }}>
                        {label}*
                      </Typography>
                      <ControlledCheckbox control={control} name={name} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "#3B0086", mb: 2 }}>
              Content Area Coverage* :
            </Typography>
            <GenericSelectField
              control={control}
              name="contentArea"
              options={lists ?? []}
              onChange={(e) => handleChange(e)}
              sx={{
                borderRadius: "5px",
                width: "100%",
                backgroundColor: "#FFF",
                border: "1px solid #3B0086",
                marginTop: 3,
              }}
            />
          </Box>

          <Button
            sx={{
              mt: 4,
              alignSelf: "flex-end",
              width: "157px",
              background: "#3B0086",
              borderRadius: "10px",
              color: "white",
            }}
            loading={isLoading}
            onClick={onSave}
            data-testid="edit-simulator-save-button"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
