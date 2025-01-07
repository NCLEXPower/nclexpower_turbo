import { AxiosError, AxiosInstance } from "axios";
import { internalAccountType, RegisterParams } from "../../types/types";
import qs from "query-string";
import { config } from "../../config";
import {
  AnalyticsParams,
  CheckoutSessionParams,
  CheckoutSessionResponse,
  ConfirmPaymentParams,
  ConfirmPaymentResponse,
  ContactFormType,
  CreateCustomerDumpParams,
  CreateCustomerParams,
  CreateCustomerResponse,
  CreatePaymentIntentParams,
  CreateSalesParams,
  OrderSummaryResponse,
  PaymentIntentResponse,
  ReportIssueType,
  ResendCodeParams,
  ResetPasswordParams,
  SelectEmailResponse,
  UpdatePaymentIntentParams,
  ValidateResetLinkTokenParams,
  VerificationResponse,
  VerifyCodeParams,
} from "../types";
import { Encryption } from "../../utils";
import { ChatBotOptionResponse } from "../../types/chatbot";
import { AllSalesProps } from "../../hooks/analytics/types";
export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}

  /* This api should be in web-api-backoffice */
  public web_account_setup(params: RegisterParams) {
    return this.axios.post<number>(
      "/api/v2/payment/intent/config-get-publishable-key/",
      params
    );
  }

  public web_get_publishableKey() {
    return this.ssrAxios.get<string>(
      `/api/publishable/${qs.stringify({ environments: config.value.APPENV })}`
    );
  }

  public web_select_email(email: string) {
    return this.ssrAxios.post<SelectEmailResponse>(
      `/api/account-recovery/${qs.stringify({ email: email })}`
    );
  }

  public web_reset_link(params: ResendCodeParams) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/reset/send-link`,
      params
    );
  }

  public web_verification_code(email: string) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/verification/${qs.stringify({ email: email })}`
    );
  }

  public web_verify_otp_code(params: VerifyCodeParams) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/security/otp/verify`,
      params
    );
  }

  public web_validate_reset_token(params: ValidateResetLinkTokenParams) {
    return this.ssrAxios.post<boolean>(
      `/api/security/reset-link/validate-token`,
      params
    );
  }

  public web_reset_password(params: ResetPasswordParams) {
    try {
      const { newPassword, accountId, token } = params;
      const encrypt = Encryption(newPassword, config.value.SECRET_KEY);
      return this.ssrAxios.post<number>(
        `/api/security/reset-link/reset-password`,
        { newPassword: encrypt, accountId, token }
      );
    } catch (error) {
      console.error("error", error);
    }
  }

  public web_resend_otp_code(params: ResendCodeParams) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/security/otp/resend`,
      params
    );
  }

  public web_create_payment_intent(params: CreatePaymentIntentParams) {
    return this.ssrAxios.post<PaymentIntentResponse>(
      `/api/client/secret`,
      params
    );
  }

  public web_update_payment_intent(params: UpdatePaymentIntentParams) {
    return this.axios.post<number>(
      `/api/v2/payment/intent/update-payment-intent`,
      params
    );
  }

  public web_ssr_confirm_payment(params: ConfirmPaymentParams) {
    return this.ssrAxios.post<ConfirmPaymentResponse>(
      `/api/client/confirm-payment`,
      params
    );
  }

  public web_ssr_create_checkout_session(params: CheckoutSessionParams) {
    return this.ssrAxios.post<CheckoutSessionResponse>(
      `/api/client/create-payment-session`,
      params
    );
  }

  public web_ssr_create_customer(params: CreateCustomerParams) {
    return this.ssrAxios.post<CreateCustomerResponse>(
      `/api/customer/create`,
      params
    );
  }

  public web_create_customer_dump(params: CreateCustomerDumpParams) {
    return this.axios.post<number>(
      `/api/v1/Customer/create-customer-dump`,
      params
    );
  }

  public web_get_client_secretKey(pageRoute: string) {
    return this.axios.get<string>(
      `/api/v2/internal/baseInternal/get-client-key?${qs.stringify({ pageRoute })}`
    );
  }

  public web_create_report_issue(params: ReportIssueType) {
    return this.axios.post<number>(
      `/api/v1/Customer/create-report-issue`,
      params
    );
  }

  public async get_category_by_type(type: number) {
    return await this.axios.get("/api/v1/Category/get-category-by-type", {
      params: {
        CategoryType: type,
      },
    });
  }

  public async web_chatbot_question_nodes(optionKey?: string) {
    //this can be placed as SSR. We can also add content access key for security purposes.
    try {
      return await this.axios.get<ChatBotOptionResponse>(
        `/v1/api/Chatbot/selected-chat-option?${qs.stringify({ optionKey })}`
      );
    } catch (err: any) {
      throw err;
    }
  }

  public web_create_contact_us(params: ContactFormType) {
    return this.axios.post(`/api/v1/Customer/create-contact-us`, params);
  }

  public dataSummary<T = Record<string, object>>(
    url: string,
    params: Record<string, any>
  ) {
    return this.axios.get<T>(`/${url}?${qs.stringify(params)}`);
  }

  public async create_order_summary(props: {
    orderNumber: string | undefined;
    productId: string;
    accountId: string | undefined;
    pricingId: string | undefined;
  }) {
    return await this.axios.post<string>(
      `/api/v1/Order/create-order-summary`,
      props
    );
  }

  public async getOrderSummary(accountId: string | undefined) {
    return await this.axios.get<OrderSummaryResponse>(
      `/api/v1/Order/get-order-summary?${qs.stringify({ accountId })}`
    );
  }

  public async changePaymentStatus(accountId: string | undefined) {
    return await this.axios.put(
      `/api/v1/Customer/change-payment-status?${qs.stringify({ accountId })}`
    );
  }

  public analyticsParams(accountId: string) {
    return this.axios.get<AnalyticsParams>(
      `/api/v1/Customer/analytics?${qs.stringify({ accountId })}`
    );
  }
  public createSales(params: CreateSalesParams) {
    return this.axios.post(`/api/v1/nclex-analytics/create-sales`, params);
  }

  public async getInitialAnalytics() {
    return await this.axios.get<AllSalesProps>(
      `/api/v1/nclex-analytics/initial-analytics`
    );
  }

  public async getActiveGoLiveSchedule() {
    return await this.axios.get(
      `/api/v2/internal/BaseInternal/active-schedule`
    );
  }
}
