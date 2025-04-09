import { DialogContents, MultiContentDialog } from "../../../components";
import { act, render, screen } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockContent: DialogContents[] = [
  {
    id: 1,
    title: "Welcome to Arxenius Review.",
    contentType: "text",
    content: "test-content",
  },
  {
    id: 2,
    title: "How to use Arxenius Review.",
    contentType: "text",
    content: "test-content2",
  },
];

const handleClose = jest.fn();

describe("MultiContentDialog", () => {
  it("should render the MultiContent Dialog without error when open is truthy", () => {
    act(() => {
      render(
        <MultiContentDialog
          content={mockContent}
          open={true}
          handleClose={handleClose}
        />
      );
    });
  });
  it("should handle the MultiContent Dialog gracefully when the content is empty", () => {
    act(() => {
      render(
        <MultiContentDialog
          content={[]}
          open={true}
          handleClose={handleClose}
        />
      );
    });
    expect(screen.queryByText("Welcome to Arxenius Review.")).toBeNull();
    expect(screen.queryByText("How to use Arxenius Review.")).toBeNull();
  });

  it("should display the correct content when the dialog is open", () => {
    act(() => {
      render(
        <MultiContentDialog
          content={mockContent}
          open={true}
          handleClose={handleClose}
        />
      );
    });
    expect(screen.getByText("Welcome to Arxenius Review.")).toBeTruthy();
    expect(screen.getByText("test-content")).toBeTruthy();
  });

  it("should display the correct content when the dialog is open and the next button is clicked", () => {
    act(() => {
      render(
        <MultiContentDialog
          content={mockContent}
          open={true}
          handleClose={handleClose}
        />
      );
    });
    expect(screen.getByText("Welcome to Arxenius Review.")).toBeTruthy();
    expect(screen.getByText("test-content")).toBeTruthy();
    act(() => {
      screen.getByText("Next").click();
    });
    expect(screen.getByText("How to use Arxenius Review.")).toBeTruthy();
    expect(screen.getByText("test-content2")).toBeTruthy();
  });
});
