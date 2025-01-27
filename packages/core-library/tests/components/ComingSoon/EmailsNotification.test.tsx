import { render, screen, within } from "../../common";
import { EmailsNotification } from "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/EmailsNotification";
import { emailMockData } from "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/ComingSoonMock";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("console", () => ({
  time: jest.fn(),
}));

describe("EmailsNotification Component", () => {
  it("calculates total email count correctly", () => {
    render(<EmailsNotification />);
    const totalEmailsText = screen.getByText(
      `Total: ${emailMockData.length} emails`
    );
    expect(totalEmailsText).toBeInTheDocument();
  });

  it("renders email table with correct columns", () => {
    render(<EmailsNotification />);
    const emailColumn = screen.getByText("Email");
    const dateReceivedColumn = screen.getByText("Date Received");
    const countColumn = screen.getByText("Count");
    const statusColumn = screen.getByText("Status");

    expect(emailColumn).toBeInTheDocument();
    expect(dateReceivedColumn).toBeInTheDocument();
    expect(countColumn).toBeInTheDocument();
    expect(statusColumn).toBeInTheDocument();
  });
  it("displays the correct data in the table", () => {
    render(<EmailsNotification />);

    const rows = screen.getAllByRole("row");

    emailMockData.forEach((email, index) => {
      const row = within(rows[index + 1]);

      expect(row.getByText(email.email)).toBeInTheDocument();
      expect(row.getByText(email.dateReceived)).toBeInTheDocument();
      expect(row.getByText(email.count.toString())).toBeInTheDocument();
      expect(row.getByText(email.status)).toBeInTheDocument();
    });
  });
});
