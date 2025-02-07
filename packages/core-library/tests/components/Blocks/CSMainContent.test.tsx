import { render, screen } from "../../common";
import { CSMainContent } from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/CSMainContent";
import { BackgroundInfoContent } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/BackgroundInfo/BackgroundInfoContent";
import { ItemContent } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/ItemContent";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/BackgroundInfo/BackgroundInfoContent",
  () => ({
    BackgroundInfoContent: jest.fn(() => <div>Background Info Content</div>),
  })
);

jest.mock(
  "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/ItemContent",
  () => ({
    ItemContent: jest.fn(() => <div>Item Content</div>),
  })
);

describe("CSMainContent", () => {
  const mockMainContent = [{ someKey: "someValue" }];

  it("renders BackgroundInfoContent and ItemContent with correct data", () => {
    render(<CSMainContent mainContent={mockMainContent} />);

    expect(screen.getByText("Background Info Content")).toBeInTheDocument();
    expect(screen.getByText("Item Content")).toBeInTheDocument();

    expect(screen.getByText("BACKGROUND INFO :")).toBeInTheDocument();
    expect(screen.getByText("ITEMS :")).toBeInTheDocument();
  });

  it("renders the correct data passed through mainContent", () => {
    render(<CSMainContent mainContent={mockMainContent} />);

    expect(BackgroundInfoContent).toHaveBeenCalledWith(
      { values: mockMainContent[0] },
      {}
    );
    expect(ItemContent).toHaveBeenCalledWith(
      { values: mockMainContent[0] },
      {}
    );
  });
});
