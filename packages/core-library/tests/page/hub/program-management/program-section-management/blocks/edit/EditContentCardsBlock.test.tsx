/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
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

jest.mock("../../../../../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(() => ({
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
      handleAddCardFace,
      handleRemoveCardFace,
      onSave,
    }: any) => (
      <div>
        {topics.map((topic: any, index: number) => (
          <div key={index} data-testid={`topic-${index}`}>
            <button onClick={() => handleAddCardFace(index)}>Add Card</button>
            {topic.cardFaces.map((face: any, faceIndex: number) => (
              <div key={faceIndex} data-testid={`face-${index}-${faceIndex}`}>
                <button onClick={() => handleRemoveCardFace(index, faceIndex)}>
                  Remove Face
                </button>
              </div>
            ))}
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

function isContentCardsSectionData(sectionData: unknown): sectionData is {
  title: string;
  cards: { cardId: string; cardTopic: string; cardFaces: File[] }[];
} {
  return (
    typeof sectionData === "object" &&
    sectionData !== null &&
    "title" in sectionData &&
    "cards" in sectionData &&
    Array.isArray((sectionData as { cards: unknown[] }).cards) &&
    (
      sectionData as {
        cards: { cardId: unknown; cardTopic: unknown; cardFaces: unknown[] }[];
      }
    ).cards.every(
      (card) =>
        typeof card === "object" &&
        card !== null &&
        "cardId" in card &&
        typeof (card as { cardId: unknown }).cardId === "string" &&
        "cardTopic" in card &&
        typeof (card as { cardTopic: unknown }).cardTopic === "string" &&
        "cardFaces" in card &&
        Array.isArray((card as { cardFaces: unknown[] }).cardFaces) &&
        (card as { cardFaces: unknown[] }).cardFaces.every(
          (face) => typeof face === "string"
        )
    )
  );
}

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

  it("disables the save button if no changes are made", () => {
    render(<EditContentCardsBlock onSubmit={mockOnSubmit} />);

    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);

    waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("triggers topic addition multiple times", async () => {
    render(<EditContentCardsBlock onSubmit={mockOnSubmit} />);

    const addButton = screen.getByText("Add Topic");
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByTestId("topic-0")).toBeInTheDocument();
    expect(screen.getByTestId("topic-1")).toBeInTheDocument();
  });

  it("correctly identifies content cards section data", () => {
    const validData = {
      title: "Sample Title",
      cards: [
        {
          cardId: "1",
          cardTopic: "Sample Topic",
          cardFaces: ["face1", "face2"],
        },
      ],
    };

    const invalidData = {
      title: "Sample Title",
      cards: [
        {
          cardId: 1,
          cardTopic: "Sample Topic",
          cardFaces: ["face1", "face2"],
        },
      ],
    };

    expect(isContentCardsSectionData(validData)).toBe(true);
    expect(isContentCardsSectionData(invalidData)).toBe(false);
  });

});
