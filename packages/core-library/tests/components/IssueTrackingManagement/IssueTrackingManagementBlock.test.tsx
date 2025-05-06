import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "../../common";
import { IssueTrackingManagementBlock } from "../../../system/app/internal/blocks";

let openMock: jest.Mock;
let closeMock: jest.Mock;
let executeMock: jest.Mock;
let showToastMock: jest.Mock;
let isOpenMock: boolean;
let contextMock: any;

jest.mock("../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks", () => {
  openMock = jest.fn((context?: any) => {
    contextMock = context;
    isOpenMock = true;
  });

  closeMock = jest.fn(() => {
    contextMock = undefined;
    isOpenMock = false;
  });

  executeMock = jest.fn().mockResolvedValue({
    data: [
      {
        id: "1",
        refNo: "ABC123",
        message: "Test issue",
        createdAt: "2025-04-17",
        status: 1,
        email: "test@example.com",
      },
    ],
  });

  showToastMock = jest.fn();
  isOpenMock = false;
  contextMock = undefined;

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
    useApiCallback: jest.fn(() => ({
      execute: executeMock,
    })),
    useExecuteToast: jest.fn(() => ({
      showToast: showToastMock,
    })),
    useColumns: jest.fn(() => ({
      columns: [
        {
          field: "reference",
          headerName: "Reference Number",
          renderCell: (params: any) => (
            <div
              data-testid={`reference-cell-${params.row.reference}`}
              onClick={() => openMock(params.row)} 
            >
              [{params.value}]
            </div>
          ),
        },
        {
          field: "status",
          headerName: "Status",
        },
      ],
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
  
  beforeEach(() => {
    jest.clearAllMocks();

    isOpenMock = false;
    contextMock = undefined;  
  });

  test("renders DataGrid with expected rows", async () => {
    render(<IssueTrackingManagementBlock />);

    await waitFor(() => {
      expect(executeMock).toHaveBeenCalled();
    });

    const dataGrid = screen.getByTestId("data-grid");
    expect(dataGrid).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(0);
  });

  test("calls modal.open with correct data when reference cell is clicked", async () => {
    render(<IssueTrackingManagementBlock />);

    const referenceCells = await screen.findAllByTestId(/reference-cell-.*/);
    expect(referenceCells.length).toBeGreaterThan(0);

    fireEvent.click(referenceCells[0]);

    expect(openMock).toHaveBeenCalledWith(expect.objectContaining({
      reference: "ABC123",
      description: "Test issue",
      dateCreated: "2025-04-17",
      email: "test@example.com",
      status: 1,
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

    closeMock();
    rerender(<IssueTrackingManagementBlock />);

    await waitFor(() => {
      expect(screen.queryByTestId("custom-modal-backdrop")).not.toBeInTheDocument();
    }, { timeout: 3000 });

    expect(document.body.style.overflow).toBe("");
  });
});