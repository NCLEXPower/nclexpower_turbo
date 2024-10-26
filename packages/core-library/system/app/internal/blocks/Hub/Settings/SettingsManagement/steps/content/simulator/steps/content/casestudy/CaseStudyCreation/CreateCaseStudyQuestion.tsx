/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect, useState } from "react";
import { ContainedCaseStudyQuestionType } from "../../../../types";
import {
  Button,
  Card,
  Tabs,
} from "../../../../../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { AnswerCaseStudy } from "./AnswerCaseStudy";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { containedCaseStudyQuestionSchema } from "../../../../validation";
import ConfirmationModal from "../../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { BackgroundInfoTab } from "./components/BackgroundInfoTab";
import { caseStudyQuestionnaires } from "../../../../../../../constants/constants";
import { atom, useAtom } from "jotai";
import { ErrorMapping } from "../../../../../../../../../../../../../../components";
import { CreateCaseStudyAtom } from "../../../../useAtomic";

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
  const [caseStudyAtom, setCaseStudyAtom] = useAtom(CreateCaseStudyAtom);
  const form = useForm<ContainedCaseStudyQuestionType>({
    mode: "all",
    resolver: yupResolver(containedCaseStudyQuestionSchema),
    defaultValues: {
      questionnaires: Array.from({ length: 6 }, (_, index) => ({
        ...caseStudyQuestionnaires,
        itemNum: index + 1,
      })),
      caseName: values.caseName,
    },
  });

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const {
    getValues,
    control,
    reset: formReset,
    formState,
    handleSubmit,
  } = form;

  const updateValues = () => {
    formReset({
      ...getValues(),
    });
  };
  const { errors } = formState;

  const onSubmit = async (values: ContainedCaseStudyQuestionType) => {
    console.log(values);
    setCaseStudyAtom(values);
    nextStep({ ...values });
    next();
  };

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  const InfoTabs = [
    {
      title: "Nurse Notes",
      type: "nurseNotes",
    },
    {
      title: "HxPhy",
      type: "hxPhy",
    },
    {
      title: "Labs",
      type: "labs",
    },
    {
      title: "Orders",
      type: "orders",
    },
  ];

  const generateInfoTabs = () => {
    return InfoTabs.map((tab, index) => ({
      id: index,
      title: tab.title,
      content: <BackgroundInfoTab type={tab.type} />,
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
    updateValues();
  }, [selectedIndex, control]);

  const BGInfoTabs = generateInfoTabs();
  const TabsItemQuestion = generateTabsItemQuestion(6);

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
          <Box width={"55%"}>
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
                borderColor: "#8E2ADD",
              }}
            >
              <Tabs
                width="fit-content"
                selectedTabIndex={(value) => setSelectedIndex(value)}
                tabsItem={BGInfoTabs}
              />
            </Card>
          </Box>
          <Box height={"90%"} width={"45%"}>
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
                border: 1,
                borderColor: "#8E2ADD",
              }}
            >
              <Tabs width="fit-content" tabsItem={TabsItemQuestion} />
            </Card>
          </Box>
        </Box>
      </FormProvider>
      <Box width="fit-content" display="flex" justifyContent="end" sx={{ position: 'fixed', top: '150px', right: '50px' }}>
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
