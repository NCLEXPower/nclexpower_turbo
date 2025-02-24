import React from "react";
import { render, screen } from "../../common";
import { ContentReviewerForm } from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/ContentReviewerForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { crbSchema } from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/validation";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components", () => ({
  StateStatus: () => <div data-testid="state-status">StateStatus</div>,
  DateField: () => <input data-testid="date-field" />,
  TextAreaField: () => <textarea data-testid="text-area-field" />,
  ControlledCheckbox: () => <input data-testid="controlled-checkbox" />,
  CustomPopover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="custom-popover">{children}</div>
  ),
  ConfirmationModal: () => (
    <div data-testid="confirmation-modal">ConfirmationModal</div>
  ),
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
}));

const mockData = {
  contentId: "123",
  contentAuthorId: "456",
};

const MockFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    resolver: yupResolver(crbSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("ContentReviewerForm", () => {
  const renderComponent = (props = {}) => {
    const defaultProps = {
      control: {} as any,
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn(),
      clearErrors: jest.fn(),
      onSubmit: jest.fn(),
      data: mockData,
      isError: false,
      contentLoader: false,
      isApproved: false,
    };

    return render(
      <MockFormProvider>
        <ContentReviewerForm {...defaultProps} {...props} />
      </MockFormProvider>
    );
  };

  it("renders StateStatus when isError is true", () => {
    renderComponent({ isError: true });
    expect(screen.getByTestId("state-status")).toBeInTheDocument();
  });

  it("renders StateStatus when contentLoader is true", () => {
    renderComponent({ contentLoader: true });
    expect(screen.getByTestId("state-status")).toBeInTheDocument();
  });

  it("renders Approved Chip when isApproved is true", () => {
    renderComponent({ isApproved: true });
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders Pending Chip when isApproved is false", () => {
    renderComponent({ isApproved: false });
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders CustomPopover and ConfirmationModal", () => {
    renderComponent();
    expect(screen.getByTestId("custom-popover")).toBeInTheDocument();
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });

  it("renders DateField and TextAreaField", () => {
    renderComponent();
    expect(screen.getByTestId("date-field")).toBeInTheDocument();
    expect(screen.getByTestId("text-area-field")).toBeInTheDocument();
  });

  it("renders ControlledCheckbox for RadioData", () => {
    renderComponent();
    expect(screen.getAllByTestId("controlled-checkbox").length).toBeGreaterThan(
      0
    );
  });

  it("renders RegularMainContent when mainType is Regular", () => {
    renderComponent();
    expect(screen.getByText("Content Details:")).toBeInTheDocument();
  });

  it("renders CSMainContent when mainType is Case Study", () => {
    renderComponent({ mainType: "Case Study" });
    expect(screen.getByText("Content Details:")).toBeInTheDocument();
  });
});
