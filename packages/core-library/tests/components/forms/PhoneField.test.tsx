/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { render, screen } from "../../common";
import { PhoneField } from "../../../components";
import { PhoneFieldComponent } from "../../../components/forms/PhoneField";
import { FormProvider, useForm, ControllerFieldState } from "react-hook-form";
import { Typography } from "@mui/material";

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

  describe("<Typography> Error Message Rendering", () => {
    it("renders the error message when fieldState.error.message is provided", () => {
      render(
        <Typography sx={{ fontSize: 15 }} color="error">
          {"Invalid phone number"}
        </Typography>
      );

      const errorMessage = screen.getByText("Invalid phone number");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveStyle("font-size: 15px");
      expect(errorMessage).toHaveStyle("color: rgb(207, 34, 63)");
    });

    it("does not render anything when fieldState.error.message is an empty string", () => {
      render(
        <Typography sx={{ fontSize: 15 }} color="error">
          {""}
        </Typography>
      );

      const errorMessage = screen.queryByText(/.+/);
      expect(errorMessage).toBeNull();
    });

    it("does not render anything when fieldState.error.message is undefined", () => {
      render(
        <Typography sx={{ fontSize: 15 }} color="error">
          {undefined}
        </Typography>
      );

      const errorMessage = screen.queryByText(/.+/);
      expect(errorMessage).toBeNull();
    });

    it("does not render anything when fieldState.error.message is null", () => {
      render(
        <Typography sx={{ fontSize: 15 }} color="error">
          {null}
        </Typography>
      );

      const errorMessage = screen.queryByText(/.+/);
      expect(errorMessage).toBeNull();
    });
  });
});
