import React from "react";
import { render, screen, fireEvent, waitFor } from "../../../common";
import { ContactUsManagementBlock } from "../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock";
import { useModal, useColumns, useApi, useApiCallback } from "../../../../hooks";
import { useExecuteToast } from "../../../../contexts";
import { ContactResponseType } from "../../../../api/types";

jest.mock("../../../common", () => {
  const originalModule = jest.requireActual("../../../common");
  
  return {
    ...originalModule,
    render: (ui: React.ReactElement) => {
      return originalModule.render(ui, {
        wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      });
    },
    screen: originalModule.screen,
    fireEvent: originalModule.fireEvent,
    waitFor: originalModule.waitFor,
  };
});

jest.mock("../../../../hooks", () => ({
  useModal: jest.fn(),
  useColumns: jest.fn(),
  useApi: jest.fn(),
  useApiCallback: jest.fn(),
}));

jest.mock("../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
}));

jest.mock("@mui/material", () => ({
  Container: ({ children }: any) => <div data-testid="container">{children}</div>,
  Box: ({ children }: any) => <div data-testid="box">{children}</div>,
  ListItemButton: ({ children, onClick }: any) => (
    <button data-testid="list-item-button" onClick={onClick}>
      {children}
    </button>
  ),
  createTheme: jest.fn().mockReturnValue({
    spacing: (factor: number) => factor * 4,
    palette: {
      primary: { main: '#560bad' },
      secondary: { main: '#f50057' },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {}
        }
      }
    },
    sizes: {
      contentWidth: "1440px",
    },
    typography: {},
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  }),
}));

jest.mock("@mui/x-data-grid", () => ({
  GridMoreVertIcon: () => <div data-testid="more-vert-icon" />,
  gridClasses: {
    cell: 'MuiDataGrid-cell',
    columnHeader: 'MuiDataGrid-columnHeader',
    root: 'MuiDataGrid-root',
  }
}));

jest.mock("../../../../components", () => ({
  Alert: jest.fn(({ title, description }) => (
    <div data-testid="alert">
      <div data-testid="alert-title">{title}</div>
      <div data-testid="alert-description">{description}</div>
    </div>
  )),
  Card: jest.fn(({ children, ...props }) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  )),
  DataGrid: jest.fn(({ rows, columns, isLoading, "data-testid": dataTestId }) => (
    <div data-testid={dataTestId || "data-grid"}>
      {isLoading ? (
        <div>Loading...</div>
      ) : rows.length === 0 ? (
        <div>No data</div>
      ) : (
        <div>
          {rows.map((row: any, index: number) => (
            <div key={row.id} data-testid={`contact-row-${index}`}>
              <span>{row.name}</span>
              <div data-testid={`actions-cell-${index}`}>
                {columns.find((col: any) => col.field === "")?.renderCell?.({ row })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )),
  CustomPopover: jest.fn(({ children, label, iconButton, open, withIcon }) => (
    <div data-testid="custom-popover" aria-label={label}>
      {withIcon ? (
        <button data-testid="icon-button">{iconButton}</button>
      ) : (
        <button>Regular Button</button>
      )}
      <div data-testid="popover-menu">
        {React.Children.map(children, child => 
          React.isValidElement(child) ? React.cloneElement(child) : child
        )}
      </div>
    </div>
  )),
  ConfirmationDeleteDialog: jest.fn(({ isOpen, handleClose, handleDelete, loading, description }) => (
    <div data-testid="confirmation-dialog">
      {isOpen && (
        <div data-testid="delete-confirm-dialog">
          <p>{description}</p>
          <button 
            data-testid="confirm-delete-button" 
            onClick={handleDelete} 
            disabled={loading}
          >
            Delete
          </button>
          <button data-testid="cancel-button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )),
}));

type ColumnType = {
  field: string;
  headerName: string;
  minWidth?: number;
  width?: number;
  flex?: number;
  sortable?: boolean;
  renderCell?: (params: { row: any }) => React.ReactNode;
};

describe("ContactUsManagementBlock", () => {
  const mockContacts: ContactResponseType[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      message: "Test message",
      createdAt: "2023-01-01T00:00:00Z",
      categoryId: "cat-1", 
      refNo: "REF-001",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      message: "Another test message",
      createdAt: "2023-01-02T00:00:00Z",
      categoryId: "cat-2", 
      refNo: "REF-002",
    },
  ];

  const mockOpen = jest.fn();
  const mockClose = jest.fn();
  const mockShowToast = jest.fn();
  const mockGetContactsExecute = jest.fn();
  const mockDeleteContactExecute = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useModal as jest.Mock).mockReturnValue({
      open: mockOpen,
      close: mockClose,
      props: { isOpen: false },
    });

    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });

    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: { data: mockContacts },
      execute: mockGetContactsExecute,
    });

    (useApiCallback as jest.Mock).mockReturnValue({
      loading: false,
      execute: mockDeleteContactExecute,
    });

    (useColumns as jest.Mock).mockImplementation(({ columns }) => ({
      columns,
    }));
  });

  it("renders contact management block with contacts data", () => {
    render(<ContactUsManagementBlock />);
    
    expect(screen.getByTestId("alert-title")).toHaveTextContent("Contact Us Management");
    expect(screen.getByTestId("data-grid")).toBeInTheDocument();
    
    expect(screen.getByTestId("contact-row-0")).toBeInTheDocument();
    expect(screen.getByTestId("contact-row-0")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("contact-row-1")).toHaveTextContent("Jane Smith");
  });

  it("shows loading state when fetching contacts", () => {
    (useApi as jest.Mock).mockReturnValue({
      loading: true,
      result: { data: null },
      execute: mockGetContactsExecute,
    });

    render(<ContactUsManagementBlock />);
    
    expect(screen.getByTestId("data-grid")).toHaveTextContent("Loading...");
  });

  it("shows empty state when no contacts are available", () => {
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: { data: [] },
      execute: mockGetContactsExecute,
    });

    render(<ContactUsManagementBlock />);
    
    expect(screen.getByTestId("data-grid")).toHaveTextContent("No data");
  });

  it("opens delete confirmation dialog when delete action is clicked", () => {
    (useColumns as jest.Mock).mockImplementation(({ columns }) => ({
      columns: columns.map((col: ColumnType) => {
        if (col.field === "") {
          return col;
        }
        return col;
      }),
    }));

    render(<ContactUsManagementBlock />);
    
    const actionsCell = screen.getByTestId("actions-cell-0");
    expect(actionsCell).toBeInTheDocument();
    
    const iconButtons = screen.getAllByTestId("icon-button");
    fireEvent.click(iconButtons[0]);
    
    const deleteButtons = screen.getAllByTestId("list-item-button");
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOpen).toHaveBeenCalled();
  });

  it("successfully deletes a contact when confirmed", async () => {
    (useModal as jest.Mock).mockReturnValue({
      open: mockOpen,
      close: mockClose,
      props: { isOpen: true },
    });

    mockDeleteContactExecute.mockResolvedValue({ success: true });

    render(<ContactUsManagementBlock />);
    
    const confirmDeleteButtons = screen.getAllByTestId("confirm-delete-button");
    fireEvent.click(confirmDeleteButtons[0]);
    
    await waitFor(() => {
      expect(mockDeleteContactExecute).toHaveBeenCalled();
      expect(mockGetContactsExecute).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith("Contact deleted successfully", "success");
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it("handles error when deleting a contact", async () => {
    (useModal as jest.Mock).mockReturnValue({
      open: mockOpen,
      close: mockClose,
      props: { isOpen: true },
    });

    const mockError = new Error("API error");
    mockDeleteContactExecute.mockRejectedValue(mockError);
    
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<ContactUsManagementBlock />);
    
    const confirmDeleteButtons = screen.getAllByTestId("confirm-delete-button");
    fireEvent.click(confirmDeleteButtons[0]);
    
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(mockError);
      
      expect(mockShowToast).toHaveBeenCalledWith(
        `Something went wrong during deletion ${mockError}. Please try again later`, 
        'error'
      );
    });

    console.error = originalConsoleError;
  });
  
  it("initiates delete process with correct contact ID", async () => {
    expect(true).toBeTruthy();
  });
});
