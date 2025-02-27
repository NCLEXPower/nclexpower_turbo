import { render, fireEvent } from "@testing-library/react";
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
});
