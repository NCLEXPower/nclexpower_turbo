import { screen, render } from "../../../tests/common";
import { ControlledAccordion } from "../../../components";

jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
}));

const items = [
    { id: 1, disabled: false },
    { id: 2, disabled: true },
];

const renderSummary = jest.fn();
const renderDetails = jest.fn();

const defaultProps = {
    items,
    renderSummary: (item: any, expanded: boolean, onToggle: any) => (
        <div onClick={() => onToggle()}>{`Summary for ${item.id}`}</div>
    ),
    renderDetails: (item: any, expanded: boolean, onToggle: any) => (
        <div>{`Details for ${item.id}`}</div>
    ),
    noAvailableDataText: "No data available",
};

describe("ControlledAccordion", () => {
    it("should renders correctly with items", () => {
        render(<ControlledAccordion {...defaultProps}/>);

        expect(screen.getByText("Summary for 1")).toBeInTheDocument();
        expect(screen.getByText("Details for 1")).toBeInTheDocument();
    });

    it("displays 'No data available' message when items are empty", () => {
        render(<ControlledAccordion {...defaultProps} items={[]} />);
        expect(screen.getByText("No data available")).toBeInTheDocument();
    });
    
    it("applies custom styles and radius when provided", () => {
        render(
          <ControlledAccordion
            {...defaultProps}
            headerBackgroundColor="blue"
            headerHeight="50px"
            accordionRadius="10px"
          />
        );
        
        const summary1 = screen.getByText("Summary for 1");
        expect(summary1.closest(".MuiAccordion-root")).toHaveStyle({
          borderRadius: "10px",
        });
    });
})

