/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect, useMemo, useState } from "react";
import { ContainedCaseStudyQuestionType } from "../../../../types";
import {
  Button,
  Card,
  ControlledRichTextEditor,
  Tabs,
  TextField,
} from "../../../../../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { AnswerCaseStudy } from "./AnswerCaseStudy";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { containedCaseStudyQuestionSchema } from "../../../../validation";
import ConfirmationModal from "../../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { BackgroundInfoTab } from "./components/BackgroundInfoTab";
import { atom, useAtom } from "jotai";
import { ErrorMapping } from "../../../../../../../../../../../../../../components";
import { CreateCaseStudyAtom } from "../../../../useAtomic";
import { InfoTabs } from "./constant/constant";
import { usePageLoaderContext } from "../../../../../../../../../../../../../../contexts/PageLoaderContext";
import { CaseStudyLoader } from "../../loader";
import { useBeforeUnload } from "../../../../../../../../../../../../../../hooks";

interface Props {
  nextStep(values: Partial<ContainedCaseStudyQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedCaseStudyQuestionType>;
  next: () => void;
  previous: () => void;
  reset: () => void;
}

type transitionHeaderAtomType = {
  seqNumber: number;
  transitionHeader: string;
};

export const transitionHeaderAtom = atom<transitionHeaderAtomType>();

export const CreateCaseStudyQuestion: React.FC<Props> = ({
  nextStep,
  previousStep,
  values,
  next,
  previous,
  reset,
}) => {
  useBeforeUnload(true);
  const [, setCaseStudyAtom] = useAtom(CreateCaseStudyAtom);
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const form = useForm<ContainedCaseStudyQuestionType>({
    mode: "onSubmit",
    resolver: yupResolver(containedCaseStudyQuestionSchema),
    context: { step: 2 },
    defaultValues: { ...values },
  });

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectItemIndex, setSelectedItemIndex] = useState<number>(0);
  const { getValues, reset: formReset, formState, handleSubmit, watch } = form;
  const { errors } = formState;
  const isStandAlone = watch("caseType") === "STANDALONE";
  const ITEM_LENGTH = isStandAlone ? 1 : 6;

  useEffect(() => {
    setContentLoader(true);
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, []);

  const onSubmit = async (values: ContainedCaseStudyQuestionType) => {
    setCaseStudyAtom(values);
    nextStep({ ...values });
    next();
  };

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  const generateInfoTabs = () => {
    return InfoTabs.map((tab, index) => ({
      id: index,
      title: tab.title,
      content: (
        <BackgroundInfoTab type={tab.type} isSequenceDisabled={isStandAlone} />
      ),
    }));
  };

  const generateTabsItemQuestion = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      title: `Item ${index + 1}`,
      content: <AnswerCaseStudy index={index} />,
    }));
  };

  useEffect(() => {
    formReset({
      ...getValues(),
    });
  }, [selectedIndex]);

  const { infoTabs, tabsItem } = useMemo(
    () => ({
      infoTabs: generateInfoTabs(),
      tabsItem: generateTabsItemQuestion(ITEM_LENGTH),
    }),
    [values]
  );

  if (contentLoader) {
    return <CaseStudyLoader />;
  }

  return (
    <Box>
      <FormProvider {...form}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            textTransform: "uppercase",
            my: 8,
          }}
        >
          Question and Answer Creation
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            width: "100%",
            gap: 5,
          }}
        >
          <Box flex={1}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                mb: 3,
              }}
            >
              Main Text:
            </Typography>
            <Card
              sx={{
                width: "100%",
                overflowY: "auto",
                position: "relative",
                borderRadius: "10px",
                border: 1,
                borderColor: "#0B225C",
              }}
            >
              <ControlledRichTextEditor editorFor="default" name="mainText" />
            </Card>
            <Box mt={3}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  mb: 3,
                }}
              >
                Background Info:
              </Typography>
              <Card
                sx={{
                  width: "100%",
                  overflowY: "auto",
                  position: "relative",
                  borderRadius: "10px",
                  border: 1,
                  borderColor: "#0B225C",
                }}
              >
                <Tabs
                  width="fit-content"
                  selectedTabIndex={(value) => setSelectedIndex(value)}
                  tabsItem={infoTabs}
                />
              </Card>
            </Box>
          </Box>

          <Box height={"90%"} flex={1}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                mb: 3,
              }}
            >
              Items:
            </Typography>
            <Card
              sx={{
                width: "100%",
                overflowY: "auto",
                position: "relative",
                borderRadius: "10px",
                borderColor: "#0B225C",
                border: 1,
              }}
            >
              <Tabs
                selectedTabIndex={(value) => setSelectedItemIndex(value)}
                width="fit-content"
                tabsItem={tabsItem}
              />
            </Card>
          </Box>
        </Box>
      </FormProvider>
      <Box
        width="fit-content"
        display="flex"
        justifyContent="end"
        sx={{ position: "fixed", top: "150px", right: "50px" }}
      >
        <Box width="fit-content">
          <ErrorMapping errors={errors} />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            justifyContent: "space-between",
            paddingX: 5,
            display: "flex",
            marginTop: 5,
          }}
        >
          <ConfirmationModal
            dialogContent="This action will reset all forms."
            confirmButtonText="Confirm"
            isLoading={false}
            customButton="Confirm"
            handleSubmit={handlePrevious}
          />
          <Button onClick={handleSubmit(onSubmit)}>Continue</Button>
        </Box>
      </Box>
    </Box>
  );
};
