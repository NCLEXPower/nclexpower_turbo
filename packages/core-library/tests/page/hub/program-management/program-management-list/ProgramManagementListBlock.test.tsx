/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { render, screen } from "../../../../common";
import { ProgramManagementListBlock } from "../../../../../system/app/internal/blocks";
import { useRouter } from "next/router";
import { useExecuteToast } from "../../../../../contexts";
import { useAtom } from "jotai";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("../../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetAllPrograms: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
    businessQueryGetAllProgramsByType: jest.fn(() => ({
      data: [
        {
          id: "p1",
          title: "Test Program",
          programImage: "/some-image.jpg",
          sections: [
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
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../../common", () => {
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

describe("ProgramManagementListBlock", () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useExecuteToast as jest.Mock).mockReturnValue({ showToast: jest.fn() });
    (useAtom as jest.Mock).mockReturnValue([null, jest.fn()]);
  });

  it("renders ProgramManagementListBlock component", () => {
    render(<ProgramManagementListBlock />);

    expect(screen.getByText("Program Management List")).toBeInTheDocument();

    expect(screen.getByText("Standard (23-Day) Program")).toBeInTheDocument();
    expect(screen.getByText("Fast Track (8-Day) Program")).toBeInTheDocument();
  });

  it("renders sections with correct title and styles", async () => {
    render(<ProgramManagementListBlock />);

    const sectionTitle = await screen.findByText("Sample Section");
    expect(sectionTitle).toBeInTheDocument();

    expect(sectionTitle).toHaveStyle("text-decoration: underline");
    expect(sectionTitle).toHaveStyle("cursor: pointer");
  });
});
