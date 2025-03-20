/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent, waitFor } from "../../../../../../common";
import { ProgramSectionManagementCreateBlock } from "../../../../../../../system/app/internal/blocks";
import { useRouter } from "../../../../../../../core";
import { useAtom } from "jotai";
import {
  SectionTitleAtom,
  SectionTypeAtom,
} from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/validation";
import {
  useExecuteToast,
  usePageLoaderContext,
} from "../../../../../../../contexts";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("jotai", () => ({
  atom: jest.fn(),
  useAtom: jest.fn().mockReturnValue([null]),
}));

jest.mock("../../../../../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn().mockReturnValue({
    contentLoader: false,
    setContentLoader: jest.fn(),
  }),
}));

jest.mock("../../../../../../../contexts/ToastContext", () => ({
  useExecuteToast: jest.fn().mockReturnValue({
    showToast: jest.fn(),
  }),
}));

jest.mock("../../../../../../../hooks/useApi", () => ({
  useApiCallback: jest.fn().mockReturnValue({
    execute: jest.fn(),
    loading: false,
  }),
}));

jest.mock("../../../../../../../utils/IconUtils", () => ({
  getSectionTypeIcons: jest.fn(),
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/components/ProgramSectionHeader",
  () => ({
    ProgramSectionHeader: jest.fn(() => <div>ProgramSectionHeader</div>),
  })
);

describe("ProgramSectionManagementCreateBlock", () => {
  let mockBack: jest.Mock;
  let mockShowToast: jest.Mock;
  let mockCreateSectionCB: jest.Mock;

  beforeEach(() => {
    mockBack = jest.fn();
    mockShowToast = jest.fn();

    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: jest.fn(),
    });

    (useAtom as jest.Mock).mockImplementation((atom) => {
      if (atom === SectionTitleAtom) {
        return ["Test Section Title"];
      }
      if (atom === SectionTypeAtom) {
        return ["document"];
      }
      return [undefined, jest.fn()];
    });

    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: jest.fn(),
    });

    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ProgramSectionManagementCreateBlock correctly", () => {
    render(<ProgramSectionManagementCreateBlock />);

    expect(screen.getByText("Program Section Management")).toBeInTheDocument();

    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("back button works", () => {
    render(<ProgramSectionManagementCreateBlock />);

    fireEvent.click(screen.getByText("Back"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("renders the correct section component", async () => {
    render(<ProgramSectionManagementCreateBlock />);

    await waitFor(() => {
      expect(screen.getByText("ProgramSectionHeader")).toBeInTheDocument();
    });
  });

  it("navigates to program section management on invalid section type", () => {
    (useAtom as jest.Mock).mockImplementation((atom) => {
      if (atom === SectionTypeAtom) {
        return [null];
      }
      return [undefined, jest.fn()];
    });

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
      push: mockPush,
    });

    render(<ProgramSectionManagementCreateBlock />);

    expect(mockPush).toHaveBeenCalledWith(expect.any(Function));
  });
});
