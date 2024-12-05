import { render, fireEvent } from "../../common";
import { OtpField } from "../../../components";
import { ChangeEvent, ChangeEventHandler } from "react";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const isSingleDigitNumber = (value: string) => /^[0-9]$/.test(value);

describe("OtpField", () => {
  let refs: { current: HTMLInputElement | null }[];
  let setPin: jest.Mock;
  let onChange: jest.Mock;
  const digits = 6;

  beforeEach(() => {
    refs = Array.from({ length: digits }, () => ({
      current: { focus: jest.fn(), value: "" } as unknown as HTMLInputElement,
    }));

    setPin = jest.fn();
    onChange = jest.fn();
  });

  it("should not move focus for non-digit input", () => {
    const { getAllByTestId } = render(
      <OtpField value="1" onChange={onChange} data-testid="otp-input" />
    );

    const inputs = getAllByTestId("otp-input");
    const firstInput = inputs[0] as HTMLInputElement;

    fireEvent.keyDown(firstInput, { key: "a" });

    expect(refs[1].current?.focus).not.toHaveBeenCalled();
  });

  const createEvent = (value: string): ChangeEvent<HTMLInputElement> =>
    ({
      target: { value },
      preventDefault: jest.fn(),
    }) as unknown as ChangeEvent<HTMLInputElement>;

  it("should update pin with numeric input and call onChange", () => {
    const index = 0;
    const mockEvent = createEvent("5");

    const handleChange =
      (index: number): ChangeEventHandler<HTMLInputElement> =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        const isNumberOrEmpty = isSingleDigitNumber(text) || text === "";

        if (!isNumberOrEmpty) {
          return event.preventDefault();
        }

        setPin((prevPin: string[]) => {
          const newValue = prevPin.map((val: string, i: number) => {
            if (index === i) return text;
            return val;
          });
          onChange?.(newValue.join(""));
          return newValue;
        });
      };

    const prevPin = ["", "", "", "", "", ""];
    setPin.mockImplementation((callback) => callback(prevPin));

    handleChange(index)(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();

    expect(setPin).toHaveBeenCalledWith(expect.any(Function));
    expect(setPin).toHaveReturnedWith(["5", "", "", "", "", ""]);

    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("should prevent non-numeric input", () => {
    const index = 0;
    const mockEvent = createEvent("a");

    const handleChange =
      (index: number): ChangeEventHandler<HTMLInputElement> =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        const isNumberOrEmpty = isSingleDigitNumber(text) || text === "";

        if (!isNumberOrEmpty) {
          return event.preventDefault();
        }

        setPin((prevPin: string[]) => {
          const newValue = prevPin.map((val: string, i: number) => {
            if (index === i) return text;
            return val;
          });
          onChange?.(newValue.join(""));
          return newValue;
        });
      };

    handleChange(index)(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();

    expect(setPin).not.toHaveBeenCalled();

    expect(onChange).not.toHaveBeenCalled();
  });
});
