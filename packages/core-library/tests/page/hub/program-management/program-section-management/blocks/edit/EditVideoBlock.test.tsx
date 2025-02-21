import { render, screen } from "@testing-library/react";
import { EditVideoBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditVideo/EditVideoBlock";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  ComponentLoader: jest.fn(() => <div>Loading...</div>),
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditVideo/EditVideoField",
  () => ({
    EditVideoField: jest.fn(() => <div>Edit Video Field</div>),
  })
);

jest.mock("../../../../../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetRegularQuestionDDCategory: jest.fn(() => ({
      data: [],
    })),
    businessQueryGetSectionsByType: jest.fn(() => ({
      data: [
        {
          sectionId: "123",
          sectionType: "simulator",
          sectionTitle: "Sample Section",
          sectionData: [
            {
              sectionDataId: "456",
              title: "Simulator Section",
              contentArea: "Sample Content",
              guided: "true",
              unguided: "false",
              practice: "true",
            },
          ],
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
  })),
}));

const mockOnSubmit = jest.fn();

describe("EditVideoBlock Component", () => {
  let setValue: jest.Mock;
  let handleSubmit: jest.Mock;
  let control: any;

  beforeEach(() => {
    setValue = jest.fn();
    handleSubmit = jest.fn();
    control = {};

    (useForm as jest.Mock).mockReturnValue({
      setValue,
      handleSubmit,
      control,
      watch: jest.fn(),
      getValues: jest.fn(),
    });

    (useAtom as jest.Mock).mockReturnValue(["some-id"]);
  });

  it("should render ComponentLoader when contentLoader is true", () => {
    render(
      <EditVideoBlock
        section="video"
        contentLoader={true}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render EditVideoField when contentLoader is false", () => {
    render(
      <EditVideoBlock
        section="video"
        contentLoader={false}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Edit Video Field")).toBeInTheDocument();
  });
});
