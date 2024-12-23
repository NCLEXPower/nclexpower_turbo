import { AnnouncementManagementBlock } from "../../../system/app/internal/blocks";
import { fireEvent, screen, render } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts/TabsContext.tsx", () => ({
  useTabsContext: jest.fn(() => ({
    activeTabIndex: 0,
    onTabChanged: jest.fn(),
  })),
}));


describe("Success Page", () => {
  it("should render the Announcement Page without error", () => {
    render(
      <AnnouncementManagementBlock />
    );
  });

  it("should contain the Announcement Management Alert", () => {
    render(<AnnouncementManagementBlock />);
    expect(screen.getByText("Announcement Management")).toBeInTheDocument();
    expect(screen.getByText(/You can create and view all the announcement/i)).toBeInTheDocument();
  });

  it("should render the Create Announcement tab by default", () => {
    render(<AnnouncementManagementBlock />);
    expect(screen.getByText("Create Announcement")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add the content title here....")).toBeInTheDocument();
  });

  it("should switch to the View Lists of Announcement tab when clicked", () => {
    render(<AnnouncementManagementBlock />);
    fireEvent.click(screen.getByText("View Lists of Announcement"));
    expect(screen.getByText("View Lists of Announcement")).toBeInTheDocument();
  });

});
