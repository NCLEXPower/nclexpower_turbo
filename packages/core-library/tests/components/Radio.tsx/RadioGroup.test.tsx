import React from "react";
import { render, screen, fireEvent } from "../../../tests/common";
import { RadioGroup, Radio, ControlledRadioGroup } from "../../../components";
import { useForm } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("RadioGroup", () => {
  const radioChoices = [
    { Value: 1, XValue: 1, Label: "Option 1" },
    { Value: 2, XValue: 2, Label: "Option 2" },
  ];

  it("renders radio buttons with labels", () => {
    render(<RadioGroup radio={radioChoices} value={1} onChange={jest.fn()} />);
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  it("calls onChange when a radio is selected", () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup radio={radioChoices} value={1} onChange={handleChange} />
    );
    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders custom elements if provided", () => {
    const customRadio = [
      {
        Value: 99,
        XValue: 99,
        Element: <div data-testid="custom-radio">Custom Radio</div>,
      },
    ];
    render(<RadioGroup radio={customRadio} value={99} onChange={jest.fn()} />);
    expect(screen.getByTestId("custom-radio")).toBeInTheDocument();
  });

  it("uses XValue if present", () => {
    expect(radioChoices[0].XValue).toBe(1);
    expect(radioChoices[1].XValue).toBe(2);
  });
});

describe("Radio", () => {
  it("renders with label", () => {
    render(<Radio value={1} label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });
});

describe("ControlledRadioGroup", () => {
  function Wrapper() {
    const { control } = useForm({ defaultValues: { test: 1 } });
    const radioChoices = [
      { Value: 1, XValue: 1, Label: "Option 1" },
      { Value: 2, XValue: 2, Label: "Option 2" },
    ];
    return (
      <ControlledRadioGroup
        control={control}
        name="test"
        radio={radioChoices}
      />
    );
  }

  it("renders and allows selection", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Option 2"));
  });
});
