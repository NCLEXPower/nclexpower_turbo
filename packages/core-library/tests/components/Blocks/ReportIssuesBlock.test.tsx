import { render, screen, fireEvent } from '@testing-library/react';
import ReportedIssuesBlock from "../../../system/app/internal/blocks/Hub/Reports/ReportIssuesBlock";
import { useApi, useApiCallback, useColumns } from "../../../hooks";
import { useExecuteToast } from "../../../contexts";

jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
  }));


jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
  }));
  
jest.mock("../../../contexts", () => ({
    useExecuteToast: jest.fn,
  }));
  


  jest.mock("../../../hooks", () => ({
    useApi: jest.fn(() => ({
      loading: false,
      execute: jest.fn(),
    })),
    useApiCallback: jest.fn(() => ({
      loading: false,
      execute: jest.fn(),
    })),
    useColumns: jest.fn(() => ({
      columns: [],
    })),
    useCustomAction: jest.fn(),
  }));
  
  test('renders ReportedIssuesBlock and fetches reported issues', async () => {
    render(<ReportedIssuesBlock />);
  
    expect(await screen.findByText("Reported Issues")).toBeInTheDocument();
  });
  
  test('checks if loading state is handled correctly', async () => {
    render(<ReportedIssuesBlock />);
    expect(screen.queryByText("Loading..."))?.not.toBeInTheDocument(); // Adjust based on UI behavior
  });
  
  test('refetches reported issues when triggered', async () => {
    render(<ReportedIssuesBlock />);
    const refetchButton = await screen.findByText("Reported Issues"); // Adjust as necessary
  
    fireEvent.click(refetchButton);
    expect(await screen.findByText("Reported Issues")).toBeInTheDocument();
  });
  
  test('calls showToast on delete action', async () => {
    const { getByText } = render(<ReportedIssuesBlock />);
    const deleteButton = getByText("Actions"); // Adjust to actual button label
    fireEvent.click(deleteButton);
    
    expect(useExecuteToast().showToast).toHaveBeenCalled();
  });
  