import { render } from "@testing-library/react";
import { fireEvent, screen } from "../../common";
import { IssueImageUploader } from "../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueImageUploader";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

describe("IssueImageUploader", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test("renders IssueImageUploader and file input is present", () => {
    const setSelectedImageMock = jest.fn();
    render(<IssueImageUploader selectedImage={null} setSelectedImage={setSelectedImageMock} />);
  
    const fileInput = document.getElementById("image-upload-input");
    expect(fileInput).toBeInTheDocument();
  });
  
  test("calls setSelectedImage with file when a file is uploaded", () => {
    const setSelectedImageMock = jest.fn();
    render(<IssueImageUploader selectedImage={null} setSelectedImage={setSelectedImageMock} />);
    
    const fileInput = document.getElementById("image-upload-input") as HTMLInputElement;
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(setSelectedImageMock).toHaveBeenCalledWith(file);
  });
  
  test("calls setSelectedImage with null when no file is uploaded", () => {
    const setSelectedImageMock = jest.fn();
    render(<IssueImageUploader selectedImage={null} setSelectedImage={setSelectedImageMock} />);
    
    const fileInput = document.getElementById("image-upload-input") as HTMLInputElement;
    
    fireEvent.change(fileInput, { target: { files: [] } });
    
    expect(setSelectedImageMock).toHaveBeenCalledWith(null);
  });

  test("triggerFileInput resets file input value and triggers click", () => {
    const setSelectedImageMock = jest.fn();
    render(<IssueImageUploader selectedImage={null} setSelectedImage={setSelectedImageMock} />);
    
    const fileInput = document.getElementById("image-upload-input") as HTMLInputElement;
    
    Object.defineProperty(fileInput, "value", {
      writable: true,
      value: "non-empty",
    });
    
    const clickSpy = jest.spyOn(fileInput, "click");
    const triggerElement = screen.getByTestId("trigger-file-input");
    
    fireEvent.click(triggerElement);
    
    expect(fileInput.value).toBe("");
    expect(clickSpy).toHaveBeenCalled();
  });
});

