import { render, screen, waitFor, fireEvent } from "../../../../../../common";
import { EditVideoField } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditVideo/EditVideoField";
import { useForm, FormProvider, Control } from 'react-hook-form';

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
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
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    fieldState: {
      error: undefined,
    },
  }),
}));

jest.mock('../../../../../../../components', () => ({
  FileUploadField: ({ triggerLabel }: { triggerLabel: string }) => <button>{triggerLabel}</button>,
  TextField: ({ name, control, placeholder }: { name: string, control: any, placeholder: string }) => (
    <input name={name} placeholder={placeholder} />
  ),
  Button: ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ControlledRichTextEditor: () => <textarea />
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
    global.URL.createObjectURL = jest.fn(() => 'http://dummyurl.com');
  });

describe('EditVideoField', () => {
  it('renders and displays the correct initial content', () => {
    const { methods } = setupForm();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={jest.fn()}
          linkValue=""
          videoPlaceholderValue=""
          authorImageValue=""
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

    expect(screen.getByRole('heading', { name: /edit test item/i })).toBeInTheDocument();
  });

  it('calls onSave when the "Update" button is clicked', async () => {
    const mockOnSave = jest.fn();
    const { methods } = setupForm();

    render(
      <FormProvider {...methods}>
        <EditVideoField
          control={methods.control as Control<FormValues>}
          onSave={mockOnSave}
          linkValue="video-link"
          videoPlaceholderValue="placeholder"
          authorImageValue="author-image"
          section="test"
          videoFileName="video.mp4"
          videoLink={[]}
          videoPlaceholderFileName="placeholder.jpg"
          videoPlaceholderLink={[]}
          authorImageFileName="author.jpg"
          authorImageLink={[]}
        />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => expect(mockOnSave).toHaveBeenCalledTimes(1));
  });
});
