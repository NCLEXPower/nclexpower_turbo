import React from "react";
import { screen, fireEvent, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { useModal } from "../../../hooks";
import { IssueTrackingManagementBlock } from "../../../system/app/internal/blocks";

jest.mock("../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../hooks/useModal", () => {
  let isOpenMock: boolean = false;
  let contextMock: any = undefined;

  const openMock = jest.fn((context?: any) => {
    contextMock = context;
    isOpenMock = true;
  });

  const closeMock = jest.fn(() => {
    contextMock = undefined;
    isOpenMock = false;
  });

  return {
    useModal: jest.fn(() => ({
      open: openMock,
      close: closeMock,
      props: {
        get isOpen() {
          return isOpenMock;
        },
        get context() {
          return contextMock;
        },
      },
    })),
  };
});

jest.mock("@mui/x-data-grid", () => {
  const actualModule = jest.requireActual("@mui/x-data-grid");
  return {
    ...actualModule,
    DataGrid: (props: { rows: any[]; columns: any[]; isLoading: boolean }) => {
      return (
        <div role="grid" data-testid="data-grid">
          {props.rows.map((row) => (
            <div key={row.reference} role="row" data-rowid={row.reference}>
              {props.columns.map((col) => (
                <div
                  key={col.field}
                  role="cell"
                  data-colid={col.field}
                  data-testid={`cell-${row.reference}-${col.field}`}
                  onClick={() => col.field === "reference" && col.renderCell?.({ row })}
                >
                  {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    },
  };
});

jest.mock("../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDetailsModal", () => ({
  IssueDetailsModal: ({ modal, onClose }: { modal: { isOpen: boolean }; onClose: () => void }) => {
    return modal.isOpen ? (
      <div role="dialog" data-testid="issue-details-modal">
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null;
  },
}));

describe("IssueTrackingManagementBlock", () => {
  let openMock: jest.Mock;
  let mockClose: jest.Mock;
  let modalProps: { isOpen: boolean; context: any };

  beforeEach(() => {
    jest.clearAllMocks();

    modalProps = {
      isOpen: false,
      context: undefined,
    };

    openMock = jest.fn((context?: any) => {
      modalProps.context = context;
      modalProps.isOpen = true;
    });

    mockClose = jest.fn(() => {
      modalProps.isOpen = false;
      modalProps.context = undefined;
    });

    (useModal as jest.Mock).mockReturnValue({
      open: openMock,
      close: mockClose,
      props: modalProps,
    });
  });

  test("renders DataGrid with expected rows", () => {
    render(<IssueTrackingManagementBlock />);
    const dataGrid = screen.getByTestId("data-grid");
    expect(dataGrid).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(0);
  });

  test("calls modal.open with correct data when reference cell is clicked", () => {
    render(<IssueTrackingManagementBlock />);

    const referenceCells = screen.getAllByTestId(/reference-cell-.*/);

    expect(referenceCells.length).toBeGreaterThan(0);

    fireEvent.click(referenceCells[0]);

    expect(openMock).toHaveBeenCalledWith(expect.objectContaining({
      reference: expect.any(String),
    }));
  });

  test("renders and closes IssueDetailsModal and toggles body overflow", async () => {
    const { rerender } = render(<IssueTrackingManagementBlock />);

    expect(document.body.style.overflow).toBe("");

    const referenceCells = await screen.findAllByTestId(/reference-cell-.*/);
    expect(referenceCells.length).toBeGreaterThan(0);

    fireEvent.click(referenceCells[0]);
    
    openMock();
    rerender(<IssueTrackingManagementBlock />);

    const backdrop = await screen.findByTestId("custom-modal-backdrop", {}, { timeout: 3000 });
    expect(backdrop).toBeInTheDocument();

    expect(document.body.style.overflow).toBe("hidden");

    const closeButton = await screen.findByText("Close Modal");
    fireEvent.click(closeButton);

    mockClose();
    rerender(<IssueTrackingManagementBlock />);

    await waitFor(() => {
      expect(screen.queryByTestId("custom-modal-backdrop")).not.toBeInTheDocument();
    }, { timeout: 3000 });

    expect(document.body.style.overflow).toBe("");
  });
});

