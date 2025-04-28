/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useSetAtom } from "jotai";
import { SelectedConfirmationObj } from "../../../../../../../../../components/Dialog/DialogFormBlocks/inclusion/useAtomic";
import { useMaintenanceMode } from "../../../../../../../../../hooks";
import { SettingsSelectionType } from "../../types";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../contexts";
import { Box, Typography } from "@mui/material";
import {
  Button,
  EvaIcon,
  PageLoader,
} from "../../../../../../../../../components";
import { EnvironmentSelection } from "../content/component/EnvironmentSelection";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

export const MaintenanceMode: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
}) => {
  const { data, loading, dateCommenced, refetch } = useMaintenanceMode();
  const setStatus = useSetAtom(SelectedConfirmationObj);
  const { businessQueryCommenceEnvMaintenanceMode } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCommenceEnvMaintenanceMode();
  const { showToast } = useExecuteToast();

  const confirmChange = async (environment: string) => {
    const checker = data?.currentMaintenanceMode.includes(environment);
    await mutateAsync([environment]);
    refetch();
    showToast(
      `${environment.toUpperCase()} Environment is now ${checker ? "Active" : "Under Maintenance"} `,
      "success"
    );
  };

  const handleBack = () => {
    setStatus(null);
    previousStep();
  };

  if (loading) {
    return (
      <Box data-testid="fetch-loading">
        <PageLoader />
      </Box>
    );
  }

  return (
    <Box
      data-testid="maintenance-mode-id"
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
        onClick={handleBack}
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
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};
