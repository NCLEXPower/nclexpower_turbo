/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, waitFor, fireEvent } from "../../../../../../common";
import { EditVideoField } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditVideo/EditVideoField";
import { useForm, FormProvider, Control } from "react-hook-form";
import { Suspense } from "react";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
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

jest.mock("react-player", () => () => <div data-testid="mock-react-player" />);

jest.mock("../../../../../../../components", () => ({
  FileUploadField: ({ triggerLabel }: { triggerLabel: string }) => (
    <button>{triggerLabel}</button>
  ),
  TextField: ({
    name,
    control,
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
  ControlledRichTextEditor: () => <textarea />,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => {
    return <img {...props} />;
  },
}));
interface FormValues {
  title: string;
  link: File[];
  videoPlaceholder: File[];
  authorName: string;
  authorImage: File[];
  description: string;
}

const setupForm = () => {
  const methods = useForm<FormValues>();
  return { methods };
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "http://dummyurl.com");
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("EditVideoField", () => {
  it("renders and displays the correct initial content", async () => {
    const { methods } = setupForm();

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <FormProvider {...methods}>
          <EditVideoField
            control={methods.control as Control<FormValues>}
            onSave={jest.fn()}
            section="test"
            videoFileName=""
            videoLink={[]}
            videoPlaceholderFileName=""
            videoPlaceholderLink={[]}
            authorImageFileName=""
            authorImageLink={[]}
          />
        </FormProvider>
      </Suspense>
    );

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /edit test item/i })
      ).toBeInTheDocument()
    );
  });

  it("renders all form fields", async () => {
    const { methods } = setupForm();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={jest.fn()}
          section="test"
          videoFileName=""
          videoLink={[]}
          videoPlaceholderFileName=""
          videoPlaceholderLink={[]}
          authorImageFileName=""
          authorImageLink={[]}
        />
      </FormProvider>
    );

    expect(screen.getByText(/title/i, { exact: false })).toBeInTheDocument();
  });

  it("calls onSave when update button is clicked", async () => {
    const { methods } = setupForm();
    const onSaveMock = jest.fn();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={onSaveMock}
          section="test"
          videoFileName=""
          videoLink={[]}
          videoPlaceholderFileName=""
          videoPlaceholderLink={[]}
          authorImageFileName=""
          authorImageLink={[]}
        />
      </FormProvider>
    );

    const button = screen.getByRole("button", { name: /update/i });
    fireEvent.click(button);

    await waitFor(() => expect(onSaveMock).toHaveBeenCalled());
  });

  it("renders video player with correct URL", async () => {
    const { methods } = setupForm();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={jest.fn()}
          section="test"
          videoFileName="http://example.com/video.mp4"
          videoLink={[]}
          videoPlaceholderFileName=""
          videoPlaceholderLink={[]}
          authorImageFileName=""
          authorImageLink={[]}
        />
      </FormProvider>
    );

    expect(screen.getByTestId("mock-react-player")).toBeInTheDocument();
  });

  it("renders video placeholder with correct image", async () => {
    const { methods } = setupForm();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={jest.fn()}
          section="test"
          videoFileName=""
          videoLink={[]}
          videoPlaceholderFileName="http://example.com/placeholder.jpg"
          videoPlaceholderLink={[]}
          authorImageFileName=""
          authorImageLink={[]}
        />
      </FormProvider>
    );

    const image = screen.getByAltText("video placeholder");
    expect(image).toHaveAttribute("src", "http://example.com/placeholder.jpg");
  });

  it("renders author image with correct image", async () => {
    const { methods } = setupForm();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={jest.fn()}
          section="test"
          videoFileName=""
          videoLink={[]}
          videoPlaceholderFileName=""
          videoPlaceholderLink={[]}
          authorImageFileName="http://example.com/author.jpg"
          authorImageLink={[]}
        />
      </FormProvider>
    );

    const image = screen.getByAltText("author image");
    expect(image).toHaveAttribute("src", "http://example.com/author.jpg");
  });
});