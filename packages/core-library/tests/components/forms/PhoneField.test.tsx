/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen } from "../../common";
import { PhoneField } from "../../../components";
import { FormProvider, useForm } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../types/constant", () => ({
  PHONE_CODES: [
    { code: "US", dial_code: "+1" },
    { code: "GB", dial_code: "+44" },
  ],
  DEFAULT_PHONE_COUNTRY_CODE: "US",
}));

const TestForm = ({
  defaultValues,
  countryCode,
  isLoading,
  onCountryCodeChanged,
}: any) => {
  const methods = useForm<{ phone: string }>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <PhoneField
        name="phone"
        control={methods.control}
        countryCode={countryCode}
        label="Phone Number"
        isLoading={isLoading}
        onCountryCodeChanged={onCountryCodeChanged}
      />
    </FormProvider>
  );
};

describe("PhoneField Component", () => {
  const mockOnCountryCodeChanged = jest.fn();

  const setup = (
    defaultValues = { phone: "" },
    countryCode = "US",
    isLoading = false
  ) => {
    return render(
      <TestForm
        defaultValues={defaultValues}
        countryCode={countryCode}
        isLoading={isLoading}
        onCountryCodeChanged={mockOnCountryCodeChanged}
      />
    );
  };
  test("renders phone code select dropdown", () => {
    setup();
    const phoneCodeSelect = screen.getByTestId("phone-code-select");
    expect(phoneCodeSelect).toBeInTheDocument();
  });

  test("renders phone number input field", () => {
    setup();
    const phoneField = screen.getByTestId("phone-field");
    expect(phoneField).toBeInTheDocument();
  });

  test("renders InputLoader when isLoading is true", () => {
    setup({ phone: "" }, "US", true);

    expect(screen.getByTestId("input-loader")).toBeInTheDocument();
  });

  test("does not render InputLoader when isLoading is false", () => {
    setup();
    expect(screen.queryByTestId("input-loader")).not.toBeInTheDocument();
  });
});
