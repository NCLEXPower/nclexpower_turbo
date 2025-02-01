import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditContentCardsBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditContentCards/EditContentCardsBlock";
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

jest.mock("@hookform/resolvers/yup", () => ({
  yupResolver: jest.fn(),
}));

jest.mock("jotai", () => ({
  atom: jest.fn(),
  useAtom: jest.fn(() => ["mockedValue", jest.fn()]),
}));

const mockProgramSectionList = [
  {
    sectionType: "ExampleSection",
    sectionData: [
      {
        sectionDataId: "1",
        title: "Example Title",
        cards: [{ cardTopic: "Example Topic", cardFaces: ["face1", "face2"] }],
      },
    ],
  },
];

jest.mock("../../../../../../../components", () => ({
  ComponentLoader: () => <div data-testid="component-loader">Loading...</div>,
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditContentCards/EditContentCardsField",
  () => ({
    EditContentCardsField: ({
      topics,
      handleAddTopic,
      handleRemoveTopic,
      onSave,
    }: any) => (
      <div>
        {topics.map((topic: any, index: number) => (
          <div key={index} data-testid={`topic-${index}`}>
            <button onClick={() => handleRemoveTopic(index)}>
              Remove Topic
            </button>
          </div>
        ))}
        <button onClick={handleAddTopic}>Add Topic</button>
        <button onClick={onSave}>Save</button>
      </div>
    ),
  })
);

describe("EditContentCardsBlock Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (fn: any) => fn,
      setValue: jest.fn(),
      getValues: jest.fn(() => ({ cards: [] })),
      watch: jest.fn(() => []),
    });

    (useAtom as jest.Mock).mockReturnValue(["1", jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <EditContentCardsBlock
        section="test-section"
        contentLoader={false}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders the component loader when contentLoader is true", () => {
    render(
      <EditContentCardsBlock contentLoader={true} onSubmit={mockOnSubmit} />
    );
    expect(screen.getByTestId("component-loader")).toBeInTheDocument();
  });

  it("renders topics and allows adding/removing topics", async () => {
    render(<EditContentCardsBlock onSubmit={mockOnSubmit} />);

    const addButton = screen.getByText("Add Topic");
    fireEvent.click(addButton);

    expect(screen.getByTestId("topic-0")).toBeInTheDocument();
  });

  it("calls onSubmit when the form is saved", async () => {
    render(<EditContentCardsBlock onSubmit={mockOnSubmit} />);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
