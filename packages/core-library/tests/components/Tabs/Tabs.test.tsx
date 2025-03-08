import { render } from "@testing-library/react";
import { screen, waitFor, fireEvent } from "../../common";
import { Tabs } from "../../../components";
import { TabsItem } from "../../../core/utils/contants/tabs-item";
import { useResolution } from "../../../hooks";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useResolution: jest.fn(),
}));

const tabsItem: TabsItem[] = [
  { id: 1, title: "Tab 1", content: "Content 1" },
  { id: 2, title: "Tab 2", content: "Content 2" },
];

describe("Tabs Component", () => {
  beforeEach(() => {
    (useResolution as jest.Mock).mockReturnValue({ isMobile: false });
  });

  it("renders tabs with correct titles", () => {
    render(<Tabs tabsItem={tabsItem} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("applies justifyContent prop correctly", async () => {
    const { container } = render(
      <Tabs tabsItem={tabsItem} justifyContent="flex-start" />
    );
    const gridContainer = container.querySelector(
      ".MuiGrid-root .MuiGrid-container"
    );

    await waitFor(() => {
      expect(window.getComputedStyle(gridContainer!).justifyContent).toBe(
        "flex-start"
      );
    });
  });

  it("selects a tab on click", () => {
    render(<Tabs tabsItem={tabsItem} />);
    const tab2 = screen.getByText("Tab 2");

    fireEvent.click(tab2);

    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("displays correct content for the selected tab", () => {
    render(<Tabs tabsItem={tabsItem} />);

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 2"));

    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("applies custom styles based on the selected tab", () => {
    const customStyle = {
      background: "blue",
      selectedColor: "white",
      defaultColor: "gray",
      borderBottom: "2px solid black",
    };

    render(<Tabs tabsItem={tabsItem} customStyle={customStyle} />);

    const tab1Button = screen.getByTestId("tab-1-button");
    const tab2Button = screen.getByTestId("tab-2-button");

    expect(tab1Button).toHaveStyle(`color: ${customStyle.selectedColor}`);
    expect(tab1Button).toHaveStyle(`borderBottom: ${customStyle.borderBottom}`);

    fireEvent.click(tab2Button);

    expect(tab1Button).toHaveStyle(`color: ${customStyle.defaultColor}`);
    expect(tab2Button).toHaveStyle(`color: ${customStyle.selectedColor}`);
  });

  it("navigates tabs using keyboard arrow keys", () => {
    render(<Tabs tabsItem={tabsItem} />);
    const tab1Button = screen.getByTestId("tab-1-button");
    const tab2Button = screen.getByTestId("tab-2-button");

    tab1Button.focus();
    fireEvent.keyDown(tab1Button, { code: "ArrowRight" });

    expect(tab2Button).toHaveFocus();
    expect(screen.getByText("Content 2")).toBeInTheDocument();

    fireEvent.keyDown(tab2Button, { code: "ArrowLeft" });

    expect(tab1Button).toHaveFocus();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("renders correctly for mobile view", () => {
    (useResolution as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Tabs tabsItem={tabsItem} />);

    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
});
