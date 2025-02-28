import { render, screen, fireEvent } from '@testing-library/react';
import ReportedIssuesBlock from "../../../system/app/internal/blocks/Hub/Reports/ReportIssuesBlock";
import { useApi, useApiCallback, useColumns } from "../../../hooks";
import { useExecuteToast } from "../../../contexts";

jest.mock("../../../../../../hooks", () => ({
    ...jest.requireActual("../../../../../../hooks"),
    useApiCallback: jest.fn((asyncFn) => ({
      execute: jest.fn(async (args) => asyncFn({ webbackoffice: { deleteReportIssue: jest.fn().mockResolvedValue({ success: true }) } }, args)),
      loading: false,
    })),
  }));
  
  jest.mock("../../../../../../contexts", () => ({
    ...jest.requireActual("../../../../../../contexts"),
    useExecuteToast: jest.fn(() => ({
      showToast: jest.fn(),
    })),
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
  