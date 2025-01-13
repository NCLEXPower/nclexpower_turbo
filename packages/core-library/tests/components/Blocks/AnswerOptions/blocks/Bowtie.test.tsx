import { screen, render } from "../../../../common";
import { useFormContext } from "react-hook-form";
import { Bowtie } from "../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/Bowtie/Bowtie";
import { BowtieFieldGroups } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";

jest.mock("../../../../../components/Checkbox/Checkbox", () => ({
  ControlledCheckbox: ({ name }: { name: string }) => (
    <input type="checkbox" data-testid={name} />
  ),
}));
jest.mock("../../../../../components/forms/TextField", () => ({
  TextField: ({ name }: { name: string }) => <input data-testid={name} />,
}));

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../hooks/useSynchronizeSectionWithLabel", () =>
  jest.fn()
);

jest.mock("../../../../../components", () => ({
  ControlledCheckbox: ({ name }: { name: string }) => (
    <input type="checkbox" data-testid={name} />
  ),
  TextField: ({ name }: { name: string }) => <input data-testid={name} />,
}));

describe("Bowtie Component", () => {
  const mockWatch = jest.fn();
  const mockQuestionIndex = 1;

  beforeEach(() => {
    mockWatch.mockReset();
    (useFormContext as jest.Mock).mockReturnValue({
      control: {},
      watch: mockWatch,
    });
  });

  it("renders left, center, and right sections with default labels", () => {
    mockWatch.mockImplementation((name) => {
      switch (name) {
        case "questionnaires.0.leftLabelName":
          return "";
        case "questionnaires.0.centerLabelName":
          return "";
        case "questionnaires.0.rightLabelName":
          return "";
        default:
          return undefined;
      }
    });

    render(<Bowtie questionIndex={0} />);

    expect(screen.getByText("Left Label")).toBeInTheDocument();
    expect(screen.getByText("Center Label")).toBeInTheDocument();
    expect(screen.getByText("Right Label")).toBeInTheDocument();

    BowtieFieldGroups.forEach((_, groupIndex) => {
      const section =
        groupIndex === 0
          ? "leftSection"
          : groupIndex === 1
            ? "centerSection"
            : "rightSection";
      const count = groupIndex === 1 ? 4 : 5;

      for (let i = 0; i < count; i++) {
        expect(
          screen.getByTestId(`questionnaires.0.${section}.${i}.value`)
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(`questionnaires.0.${section}.${i}.isAnswer`)
        ).toBeInTheDocument();
      }
    });
  });

  it("should render Bowtie", () => {
    render(<Bowtie questionIndex={mockQuestionIndex} />);
    const bowtieSection = screen.getByTestId("bowtie-section");
    expect(bowtieSection).toBeInTheDocument();
  });

  it("renders custom labels when provided", () => {
    mockWatch.mockImplementation((name) => {
      switch (name) {
        case "questionnaires.0.leftLabelName":
          return "Custom Left";
        case "questionnaires.0.centerLabelName":
          return "Custom Center";
        case "questionnaires.0.rightLabelName":
          return "Custom Right";
        default:
          return undefined;
      }
    });

    render(<Bowtie questionIndex={0} />);

    expect(screen.getByText("Custom Left")).toBeInTheDocument();
    expect(screen.getByText("Custom Center")).toBeInTheDocument();
    expect(screen.getByText("Custom Right")).toBeInTheDocument();
  });
});
