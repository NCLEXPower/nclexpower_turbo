import { Instruction } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudyCreation/components/Instruction";
import { render, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("Instruction block ", () => {
  it("should render the instruciton block", () => {
    render(<Instruction questionType="DDCloze" />);

    const block = screen.getByTestId("instruction-block");
    expect(block).toBeInTheDocument();
  });

  it("should render the instruction for DDC and DND", () => {
    render(<Instruction questionType="DDCloze" />);

    expect(
      screen.getByText(
        /Write your text with \[\[placeholder\]\] for answer fields, e\.g\., The capital of\[\[country\]\] is \[\[city\]\]\./i
      )
    ).toBeInTheDocument();
  });

  it("should render the instruction for Drop down table", () => {
    render(<Instruction questionType="DDTable" />);

    expect(
      screen.getByText(
        /Write your text with \[\[placeholder\]\] placed inside table cells, e\.g\., The capital of country \[\[city\]\]\./i
      )
    ).toBeInTheDocument();
  });

  it("should render the default instruction", () => {
    render(<Instruction questionType="Bowtie" />);

    expect(
      screen.getByText(
        /Complete all blank fields and proceed to another question/i
      )
    ).toBeInTheDocument();
  });
});
