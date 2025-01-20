import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { AnswerOptions, AnswerOptionsType } from "../../../../components";
import { render, renderHook, screen } from "../../../common";
import { useApi, useApiCallback } from "../../../../hooks";
import { DndOptionsType } from "../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/type";
import { HCPNAnswerOptionType } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import React from "react";
import { CustomFields } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudyCreation/components/CustomFields";

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn(),
}));

describe("CustomFields", () => {
  (useFormContext as jest.Mock).mockReturnValue({
    setValues: jest.fn(),
  });
  const { result } = renderHook(() => useForm());
  const form = result.current;

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <FormProvider {...form}>{children}</FormProvider>;
  };

  it("Should return HCP custom fields when question  type is HCP", () => {
    render(
      <Wrapper>
        <CustomFields questionIndex={1} questionType="HCP" />
      </Wrapper>
    );

    const hcpField = screen.getByTestId("hcp-custom-field");
    expect(hcpField).toBeInTheDocument();
  });

  it("Should return DNDBowTie custom fields when question  type is BowTie", () => {
    render(
      <Wrapper>
        <CustomFields questionIndex={1} questionType="BOWTIE" />
      </Wrapper>
    );

    const bowtieFields = screen.getByTestId("bowtie-custom-fields");
    expect(bowtieFields).toBeInTheDocument();
  });
});
