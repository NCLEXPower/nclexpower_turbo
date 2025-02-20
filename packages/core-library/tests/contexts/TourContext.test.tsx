import { render } from "@testing-library/react";
import { screen, userEvent } from "../common";
import { TourContextProvider, useTourContext } from "../../contexts";
import { StepType, useTour } from "@reactour/tour";

jest.mock("../../config", () => ({
  config: { value: { BASEAPP: "mockAppName" } },
}));

jest.mock("@reactour/tour", () => ({
  ...jest.requireActual("@reactour/tour"),
  useTour: jest.fn(),
}));

const mockSetIsOpen = jest.fn();
const mockSetSteps = jest.fn();
const mockSetCurrentStep = jest.fn();

(useTour as jest.Mock).mockReturnValue({
  setIsOpen: mockSetIsOpen,
  setSteps: mockSetSteps,
  setCurrentStep: mockSetCurrentStep,
});

const mockSteps: StepType[] = [
  { selector: "[data-tour='step-1']", content: "Step 1" },
  { selector: "[data-tour='step-2']", content: "Step 2" },
];

const TestComponent = () => {
  const { startTour } = useTourContext();
  return (
    <div>
      <button onClick={() => startTour(mockSteps)}>Start Tour</button>
      <button onClick={() => startTour([])}>Start Empty Tour</button>
    </div>
  );
};

describe("TourContextProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provider and calls startTour with steps", async () => {
    render(
      <TourContextProvider>
        <TestComponent />
      </TourContextProvider>
    );

    const startBtn = screen.getByText("Start Tour");
    await userEvent.click(startBtn);

    expect(mockSetSteps).toHaveBeenCalledWith(mockSteps);
    expect(mockSetCurrentStep).toHaveBeenCalledWith(0);
    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("does not open the tour when provided with empty steps", async () => {
    render(
      <TourContextProvider>
        <TestComponent />
      </TourContextProvider>
    );

    const emptyTourBtn = screen.getByText("Start Empty Tour");
    await userEvent.click(emptyTourBtn);

    expect(mockSetSteps).toHaveBeenCalledWith([]);
    expect(mockSetCurrentStep).toHaveBeenCalledWith(0);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});
