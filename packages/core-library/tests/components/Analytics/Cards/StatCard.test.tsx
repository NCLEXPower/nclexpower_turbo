import { render, screen, waitFor } from "../../../common";
import {
  RenderStatCards,
  StatCard,
} from "../../../../system/app/internal/blocks/Hub/Analytics/Cards";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("StatCard Component", () => {
  const mockProps = {
    title: "Total Sales",
    value: 500000,
    currency: "$",
    bgColor: "#2A61AC",
  };

  it("renders the title correctly", () => {
    render(<StatCard {...mockProps} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
  });

  it("renders the formatted value correctly", () => {
    render(<StatCard {...mockProps} />);
    expect(screen.getByText("$500K")).toBeInTheDocument();
  });

  it("applies the correct background color", async () => {
    render(<StatCard {...mockProps} />);

    const element = screen.getByTestId("stat-card");

    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle(`background: ${mockProps.bgColor}`);
  });
});

describe("RenderStatCards Component", () => {
  const mockData = [
    { title: "Total Users", value: 1000, currency: "$", bgColor: "#181E2F" },
    { title: "New Users", value: 500, currency: "$", bgColor: "#2A61AC" },
    { title: "Active Users", value: 750, currency: "$", bgColor: "#103436" },
  ];

  it("renders all stat cards correctly", () => {
    render(<RenderStatCards data={mockData} />);

    const usersElements = screen.getAllByText("Users");

    expect(usersElements.length).toBe(3);
    expect(screen.getByText("Total")).toBeInTheDocument();

    expect(screen.getByText("$1K")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();

    expect(screen.getByText("$500")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(screen.getByText("$750")).toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    const { container } = render(<RenderStatCards data={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
