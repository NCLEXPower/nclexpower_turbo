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
  Tabs,
} from "../../../../../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { AnswerCaseStudy } from "./AnswerCaseStudy";
import { FormProvider, useForm } from "react-hook-form";
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
  const [, setCaseStudyAtom] = useAtom(CreateCaseStudyAtom);
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const form = useForm<ContainedCaseStudyQuestionType>({
    mode: "all",
    resolver: yupResolver(containedCaseStudyQuestionSchema),
    context: { step: 2 },
    defaultValues: { ...values },
  });

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const { getValues, reset: formReset, formState, handleSubmit } = form;
  const { errors } = formState;

  useEffect(() => {
    setContentLoader(true);
    setTimeout(() => {
      setContentLoader(false);
    }, 6000);
  }, []);

  const onSubmit = async (values: ContainedCaseStudyQuestionType) => {

    console.log(values)


    // setCaseStudyAtom(values);
    // nextStep({ ...values });
    // next();
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
    formReset({
      ...getValues(),
    });
  }, [selectedIndex]);

  const { infoTabs, tabsItem } = useMemo(
    () => ({
      infoTabs: generateInfoTabs(),
      tabsItem: generateTabsItemQuestion(6),
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
                borderColor: "#0B225C",
                border: 1,
              }}
            >
              <Tabs width="fit-content" tabsItem={tabsItem} />
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
