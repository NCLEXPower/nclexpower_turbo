import { render, screen } from "../../common";
import { useUsersAnalyticsData } from "../../../hooks/useUsersAnalyticsData";
import { UsersAnalyticsBlock } from "../../../system/app/internal/blocks/Hub/Analytics/AnalyticsBlocks/UsersAnalyticsBlock";
import { calculateGaugeData } from "../../../system/app/internal/blocks/Hub/Analytics/constants";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useUsersAnalyticsData");

describe("UsersAnalyticsBlock Component", () => {
  const mockUsersData = {
    selectedPeriod: "all",
    handlePeriodChange: jest.fn(),
    statsCardData: [
      { title: "Total Users", value: 80000, bgColor: "#181E2F" },
      { title: "RN Total Users", value: 50000, bgColor: "#2A61AC" },
      { title: "PN Total Users", value: 30000, bgColor: "#103436" },
    ],
    data: {
      RNStandardUsers: 20000,
      RNFastTrackUsers: 30000,
      PNStandardUsers: 15000,
      PNFastTrackUsers: 15000,
    },
  };

  beforeEach(() => {
    (useUsersAnalyticsData as jest.Mock).mockReturnValue(mockUsersData);
  });

  it("renders without crashing", () => {
    render(<UsersAnalyticsBlock />);
    const users = screen.getAllByText("Users");
    const total = screen.getAllByText("Total");

    expect(users).toHaveLength(3);
    expect(total).toHaveLength(3);

    expect(screen.getByText("RN")).toBeInTheDocument();
    expect(screen.getByText("PN")).toBeInTheDocument();
  });

  it("renders the TimePeriodCheckboxes", () => {
    render(<UsersAnalyticsBlock />);
    expect(screen.getByRole("checkbox", { name: /all/i })).toBeInTheDocument();
  });

  it("renders GaugeCards correctly", () => {
    render(<UsersAnalyticsBlock />);
    expect(screen.getByText("Registered Nurse Users")).toBeInTheDocument();
    expect(screen.getByText("Practical Nurse Users")).toBeInTheDocument();
  });

  it("correctly calculates the dataset for RN and PN users", () => {
    render(<UsersAnalyticsBlock />);

    expect(
      calculateGaugeData(
        mockUsersData.data.RNStandardUsers,
        mockUsersData.data.RNFastTrackUsers
      )
    ).toEqual({
      standardUsers: (20000 / (20000 + 30000)) * 100, // 40%
      fastTrackUsers: (30000 / (20000 + 30000)) * 100, // 60%
    });

    expect(
      calculateGaugeData(
        mockUsersData.data.PNStandardUsers,
        mockUsersData.data.PNFastTrackUsers
      )
    ).toEqual({
      standardUsers: (15000 / (15000 + 15000)) * 100, // 50%
      fastTrackUsers: (15000 / (15000 + 15000)) * 100, // 50%
    });
  });

  it("handles empty data gracefully", () => {
    (useUsersAnalyticsData as jest.Mock).mockReturnValue({
      ...mockUsersData,
      statsCardData: [],
      data: {},
    });

    const { container } = render(<UsersAnalyticsBlock />);
    expect(container).toBeInTheDocument();
  });
});
