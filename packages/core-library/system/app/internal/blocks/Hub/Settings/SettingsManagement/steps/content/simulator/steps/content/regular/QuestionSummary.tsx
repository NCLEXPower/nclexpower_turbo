import React, { useEffect } from "react";
import { ContainedRegularQuestionType } from "../../../types";
import { Box, Grid, Typography } from "@mui/material";
import {
  Button,
  SummaryAccordion,
  Alert,
} from "../../../../../../../../../../../../../components";
import ConfirmationModal from "../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useAtom } from "jotai";
import { CreateRegularAtom } from "../../../useAtomic";
import { useBusinessQueryContext } from "../../../../../../../../../../../../../contexts";
import { SummaryAccordionLoader } from "../loader";
import { convertToCreateRegularType } from "../../../utils/convertToCreateRegularType";
import { usePageLoaderContext } from "../../../../../../../../../../../../../contexts/PageLoaderContext";
import { useInternalInfo } from "../../../../../../../../../../../../../hooks";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  next: () => void;
  previous: () => void;
}

export const QuestionSummary: React.FC<Props> = ({
  nextStep,
  previousStep,
  next,
  previous,
}) => {
  const [questionnaireAtom] = useAtom(CreateRegularAtom);

  const { businessQueryCreateRegularQuestion } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreateRegularQuestion();
  const internalInformation = useInternalInfo();

  const { contentLoader, setContentLoader } = usePageLoaderContext();

  useEffect(() => {
    setContentLoader(true);
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, []);

  async function onSubmit() {
    try {
      if (questionnaireAtom && internalInformation) {
        await mutateAsync(
          convertToCreateRegularType(questionnaireAtom, internalInformation)
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      nextStep({});
      next();
    }
  }

  const handleBackButton = () => {
    previousStep();
    previous();
  };

  if (contentLoader) {
    return <SummaryAccordionLoader />;
  }

  return (
    <Grid
      sx={{ mt: 3, p: 4 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Box display="flex" width="100%" marginBottom="25px" position="relative">
        <Button onClick={handleBackButton} sx={{ zIndex: 1 }}>
          <TrendingFlatIcon sx={{ rotate: "180deg", color: "#37BEC7" }} />
          <Typography>Previous</Typography>
        </Button>
        <Box
          marginTop="30px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            zIndex: 0,
          }}
        >
          <Typography variant="h5">
            <b>Question and Answer Summary</b>
          </Typography>
          <Typography variant="h5" data-testid={`questionType`}>
            <b>({questionnaireAtom?.type})</b>
          </Typography>
          <Alert
            severity="info"
            title="Please ensure all information is accurate before proceeding."
          />
        </Box>
      </Box>
      <Box
        marginTop="45px"
        width="100%"
        minHeight="350px"
        display="flex"
        flexDirection="column"
        marginX="25px"
        gap="8px"
        sx={{
          backgroundColor: "#F3F3F3",
          borderRadius: "10px",
        }}
      >
        {questionnaireAtom?.questionnaires &&
          questionnaireAtom?.questionnaires.map((item, index) => (
            <SummaryAccordion
              item={item}
              type={questionnaireAtom.type || ""}
              index={index}
              key={index}
            />
          ))}
      </Box>
      <Box display="flex" justifyContent="end" width="100%" marginTop="20px">
        <ConfirmationModal
          dialogContent="Are you sure you want to continue?"
          customButton="Continue"
          handleSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Box>
    </Grid>
  );
};
