/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import { Button, EvaIcon } from "../../../../../../../../../components";
import { EnvironmentItem, SettingsSelectionType } from "../../types";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../contexts";
import useMaintenanceMode from "../../../../../../../../../hooks/useMaintenanceMode";
import { EnvironmentSelection } from "./EnvironmentSelection";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}
export const WCMaintenanceMode: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
}) => {
  const { data, loading, dateCommenced } = useMaintenanceMode();
  const { businessQueryCommenceEnvMaintenanceMode } = useBusinessQueryContext();
  const { mutateAsync } = businessQueryCommenceEnvMaintenanceMode();
  const { showToast } = useExecuteToast();

  const confirmChange = async (Env: EnvironmentItem) => {
    const checker = data?.currentMaintenanceMode.includes(Env.label);
    await mutateAsync([Env.label]);
    showToast(
      `${Env.label.toUpperCase()} Environment is now ${checker ? "Active" : "Under Maintenance"} `,
      "success"
    );
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    !loading && (
      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Button
          onClick={previousStep}
          variant="text"
          size="small"
          sx={{
            ml: 5,
            display: "flex",
            alignSelf: "self-start",
            bgcolor: "#dedeec",
            padding: 3,
            borderRadius: "15px",
          }}
        >
          <EvaIcon
            id="back-icon"
            name="arrow-ios-back-outline"
            fill="#0F2A71"
            width={20}
            height={20}
            ariaHidden
          />
          Back
        </Button>
        <Box sx={{ width: "80%" }}>
          <Typography color="#3B0086" fontWeight={700} variant="h2">
            Web Customer : Maintenance Mode
          </Typography>
          <Typography color="#3B0086" fontWeight={700} variant="h6">
            Last Update : {dateCommenced}
          </Typography>
          <EnvironmentSelection
            onSubmit={confirmChange}
            currentMaintenance={data?.currentMaintenanceMode}
            isLoading={loading}
          />
        </Box>
      </Box>
    )
  );
};
