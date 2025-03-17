import { render, screen, fireEvent } from "../../../../../../common";
import { ProgramSectionManagementEditBlock } from "../../../../../../../system/app/internal/blocks";
import { useRouter } from "../../../../../../../core";
import { useApiCallback } from "../../../../../../../hooks";
import { useExecuteToast } from "../../../../../../../contexts";
import { useAtom, atom } from "jotai";

const SectionTitleAtom = atom("Mock Title");
const SectionTypeAtom = atom("Mock Type");
const SectionIdAtom = atom("123");
const SectionDataIdAtom = atom("456");

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../hooks", () => ({
  useApiCallback: jest.fn(),
  useCustomAction: jest.fn(),
  useResolution: jest.fn(() => ({ isMobile: false })),
}));

jest.mock("../../../../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetSectionsByType: jest.fn(() => ({
      data: [
        {
          sectionId: "123",
          sectionType: "simulator",
          sectionTitle: "Sample Section",
          sectionData: [
            {
              sectionDataId: "456",
              title: "Simulator Section",
              contentArea: "Sample Content",
              guided: "true",
              unguided: "false",
              practice: "true",
            },
          ],
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
  })),
}));

jest.mock("jotai", () => ({
  atom: jest.fn(),
  useAtom: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock("../../../../../../common", () => {
  const testingLibrary = jest.requireActual("@testing-library/react");

  return {
    render: jest.fn((ui) => {
      return testingLibrary.render(ui);
    }),
    screen: testingLibrary.screen,
    fireEvent: testingLibrary.fireEvent,
    waitFor: testingLibrary.waitFor,
  };
});
describe("ProgramSectionManagementEditBlock", () => {
  const mockRouter = { push: jest.fn(), back: jest.fn() };
  const mockShowToast = jest.fn();
  const mockDeleteSectionCb = { execute: jest.fn(), loading: false };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
    (useApiCallback as jest.Mock).mockReturnValue(mockDeleteSectionCb);

    (useAtom as jest.Mock).mockImplementation((atom) => {
      switch (atom) {
        case SectionTitleAtom:
          return ["Mock Title", jest.fn()];
        case SectionTypeAtom:
          return ["Mock Type", jest.fn()];
        case SectionIdAtom:
          return ["123", jest.fn()];
        case SectionDataIdAtom:
          return ["456", jest.fn()];
        default:
          return ["test-value", jest.fn()];
      }
    });
  });

  it("renders correctly", () => {
    render(<ProgramSectionManagementEditBlock />);
    expect(screen.getByText("Program Section Management")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("navigates back when 'Back' button is clicked", () => {
    render(<ProgramSectionManagementEditBlock />);
    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
