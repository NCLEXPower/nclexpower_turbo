import React, { useEffect, useState } from "react";
import { SettingsSelectionType } from "../../types";
import { Box, Typography } from "@mui/material";
import { useApiCallback } from "../../../../../../../../../hooks";
import {
  Button,
  Card,
  ComponentLoader,
  ConfirmationModal,
  EvaIcon,
} from "../../../../../../../../../components";
import { useExecuteToast } from "../../../../../../../../../contexts";
import { getHasChatBotWidget } from "../../../../../../../../../ssr";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

export const ChatBotHeplWidget: React.FC<Props> = ({
  nextStep,
  previousStep,
}) => {
  const [helpWidgetStatus, setHelpWidgetStatus] = useState<boolean>(false);
  const [isChatBotLoading, setIsChatbotLoading] = useState<boolean>(true);
  const { execute: updateMode, loading: updateLoading } = useApiCallback(
    async (api, args: boolean) =>
      await api.webbackoffice.updateHelpWidgetStatus(args)
  );

  const fetchChatbotHelpWidgetStatus = async () => {
    try {
      const { isEnabled } = await getHasChatBotWidget();
      setHelpWidgetStatus(isEnabled);
    } catch (error) {
      showToast("Something went wrong, Please try again later", "error");
    } finally {
      setIsChatbotLoading(false);
    }
  };

  useEffect(() => {
    fetchChatbotHelpWidgetStatus();
  }, []);

  const { showToast } = useExecuteToast();

  const handleBack = () => {
    previousStep();
  };

  if (isChatBotLoading || updateLoading) {
    return (
      <Box data-testid="loading">
        <ComponentLoader />
      </Box>
    );
  }

  const toggleMessage = () => {
    const message = helpWidgetStatus ? "OFF" : "ON";
    return message;
  };

  async function handleConfirm() {
    try {
      await updateMode(!helpWidgetStatus);
      await fetchChatbotHelpWidgetStatus();
      showToast("Successfully Update", "success");
    } catch {
      showToast("Something went wrong. Please try again later", "error");
    }
  }

  return (
    <Box
      data-testid="chatbot-mode-id"
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
      <Card sx={{ width: "50%", px: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            Show Chat Widget
          </Typography>
          <ConfirmationModal
            isLoading={false}
            handleSubmit={handleConfirm}
            checked={helpWidgetStatus}
            customButton="ToggleButton"
            dialogContent={`Are you sure you want to turn ${toggleMessage()} chatbot widget`}
          />
        </Box>
      </Card>
    </Box>
  );
};
