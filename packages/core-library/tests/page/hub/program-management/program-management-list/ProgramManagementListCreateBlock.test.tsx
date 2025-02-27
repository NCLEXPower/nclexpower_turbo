/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { render, screen, fireEvent, waitFor } from "../../../../common";
import { ProgramManagementListCreateBlock } from "../../../../../system/app/internal/blocks";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "../../../../../core";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
  useFieldArray: jest.fn(),
}));
jest.mock("../../../../../core", () => ({
  useRouter: jest.fn(),
}));
jest.mock(
  "../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-management-list/blocks/create/ProgramManagementListCreateField",
  () => ({
    ProgramManagementListCreateField: jest.fn(() => (
      <div>Program Management Form</div>
    )),
  })
);

jest.mock(
  "../../../../../core/utils/contants/wc/programs/ProgramListData",
  () => ({
    programSectionList: [
      { sectionTitle: "Section 1", sectionType: "video", sectionData: [] },
      { sectionTitle: "Section 2", sectionType: "audio", sectionData: [] },
    ],
  })
);

describe("ProgramManagementListCreateBlock", () => {
  let mockHandleSubmit: jest.Mock;
  let mockHandleBack: jest.Mock;
  let mockSetValue: jest.Mock;
  let mockAppend: jest.Mock;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    mockHandleBack = jest.fn();
    mockSetValue = jest.fn();
    mockAppend = jest.fn();

    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      setValue: mockSetValue,
      getValues: jest.fn(),
      watch: jest.fn(),
      formState: { errors: {} },
    });

    (useFieldArray as jest.Mock).mockReturnValue({
      fields: [],
      append: mockAppend,
    });

    (useRouter as jest.Mock).mockReturnValue({
      back: mockHandleBack,
    });
  });

  it("renders the component", () => {
    render(<ProgramManagementListCreateBlock />);

    expect(screen.getByText("Program Management Form")).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", async () => {
    render(<ProgramManagementListCreateBlock />);

    fireEvent.submit(screen.getByText("Program Management Form"));

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });
});
