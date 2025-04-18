import {
  getTenant,
  getPreloadedGlobals,
  updateCustomerDumpStatusById,
  getCustomerDumps,
  create,
  confirmedCreation,
  getMaintenanceMode,
  getHasChatBotWidget,
} from "../../ssr";
import { config } from "../../config";
import {
  CreateCustomerDumpParams,
  CreateCustomerParams,
} from "../../api/types";
import { CmsTenant, TenantResponse } from "../../types/tenant";
import qs from "query-string";
import { getTimeZone } from "../../utils";
import { ChatBotSsr, MaintenanceSsr } from "../../types/global";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

const mockHeaders = {
  "Content-Type": "application/json",
  "x-api-key": config.value.XAPIKEY,
  "X-Environment": config.value.SYSENV,
  "X-Time-Zone": getTimeZone(),
};

const mockMaintenanceStatus = {
  id: "79a6d3d7-b30a-4eae-a689-0919ddd0d5bd",
  currentMaintenanceMode: ["dev", "uat"],
  createdDate: "2024-11-28T23:29:28.2473075",
  updatedDate: "2024-11-29T03:10:22.5355995",
};

const mockChatbotMode = {
  id: "d7c3487b-232f-4464-87ce-c0a87166d915",
  isEnabled: false,
  createdDate: "2025-01-09T07:48:01.9335557",
  updatedDate: "2025-01-09T07:48:01.9335842",
};

describe("SSR Functions", () => {
  const tenantUrl = "example-tenant";
  const paymentIntentId = "pi_12345";
  const customerData: CreateCustomerParams = {
    firstname: "test firstname",
    email: "test email",
    lastname: "test lastname",
    middlename: "test middlename",
    orderNumber: "nclex-123",
    productId: "test-productId",
    totalAmount: 100,
    password: "securePassword123",
    privacyServicePolicy: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch tenant content", async () => {
    const mockCmsTenant: CmsTenant = {
      headerText: { value: "Welcome" },
      tenantName: { value: "Test Tenant" },
      primaryColor: { value: "#ff0000" },
      secondaryColor: { value: "#00ff00" },
      tertiaryColor: { value: "#0000ff" },
      tenantUrl: { value: "https://test.com" },
      logoutUrl: { value: "https://test.com/logout" },
      expiredSessionUrl: { value: "https://test.com/session-expired" },
    };

    const mockTenantResponse: TenantResponse = {
      description: "Test tenant description",
      elements: mockCmsTenant,
      id: "tenant123",
      name: "Test Tenant",
      status: "active",
      type: "corporate",
      typeId: "1",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockTenantResponse),
    });

    const result = await getTenant(tenantUrl);

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v2/content/BaseContent/tenant-content/${tenantUrl}`,
      { headers: mockHeaders }
    );
    expect(result).toEqual(mockTenantResponse.elements);
  });

  it("should update customer dump status by ID", async () => {
    const mockResponse = 200;

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await updateCustomerDumpStatusById(paymentIntentId);

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v1/Customer/update-customer-dump-status-by-id?${qs.stringify({ paymentIntentId })}`,
      { method: "PUT", headers: mockHeaders }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should get customer dumps by payment intent ID", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(customerData),
    });

    const result = await getCustomerDumps(paymentIntentId);

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v1/Customer/get-customer-dumps-by-id?${qs.stringify({ paymentIntentId })}`,
      { headers: mockHeaders }
    );
    expect(result).toEqual(customerData);
  });

  it("should create a customer", async () => {
    const mockResponse = 201;

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await create(customerData);

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v1/Customer/create-customer`,
      {
        method: "POST",
        body: JSON.stringify(customerData),
        headers: mockHeaders,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should confirm customer creation", async () => {
    const mockResponse = 200;

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await confirmedCreation(paymentIntentId);

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v1/Customer/ssr-confirmed-customer-creation?${qs.stringify({ paymentIntentId })}`,
      { method: "POST", headers: mockHeaders }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should get maintenance mode", async () => {
    const mockMaintenanceMode: MaintenanceSsr = mockMaintenanceStatus;

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockMaintenanceMode),
    });

    const result = await getMaintenanceMode();

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v1/Customer/get-maintenance-mode`,
      { method: "GET", headers: mockHeaders }
    );
    expect(result).toEqual(mockMaintenanceStatus);
  });

  it("should get chatbot mode", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockChatbotMode),
    });

    const result = await getHasChatBotWidget();

    expect(fetch).toHaveBeenCalledWith(
      `${config.value.LOCAL_API_URL}/api/v1/Customer/get-helpwidget-status`,
      { method: "GET", headers: mockHeaders }
    );
    expect(result).toEqual(mockChatbotMode);
  });
});
