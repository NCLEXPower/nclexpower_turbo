import { render, fireEvent, waitFor } from "../../../../../../common";
import { ProgramSectionManagementEditItemBlock } from "../../../../../../../system/app/internal/blocks";
import { useRouter } from "../../../../../../../core";
import { useExecuteToast } from "../../../../../../../contexts";
import { useApiCallback } from "../../../../../../../hooks";
import { useAtom } from "jotai";
import {
  SectionTitleAtom,
  SectionTypeAtom,
  SectionDataIdAtom,
  SectionIdAtom,
} from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/validation";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn().mockReturnValue({
    contentLoader: false,
    setContentLoader: jest.fn(),
  }),
}));

jest.mock("../../../../../../../contexts", () => ({
  useExecuteToast: jest.fn().mockReturnValue({
    showToast: jest.fn(),
  }),
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

jest.mock("../../../../../../../hooks", () => ({
  useApiCallback: jest.fn().mockReturnValue({
    execute: jest.fn(),
    loading: false,
  }),
  useCustomAction: jest.fn(),
  useResolution: jest.fn(() => ({ isMobile: false })),
}));

jest.mock("jotai", () => ({
  atom: jest.fn(),
  useAtom: jest.fn(),
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/validation",
  () => ({
    SectionTitleAtom: jest.fn(),
    SectionTypeAtom: jest.fn(),
    SectionDataIdAtom: jest.fn(),
    SectionIdAtom: jest.fn(),
  })
);

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/components/ProgramSectionHeader",
  () => ({
    ProgramSectionHeader: jest.fn(() => <div>ProgramSectionHeader</div>),
  })
);

jest.mock("../../../../../../../utils/IconUtils", () => ({
  getSectionTypeIcons: jest.fn(() => "icon"),
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

const mockRouter = {
  back: jest.fn(),
  push: jest.fn(),
};

describe("ProgramSectionManagementEditItemBlock", () => {
  const mockShowToast = jest.fn();
  const mockExecute = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
      loading: false,
    });
    (useAtom as jest.Mock).mockImplementation((atom) => {
      switch (atom) {
        case SectionTitleAtom:
          return ["Test Title"];
        case SectionTypeAtom:
          return ["document"];
        case SectionIdAtom:
          return ["1"];
        case SectionDataIdAtom:
          return ["1"];
        default:
          return [];
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    const { getByText } = render(<ProgramSectionManagementEditItemBlock />);
    expect(getByText("Program Section Management")).toBeInTheDocument();
  });

  it("should call handleBack when Back button is clicked", () => {
    const { getByText } = render(<ProgramSectionManagementEditItemBlock />);
    fireEvent.click(getByText("Back"));
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("should render ProgramSectionHeader component", () => {
    const { getByText } = render(<ProgramSectionManagementEditItemBlock />);
    expect(getByText("ProgramSectionHeader")).toBeInTheDocument();
  });

  it("should redirect to program_section_management route if sectionType is invalid", async () => {
    (useAtom as jest.Mock).mockImplementation((atom) => {
      switch (atom) {
        case SectionTypeAtom:
          return [null];
        default:
          return [];
      }
    });

    render(<ProgramSectionManagementEditItemBlock />);
    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith(expect.any(Function)));
  });

  it("should handle contentLoader state correctly", () => {
    const { getByText } = render(<ProgramSectionManagementEditItemBlock />);
    expect(getByText("Program Section Management")).toBeInTheDocument();
  });

  it("should handle router push on invalid sectionType", async () => {
    (useAtom as jest.Mock).mockImplementation((atom) => {
      switch (atom) {
        case SectionTypeAtom:
          return [null];
        default:
          return [];
      }
    });

    render(<ProgramSectionManagementEditItemBlock />);
    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith(expect.any(Function)));
  });
});
