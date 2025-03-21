/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Grid, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { TableView } from "./component/TableView";
import TableViewIcon from "@mui/icons-material/TableView";
import DefaultViewIcon from "@mui/icons-material/ViewList";
import { ContainedCaseStudyQuestionType } from "../../../../types";
import { useAtom } from "jotai";
import { CreateCaseStudyAtom } from "../../../../useAtomic";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import {
  Button,
  ParsedHtml,
} from "../../../../../../../../../../../../../../components";
import { ItemContent } from "./component/Items/ItemContent";
import { BackgroundInfoContent } from "./component/BackgroundInfo/BackgroundInfoContent";
import { usePageLoaderContext } from "../../../../../../../../../../../../../../contexts/PageLoaderContext";
import { CaseStudyLoader } from "../../loader";
import { useExecuteToast } from "../../../../../../../../../../../../../../contexts";
import { convertToCreateCaseStudy } from "../../../../utils/convertToCreateCaseStudy";
import {
  useApiCallback,
  useBeforeUnload,
  useSanitizedInputs,
  useSensitiveInformation,
  useStyle,
} from "../../../../../../../../../../../../../../hooks";
import { CreateRegularType } from "../../../../../../../../../../../../../../api/types";

interface CaseStudySummaryProps {
  nextStep(values: Partial<ContainedCaseStudyQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedCaseStudyQuestionType>;
  next: () => void;
  previous: () => void;
  reset: () => void;
}

interface DefaultViewProps {
  data: Partial<ContainedCaseStudyQuestionType>;
  selectedQuestion: (value: number) => void;
}
const DefaultView: React.FC<DefaultViewProps> = ({
  data,
  selectedQuestion,
}) => {
  return (
    <Grid
      sx={{ mt: 3 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <Typography>MAIN TEXT :</Typography>
        <Box
          display="flex"
          flexDirection="column"
          padding="24px"
          border="1px solid #0C225C"
          overflow="auto"
          borderRadius="5px"
          mb={5}
        >
          <Typography variant="subtitle1" marginBottom="4px">
            <ParsedHtml html={data.mainText ?? ""} />
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" marginBottom="4px">
          BACKGROUND INFO :
        </Typography>
        <Box>
          <BackgroundInfoContent values={data} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" marginBottom="4px">
          ITEMS :
        </Typography>
        <Box>
          <ItemContent selectedQuestion={selectedQuestion} values={data} />
        </Box>
      </Grid>
    </Grid>
  );
};

export const CaseStudySummary: React.FC<CaseStudySummaryProps> = ({
  nextStep,
  previousStep,
  values,
  next,
  previous,
  reset,
}) => {
  useBeforeUnload(true);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [isTableView, setIsTableView] = useState<boolean>(false);
  const [caseStudyAtom] = useAtom(CreateCaseStudyAtom);
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const { purifyInputs } = useSanitizedInputs({});
  const { wordWrap } = useStyle();
  const createCaseStudyQuestion = useApiCallback(
    async (api, args: CreateRegularType) =>
      await api.webbackoffice.createRegularQuestion(args)
  );
  const { internal } = useSensitiveInformation();
  const { showToast } = useExecuteToast();

  useEffect(() => {
    setContentLoader(true);
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, []);

  const handleClick = () => {
    setIsTableView((prev) => !prev);
  };

  const handlePrevious = () => {
    previousStep();
    previous();
  };

  async function onSubmit() {
    try {
      if (caseStudyAtom) {
        const result = await createCaseStudyQuestion.execute(
          convertToCreateCaseStudy(caseStudyAtom, internal)
        );
        if (result.status === 200) {
          showToast("Case Study created successfully", "success");
          nextStep({});
          next();
        }
      }
    } catch (error) {
      handlePrevious();
      showToast("An error occurred while creating case study.", "error");
    }
  }

  if (contentLoader) {
    return <CaseStudyLoader />;
  }

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          textTransform: "uppercase",
          paddingTop: "12px",
        }}
      >
        Question and Answer Creation
      </Typography>
      <Box width="100%" display="flex" justifyContent="end" alignItems="center">
        <IconButton onClick={handleClick}>
          {isTableView ? <DefaultViewIcon /> : <TableViewIcon />}
        </IconButton>
      </Box>
      {isTableView ? (
        <TableView data={caseStudyAtom ?? {}} />
      ) : (
        <Box>
          <DefaultView
            selectedQuestion={(value) => setSelectedQuestion(value - 1)}
            data={caseStudyAtom ?? {}}
          />

          <Typography mt={4}>RATIONALE : </Typography>
          <Box
            display="flex"
            flexDirection="column"
            padding="24px"
            border="1px solid #0C225C"
            overflow="auto"
            borderRadius="5px"
          >
            <Typography
              sx={{
                ...wordWrap,
              }}
              component="div"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: purifyInputs(
                    caseStudyAtom?.questionnaires[selectedQuestion].rationale ??
                      ""
                  ) as TrustedHTML,
                }}
              />
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-between",
          paddingX: 5,
          display: "flex",
          marginTop: 5,
        }}
      >
        <Button onClick={handlePrevious} sx={{ zIndex: 1 }}>
          <TrendingFlatIcon sx={{ rotate: "180deg", color: "#37BEC7" }} />
          <Typography>Previous</Typography>
        </Button>
        <ConfirmationModal
          dialogContent="Are you sure you want to continue?"
          customButton="Continue"
          handleSubmit={onSubmit}
        />
      </Box>
    </Box>
  );
};
