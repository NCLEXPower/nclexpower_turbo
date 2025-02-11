/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Grid, Typography } from "@mui/material";
import {
  Button,
  ComponentLoader,
  ControlledCheckbox,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { simulatorSchema, SectionFormType } from "../../validation";
import { formatSectionTitle } from "../../../../../../../../../utils";
import { useSelectfieldOptions } from "../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";

interface CreateSimulatorProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
}

const checkboxes: {
  label: string;
  name: "guided" | "unguided" | "practice";
}[] = [
  { label: "Guided", name: "guided" },
  { label: "Unguided", name: "unguided" },
  { label: "Practice", name: "practice" },
];

export const CreateSimulator: React.FC<CreateSimulatorProps> = ({
  section,
  contentLoader,
  onSubmit,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(simulatorSchema),
    defaultValues: simulatorSchema.getDefault(),
  });

  const handleContentAreaChange = (selectedValue: string) => {
    setValue("contentArea", selectedValue);
  };
  const { cleanedContentArea } = useSelectfieldOptions();

  const { control, handleSubmit, setValue } = form;

  if (contentLoader) {
    return <ComponentLoader />;
  }
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
              options={cleanedContentArea ?? []}
              onChange={(e) => handleContentAreaChange(e)}
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
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
