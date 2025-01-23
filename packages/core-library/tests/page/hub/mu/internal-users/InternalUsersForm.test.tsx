import { MenuItems } from "../../../../../api/types";
import InternalUsersForm from "../../../../../system/app/internal/blocks/Hub/ManageUser/internal-users/InternalUsersForm";
import { useBusinessQueryContext } from "../../../../../contexts";
import { AccountSetupType } from "../../../../../system/app/internal/blocks/Hub/ManageUser/internal-users/validation";
import { render } from "@testing-library/react";
import { userEvent, screen, fireEvent, waitFor } from "../../../../common";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../../contexts/", () => ({
  useBusinessQueryContext: jest.fn(),
}));

const mockOnSubmit = jest.fn();

const mockMenuItemsData: {
  accountLevel: number;
  menuItems: MenuItems[];
}[] = [
  {
    accountLevel: 0,
    menuItems: [
      {
        id: "1",
        label: "Dashboard",
        path: "/dashboard",
        icon: "dashboardIcon",
        menuId: "menu_d1",
        parentId: "",
        children: [
          {
            id: "2",
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: "analyticsIcon",
            menuId: "menu_d2",
            parentId: "1",
            children: [],
          },
        ],
      },
      {
        id: "3",
        label: "Settings",
        path: "/settings",
        icon: "settingsIcon",
        menuId: "menu_s1",
        parentId: "",
        children: [],
      },
    ],
  },
];

const renderForm = (
  props?: Partial<React.ComponentProps<typeof InternalUsersForm>>
) => {
  return render(
    <InternalUsersForm onSubmit={mockOnSubmit} isLoading={false} {...props} />
  );
};

describe("InternalUsersForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetAllMenus: () => ({
        data: mockMenuItemsData,
        isLoading: false,
        refetch: jest.fn(),
      }),
    });
  });

  it("renders form fields for account details and credentials", () => {
    renderForm();

    expect(screen.getByText(/Create Internal Access/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Credentials/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Enter first name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter middle name/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter last name/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Enter email address/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirm Password/i)
    ).toBeInTheDocument();
  });

  it("renders Select Account Level and shows routes based on selected level", async () => {
    renderForm();

    const selectTrigger = screen.getByRole("combobox", {
      name: /select access level/i,
    });

    userEvent.click(selectTrigger);

    const adminOption = await screen.findByRole("option", { name: /admin/i });
    userEvent.click(adminOption);

    await waitFor(() => {
      expect(screen.getByText(/access route level admin/i)).toBeInTheDocument();
    });
  });

  it("updates username when email is input", async () => {
    renderForm();
    const emailInput = screen.getByPlaceholderText(/Enter email address/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("submits the form with correct data", async () => {
    renderForm();

    fireEvent.change(screen.getByPlaceholderText(/Enter first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter middle name/i), {
      target: { value: "Q" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter last name/i), {
      target: { value: "Public" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: "P@ssw0rd123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
      target: { value: "P@ssw0rd123" },
    });

    const selectTrigger = screen.getByRole("combobox", {
      name: /select access level/i,
    });

    userEvent.click(selectTrigger);
    const adminOption = await screen.findByRole("option", { name: /admin/i });
    userEvent.click(adminOption);

    await waitFor(() => {
      expect(screen.getByText(/access route level admin/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByTestId("submit-btn");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    const expectedPayload: Partial<AccountSetupType> = {
      firstname: "John",
      middlename: "Q",
      lastname: "Public",
      email: "john@example.com",
      imgurl: "none",
      username: "john@example.com",
      password: "P@ssw0rd123",
      confirmPassword: "P@ssw0rd123",
      accessLevel: 0,
      routers: [
        { label: "Dashboard", value: "/dashboard" },
        { label: "Analytics", value: "/dashboard/analytics" },
        { label: "Settings", value: "/settings" },
      ],
    };
    expect(mockOnSubmit.mock.calls[0][0]).toEqual(
      expect.objectContaining(expectedPayload)
    );
  });

  it("displays validation errors if fields are incorrect or empty", async () => {
    renderForm();

    const submitButton = screen.getByTestId("submit-btn");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.queryByText(/email is required/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/Password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });
});
