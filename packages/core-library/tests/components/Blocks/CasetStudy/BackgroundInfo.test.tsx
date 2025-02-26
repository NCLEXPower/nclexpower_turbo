import { useSanitizedInputs, useStyle } from "../../../../hooks";
import { BackgroundInfo } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/BackgroundInfo/BackgroundInfo";
import { SectionContent } from "../../../../system/app/internal/types";
import { render, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../hooks", () => ({
  useStyle: jest.fn(() => ({
    wordWrap: {
      "& *": {
        wordWrap: "break-word",
        wordBreak: "break-word",
        marginTop: "1em",
        minHeight: "1px",
      },
    },
  })),
  useSanitizedInputs: jest.fn(() => ({
    purifyInputs: jest.fn(),
  })),
}));

describe("BackgroundInfo", () => {
  const mockContent: SectionContent[] = [
    {
      seqContent: "testcontent",
      seqNum: 1,
    },
  ];

  it("Should render the background info", () => {
    render(<BackgroundInfo content={mockContent} />);
    const backgroundInfo = screen.getByTestId("test-content");

    expect(backgroundInfo).toBeInTheDocument();
  });
});
