import React, { useMemo } from "react";

import {
  CaseStudyQuestionTypeFormSteps,
  ChooseCaseStudyQuestionType,
  ChooseQuestionTypeStep,
  CreationType,
  QuestionTypeFormSteps,
  QuestionTypeStepProps,
} from "../ChooseQuestionType";
import {
  ContainedCaseStudyQuestionType,
  ContainedRegularQuestionType,
} from "../types";
import { useActiveSteps, useWizardForm, WizardFormMap } from '../../../../../../../../../../../hooks';
import { Stepper } from '../../../../../../../../../../../components';

export const useQuestionManagementWizardSteps = () => {
  const steps = useMemo(() => {
    return {
      ...ChooseQuestionTypeStep,
    } as WizardFormMap<
      Partial<QuestionTypeFormSteps>,
      ContainedRegularQuestionType,
      QuestionTypeStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<ContainedRegularQuestionType> | undefined,
    values: Partial<ContainedRegularQuestionType>
  ): Partial<ContainedRegularQuestionType> => ({
    ...prev,
    ...values,
  });

  const { renderStep, reset } = useWizardForm<
    QuestionTypeFormSteps,
    ContainedRegularQuestionType,
    QuestionTypeStepProps
  >(steps, formWizardValues, "InitialQuestionTypeSelection");

  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  const {
    activeStep,
    next,
    previous,
    reset: resetStep,
  } = useActiveSteps(stepLabels.length);
  return {
    render: (
      <React.Fragment>
        <Stepper activeStep={activeStep} steps={stepLabels} />
        {renderStep({ isLoading: false, next, previous, resetStep, reset })}
      </React.Fragment>
    ),
  };
};

export const useCaseStudyQuestionManagementWizardSteps = () => {
  const steps = useMemo(() => {
    return { ...ChooseCaseStudyQuestionType } as WizardFormMap<
      Partial<CaseStudyQuestionTypeFormSteps>,
      ContainedCaseStudyQuestionType,
      QuestionTypeStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<ContainedCaseStudyQuestionType> | undefined,
    values: Partial<ContainedCaseStudyQuestionType>
  ): Partial<ContainedCaseStudyQuestionType> => ({
    ...prev,
    ...values,
  });

  const { renderStep, reset } = useWizardForm<
    CaseStudyQuestionTypeFormSteps,
    ContainedCaseStudyQuestionType,
    QuestionTypeStepProps
  >(steps, formWizardValues, "InitialCaseNameSelection");

  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  const {
    activeStep,
    next,
    previous,
    reset: resetStep,
  } = useActiveSteps(stepLabels.length);
  return {
    render: (
      <React.Fragment>
        <Stepper activeStep={activeStep} steps={stepLabels} />
        {renderStep({ isLoading: false, next, previous, resetStep, reset })}
      </React.Fragment>
    ),
  };
};
