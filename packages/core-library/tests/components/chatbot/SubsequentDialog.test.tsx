import { SubsequentDialog } from "../../../system/app/internal/blocks/Hub/ChatbotManagement/ChatbotDialogs";
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

describe("SubsequentDialog", () => {
  it("should render", () => {
    render(
      <SubsequentDialog
        open={false}
        handleClickOpen={jest.fn()}
        handleClose={jest.fn()}
      />
    );
  });

  it("should open the dialog upon clicking on the button", async () => {
    const handleOpen = jest.fn();
    render(
      <SubsequentDialog
        open={false}
        handleClickOpen={handleOpen}
        handleClose={jest.fn()}
      />
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId("subsequent-button"));
    });
    expect(handleOpen).toHaveBeenCalled();
  })
});

