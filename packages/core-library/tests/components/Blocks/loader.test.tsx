import React from "react";
import { render, screen } from "../../common";
import {
  QuestionTypeSelectionLoader,
  CreateQuestionLoader,
  SummaryAccordionLoader,
  CasenameSelectionLoader,
  CaseStudyLoader,
} from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader";

jest.mock("../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({
    publicRuntimeConfig: { processEnv: {} },
  }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../../../components", () => ({
  AnimatedBoxSkeleton: jest.fn(({ height, light }) => (
    <div
      data-testid="animated-box-skeleton"
      data-height={height}
      data-light={light}
    />
  )),
}));

describe("Loaders Components", () => {
  it("renders QuestionTypeSelectionLoader with grid items", () => {
    render(<QuestionTypeSelectionLoader />);
    expect(screen.getAllByTestId("animated-box-skeleton")).toHaveLength(2);
  });

  it("renders CreateQuestionLoader correctly", () => {
    render(<CreateQuestionLoader />);
    expect(screen.getAllByTestId("animated-box-skeleton")).toBeTruthy();
  });

  it("renders SummaryAccordionLoader correctly", () => {
    render(<SummaryAccordionLoader />);
    expect(screen.getAllByTestId("animated-box-skeleton")).toBeTruthy();
  });

  it("renders CasenameSelectionLoader with skeleton boxes", () => {
    render(<CasenameSelectionLoader />);
    expect(screen.getAllByTestId("animated-box-skeleton")).toBeTruthy();
  });

  it("renders CaseStudyLoader with grid items", () => {
    render(<CaseStudyLoader />);
    expect(screen.getAllByTestId("animated-box-skeleton")).toBeTruthy();
  });
});
