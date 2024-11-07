import { EndConversationDialog, SubsequentDialog } from "../../../system/app/internal/blocks/Hub/ChatbotManagement/ChatbotDialogs";
import { ChatbotManagement } from "../../../system/app/internal/blocks/Hub/ChatbotManagement/ChatbotManagement";
import { act, render, screen, userEvent } from "../../common";


jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const handleOpen = jest.fn();
const handleClose = jest.fn();

const handleSubmit = jest.fn();
describe("SubsequentDialog", () => {
  it("should render the chatbot management page", () => {
    render(
      <ChatbotManagement onSubmit={handleSubmit} />
    );
  });

  it("should render alert box header", () => {
    render(
      <ChatbotManagement onSubmit={handleSubmit} />
    );
    expect(screen.getByText("Heads Up!")).toBeInTheDocument();
    expect(screen.getByText(/This is the chatbot management/i)).toBeInTheDocument();
  });

  it("should open the subsequent dialog upon clicking on the button", async () => {
    render(
      <SubsequentDialog
        open={false}
        handleClickOpen={handleOpen}
        handleClose={handleClose}
      />
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId("subsequent-button"));
    });
    expect(handleOpen).toHaveBeenCalled();
  })

  it("should open the end conversation dialog upon clicking on the button", async () => {
    render(
      <EndConversationDialog
        open={false}
        handleClickOpen={handleOpen}
        handleClose={handleClose}
      />
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId("end-conversation-button"));
    });
    expect(handleOpen).toHaveBeenCalled();
  })
});

