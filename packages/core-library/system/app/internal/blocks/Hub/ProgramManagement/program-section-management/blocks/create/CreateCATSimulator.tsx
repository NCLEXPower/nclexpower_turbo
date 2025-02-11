/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import {
  Button,
  ComponentLoader,
  EvaIcon,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CATSchema, SectionFormType } from "../../validation";
import { useState } from "react";
import { formatSectionTitle } from "../../../../../../../../../utils";
import { useSelectfieldOptions } from "../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";

interface CreateCATSimulatorProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
}

export const CreateCATSimulator: React.FC<CreateCATSimulatorProps> = ({
  section,
  contentLoader,
  onSubmit,
}) => {
  const [contentAreaCoverageList, setContentAreaCoverageList] = useState<
    string[]
  >([""]);
  const { cleanedContentArea } = useSelectfieldOptions();

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(CATSchema),
    defaultValues: {
      catSimulator: "",
      contentAreaCoverage: [],
    },
  });

  const { control, handleSubmit, setValue } = form;

  const handleContentAreaChange = (selectedValue: string, index: number) => {
    const updatedList = [...contentAreaCoverageList];
    updatedList[index] = selectedValue;
    setContentAreaCoverageList(updatedList);
    setValue("contentAreaCoverage", updatedList);
  };

  const handleAddNew = () => {
    setContentAreaCoverageList([...contentAreaCoverageList, ""]);
  };

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
          {contentAreaCoverageList?.length ? (
            contentAreaCoverageList.map((_, index) => (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <GenericSelectField
                  control={control}
                  name={`contentAreaCoverage.${index}`}
                  options={cleanedContentArea ?? []}
                  value={contentAreaCoverageList[index]}
                  onChange={(e) => handleContentAreaChange(e, index)}
                  sx={{
                    borderRadius: "5px",
                    width: "100%",
                    backgroundColor: "#FFF",
                    border: "1px solid #3B0086",
                  }}
                />
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "red" }}>
              No content area coverage available.
            </Typography>
          )}
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
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
