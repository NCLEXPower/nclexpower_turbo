import { fireEvent, render, screen } from "../../../../common";
import { ProgramManagementListEditBlock } from "../../../../../system/app/internal/blocks";
import { useAtom } from "jotai";
import { StaticImageData } from "next/image";
import { useRouter } from "../../../../../core";
jest.mock(
  "../../../../../core/utils/contants/wc/programs/ProgramListData",
  () => ({
    standardProgramManagementList: [
      {
        id: "1",
        title: "Welcome to the Program",
        programStatus: "available",
        programImage: {} as StaticImageData,
        sections: [],
      },
    ],
  })
);

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../../../components", () => ({
  Button: ({ onClick, children, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  EvaIcon: ({ name }: any) => <span>{name}</span>,
  IconButton: ({ onClick, children, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  TextField: ({ name }: any) => <input name={name} />,
  FileUploadField: ({ onUpload }: any) => (
    <input type="file" onChange={(e) => onUpload(e.target.files)} />
  ),
  GenericSelectField: ({ onChange, options }: any) => (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

const mockBack = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  back: mockBack,
});

describe("ProgramManagementListEditBlock", () => {
  const setUpMocks = (programId: string = "1") => {
    (useAtom as jest.Mock).mockReturnValue([programId, jest.fn()]);
  };

  beforeEach(() => {
    setUpMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render the 'No program selected' message when a valid program is found", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    expect(
      screen.queryByText(
        "No program selected. Please go back to previous page."
      )
    ).not.toBeInTheDocument();

    expect(await screen.findByText("Edit Program")).toBeInTheDocument();
  });

  it("should render the form with program thumbnail and details", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditBlock />);

    expect(await screen.getByText("Program Thumbnail")).toBeInTheDocument();
    expect(await screen.getByText("Program Details")).toBeInTheDocument();
    expect(await screen.getByText("Program Name")).toBeInTheDocument();
  });

  it("should call handleBack when back button is clicked", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditBlock />);

    const backButton = await screen.findByTestId("back-button");

    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("renders the 'No program selected' message when no valid program is found", () => {
    setUpMocks("999");
    render(<ProgramManagementListEditBlock />);
    expect(
      screen.getByText("No program selected. Please go back to previous page.")
    ).toBeInTheDocument();
  });
});
