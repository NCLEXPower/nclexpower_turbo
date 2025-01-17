import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "../../../../../forms/TextField";
import { ControlledCheckbox } from "../../../../../Checkbox/Checkbox";
import { Button } from "../../../../../Button/Button";
import { useMCQTableConfig } from "../../../../../../hooks";
import { MCQTableCreation } from "./components/MCQTableCreation";
import { useAtom } from "jotai";
import {
  MCQColumnAtom,
  MCQRowAtom,
} from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/useAtomic";

type BowtiePropsType = {
  questionIndex: number;
};

export const MCQGroup: React.FC<BowtiePropsType> = ({ questionIndex }) => {
  const { watch, setValue, getValues } = useFormContext();
  const questionnaires = watch(`questionnaires`);
  const [column, setColumn] = useAtom<number>(MCQColumnAtom);
  const [row, setRow] = useAtom<number>(MCQRowAtom);
  useMCQTableConfig({ row, column, setValue, getValues, questionnaires });

  const ButtonFunctions = [
    {
      action: "add",
      count: column,
      setCount: setColumn,
      limit: 2,
      label: "Add Column",
    },
    {
      action: "add",
      count: row,
      setCount: setRow,
      limit: 2,
      label: "Add Row",
    },
    {
      action: "remove",
      count: row,
      setCount: setRow,
      limit: 2,
      label: "Delete Row",
    },
    {
      action: "remove",
      count: column,
      setCount: setColumn,
      limit: 2,
      label: "Delete Column",
    },
  ];

  console.log("questionnaires : ", questionnaires);

  return (
    <Box sx={{ padding: 5 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          padding: 5,
          flexWrap: "wrap",
        }}
      >
        {ButtonFunctions.map(
          ({ action, count, setCount, limit, label }, index) => (
            <Button
              key={index}
              onClick={() => {
                if (action === "add") {
                  setCount(count + 1);
                } else if (action === "remove" && count > limit) {
                  setCount(count - 1);
                }
              }}
              disabled={action === "remove" && count <= limit}
              sx={{ borderRadius: 20, fontSize: 14, minWidth: "none" }}
            >
              {label}
            </Button>
          )
        )}
      </Box>

      <Box
        sx={{
          overflowX: "auto",
          width: "100%",
          maxWidth: "550px",
          overflowY: "hidden",
          height: "fit-content",
        }}
      >
        <MCQTableCreation
          column={column}
          row={row}
          questionIndex={questionIndex}
        />
      </Box>
    </Box>
  );
};
