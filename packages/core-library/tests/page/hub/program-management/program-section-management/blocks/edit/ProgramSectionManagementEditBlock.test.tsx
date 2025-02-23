import { render, screen, fireEvent } from "@testing-library/react";
import { ProgramSectionManagementEditBlock } from "../../../../../../../system/app/internal/blocks";
import { useRouter } from "../../../../../../../core";
import { useApiCallback } from "../../../../../../../hooks";
import { useExecuteToast } from "../../../../../../../contexts";
import { useAtom } from "jotai";

jest.mock("../../../../../../../config", () => ({
    config: { value: jest.fn() },
  }));
  
  jest.mock("../../../../../../../core/router", () => ({
    useRouter: jest.fn(),
  }));

jest.mock("../../../../../../../hooks", () => ({
  useApiCallback: jest.fn(),
  useCustomAction: jest.fn(),
  useResolution: jest.fn(() => ({ isMobile: false }))
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
  
describe("ProgramSectionManagementEditBlock", () => {
  const mockRouter = { push: jest.fn(), back: jest.fn() };
  const mockShowToast = jest.fn();
  const mockDeleteSectionCb = { execute: jest.fn(), loading: false };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useExecuteToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useApiCallback as jest.Mock).mockReturnValue(mockDeleteSectionCb);
    (useAtom as jest.Mock).mockImplementation((atom) => ["test-value", jest.fn()]);
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
