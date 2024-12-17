import { AnnouncementPage } from "../../../system/app/internal/blocks/Hub/Announcement/AnnouncementPage";
import { fireEvent, screen, render } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));


describe("Success Page", () => {
  it("should render the Announcement Page without error", () => {
    render(
      <AnnouncementPage />
    );
  });
  it('should render the AnnouncementPage component', () => {
    render(
      <AnnouncementPage />
    );
    expect(screen.getByPlaceholderText('Add the content title here....')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should display validation errors when form fields are empty', async () => {
    render(<AnnouncementPage />);
    fireEvent.click(screen.getByText(/Submit/i));
    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
  });

  it('should render the File Upload Field component', () => {
    render(
      <AnnouncementPage />
    );
    expect(screen.getByTestId('hidden-upload-input')).toBeInTheDocument();
  });
});
