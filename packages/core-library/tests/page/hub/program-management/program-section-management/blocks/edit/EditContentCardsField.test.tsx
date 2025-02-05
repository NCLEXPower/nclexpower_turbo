/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { render, screen, fireEvent } from "../../../../../../common";
import { useForm, FormProvider, Control } from "react-hook-form";
import { EditContentCardsField } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditContentCards/EditContentCardsField";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  ...jest.requireActual("../../../../../../../components"),
  EvaIcon: jest.fn(() => <svg>Icon</svg>),
}));

jest.mock("../../../../../../../components", () => ({
  FileUploadField: ({ triggerLabel }: { triggerLabel: string }) => (
    <button>{triggerLabel}</button>
  ),
  TextField: ({
    name,
    placeholder,
  }: {
    name: string;
    control: any;
    placeholder: string;
  }) => <input name={name} placeholder={placeholder} />,
  Button: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn().mockReturnValue({
    control: {},
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    formState: {
      isSubmitting: false,
      isValid: true,
    },
  }),
  useController: jest.fn().mockReturnValue({
    field: {
      value: "",
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    fieldState: {
      error: undefined,
    },
  }),
}));

interface FormValues {
  title: string;
  cards: {
    cardTopic: string;
    cardFaces: File[];
  }[];
}

const setupForm = () => {
  const methods = useForm<FormValues>();
  return { methods };
};

const mockOnSave = jest.fn();
const mockHandleAddTopic = jest.fn();
const mockHandleRemoveTopic = jest.fn();
const mockHandleAddCardFace = jest.fn();
const mockHandleRemoveCardFace = jest.fn();
const mockHandleFileChange = jest.fn();

const setup = () => {
  const { methods } = setupForm();

  const topics = [
    {
      cardTopic: "Topic 1",
      cardFaces: [new File([""], "file1.jpg")],
    },
  ];

  render(
    <FormProvider {...methods}>
      <EditContentCardsField
        topics={topics}
        control={methods.control as Control<FormValues>}
        section="Section 1"
        onSave={mockOnSave}
        handleAddTopic={mockHandleAddTopic}
        handleRemoveTopic={mockHandleRemoveTopic}
        handleAddCardFace={mockHandleAddCardFace}
        handleRemoveCardFace={mockHandleRemoveCardFace}
        handleFileChange={mockHandleFileChange}
        getValues={methods.getValues}
      />
    </FormProvider>
  );
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "http://dummyurl.com");
});

describe("EditContentCardsField", () => {
  test("renders the title", () => {
    setup();

    expect(screen.getByText(/Edit Section 1 item/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter title/i)).toBeInTheDocument();
  });

  it("calls handleAddTopic when 'Add Topic' button is clicked", () => {
    setup();

    const addTopicButton = screen.getByText("Add Topic");
    fireEvent.click(addTopicButton);

    expect(mockHandleAddTopic).toHaveBeenCalled();
  });

  it("calls handleAddCardFace when 'Add Card' button is clicked", () => {
    setup();

    const addCardButton = screen.getByText("Add Card");
    fireEvent.click(addCardButton);

    expect(mockHandleAddCardFace).toHaveBeenCalled();
  });

  it("calls handleSaveClick when 'Update' button is clicked", () => {
    setup();

    const saveButton = screen.getByText("Update");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });
});
