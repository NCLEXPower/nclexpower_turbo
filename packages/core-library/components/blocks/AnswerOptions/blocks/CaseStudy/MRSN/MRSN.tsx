import React from "react";
import { Card } from "../../../../../Card/Card";
import { Box } from "@mui/material";
import { SATA } from "../../Regular/SATA/SATA";
import { GenericSelectField } from "../../../../../Textfield/GenericSelectField";
import { maxAnswer } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";

type MrsnPropsType = {
  questionIndex: number;
};

export const MRSN: React.FC<MrsnPropsType> = ({ questionIndex }) => {
  const deletionLimit = 0;

  return (
    <Card>
      <Box
        data-testid="mrsn-form"
        sx={{ display: "flex", justifyContent: "end", p: 2 }}
      >
        <GenericSelectField
          name={`questionnaires.${questionIndex}.maxAnswer`}
          label="Max Correct Answer"
          labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
          options={maxAnswer ?? []}
          width="50%"
        />
      </Box>
      <SATA questionIndex={questionIndex} />
    </Card>
  );
};
