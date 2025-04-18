/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { AxiosInstance } from "axios";
import {
  AccessKey,
  CmsTokens,
  PricingParams,
  ProductParams,
} from "../../types/types";
import { CmsPageResponse } from "../../types/page";
import { CmsGlobals } from "../../types/global";
import { CmsFooter } from "../../types/tenant";
import { MenuItem } from "../../types/menu";
import qs from "query-string";
import { CategoryListResponse } from "../../types/category-response";
import {
  AuthorizedContentsResponseType,
  AuthorizedMenu,
  AuthorizedMenuParams,
  AuthorizedRoutes,
  CategoryFormParams,
  ContactResponseType,
  CreateInclusionParams,
  CreateRegularType,
  CurrenciesResponse,
  DefaultReviewerParams,
  DiscrepanciesResponse,
  EditInclusionParams,
  FileUploadParams,
  GetAllInclusionResponse,
  GetAllInternalAccount,
  GetDefaultReviewerResponse,
  PricingListResponse,
  ProductListResponse,
  ProductSetStatusParams,
  RegularQuestionTypeParams,
  WebGetContentsParams,
  SubsequentOptionType,
  GetSubsequentLists,
  CreateAuthorizedMenusParams,
  AuthorizedMenuResponse,
  GetMenuByIdParams,
  UpdateMenuItemParams,
  LoginResponse,
  OpenPagesResponse,
  CreateDndOptionsParams,
  DndOptionParams,
  DndOptionsResponseType,
  CaseNameParams,
  DeleteCaseNameParams,
  CaseNameResponseType,
  CreateSectionResponse,
  GetAllSectionsResponseType,
  GetSectionParams,
  UpdateSectionResponse,
  CreateProgramParams,
  CreateProgramResponse,
  UpdateProgramParams,
  DeleteReportIssuesParams,
  GetCountryTimezonesParams,
  CreateGoliveSchedule,
  PolicyFileResponseType,
  GetCaseStudyListParams,
  CaseStudyListResponse,
  GetProgramParams,
  DeleteProgramSectionParams,
} from "../types";
import { CategoryResponseType } from "../../core/hooks/types";
import { StandardProgramListType } from "../../types/wc/programList";
import { createFormData } from "../../utils/createFormData";

export class WebApiBackOffice {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}
  public tokenInformation() {
    /* get tokenize informations */
    return this.axios.get<CmsTokens>("");
  }

  public web_internal_selectAll_categories() {
    return this.axios.get<CategoryListResponse[]>(
      `/api/v1/Category/get-categories`
    );
  }
  /* authorized and unauthorized api is not yet present this time.  */
  public async page(
    slug: string,
    tenantUrl: string,
    contentAccessKey?: string
  ) {
    try {
      return await this.axios.get<CmsPageResponse>(
        contentAccessKey
          ? `/api/content-api/api/v2/content/authorized-page` // params stringify not yet build
          : `/api/v2/content/BaseContent/unauthorized-page?${qs.stringify({ pageUrl: slug, tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }

  public async openPage(slug: string, contentAccessKey: string | null) {
    try {
      const endpoint = contentAccessKey
        ? `/api/v2/content/BaseContent/authorized-open-pages`
        : `/api/v2/content/BaseContent/unauthorized-open-pages`;

      const response = await this.axios.get<OpenPagesResponse>(endpoint, {
        params: { pageRoute: slug },
      });

      return response.data;
    } catch (err: any) {
      throw err;
    }
  }

  public getAuthorizedMenus(params: AuthorizedMenuParams) {
    return this.axios.post<AuthorizedMenu>(
      `/api/v2/content/BaseContent/get-authorized-menus`,
      params
    );
  }

  public getContentRoutes(uid: string | undefined) {
    return this.axios.get<Array<AuthorizedRoutes>>(
      `/api/v2/internal/baseInternal/internal-auth-routes?accountId=${uid}`
    );
  }

  public automationUploadDocuments(params: FileUploadParams) {
    const form = new FormData();
    form.append("file", params.file);
    return this.axios.post<DiscrepanciesResponse | number>(
      `/v1/api/baseAppload/automation-sq-compare`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  public getDefaultReviewer() {
    return this.axios.get<GetDefaultReviewerResponse[]>(
      `/api/v2/content/BaseContent/get-default-reviewer`
    );
  }

  public createDefaultReviewer(params: DefaultReviewerParams) {
    return this.axios.post(
      `/api/v2/content/BaseContent/create-default-reviewer`,
      params
    );
  }

  public async globals(tenantUrl: string, contentAccessKey?: string) {
    try {
      return await this.axios.get<CmsGlobals>(
        contentAccessKey
          ? `/api/content-api/api/v2/content/authorized-globals?${qs.stringify({
              contentAccessKey: "",
            })}`
          : `/api/v2/content/BaseContent/unauthorized-globals?${qs.stringify({ tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }

  public refreshAccessKey(tenantUrl: string) {
    return this.axios.get<AccessKey>(
      `` //no current refresh access key for content.
    );
  }

  public accessKey(tenantUrl: string) {
    return this.axios.post<AccessKey>(``); //no current access key for content.
  }

  public contentAccessKey(params: { accountId?: string; appName: string }) {
    return this.axios.post<LoginResponse>(
      `/api/v2/internal/baseInternal/content-access-key`,
      params
    ); //no current access key for content.
  }

  public async footer(tenantUrl: string, contentAccessKey?: string) {
    try {
      return await this.axios.get<CmsFooter>(
        contentAccessKey
          ? `` //no current authorized-footer api
          : `/api/v2/content/BaseContent/unauthorized-footer?${qs.stringify({ tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }

  public async menu(tenantUrl: string, contentAccessKey?: string) {
    try {
      return await this.axios.get<MenuItem[]>(
        contentAccessKey
          ? `` //no current authorized-menu api
          : `/api/v2/content/BaseContent/unauthorized-menu?${qs.stringify({ tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: [] };
      }
      throw err;
    }
  }

  public async deleteCategory(categoryId: string) {
    return await this.axios.delete<number>(
      `/api/v1/Category/remove-category?${qs.stringify({ categoryId })}`
    );
  }

  public createCategoryInternal(params: CategoryFormParams) {
    return this.axios.post<number>(
      `/api/v1/Category/create-category-internal`,
      params
    );
  }

  public shouldDoAccountSetup() {
    return this.axios.get<boolean>(
      `/api/v2/internal/baseInternal/check-account-setup`
    );
  }

  public createPricing(params: PricingParams) {
    return this.axios.post<number>(
      `/api/v1/Product/internal-add-pricing`,
      params
    );
  }

  public getAllCurrencies() {
    return this.axios.get<CurrenciesResponse>(
      `/api/v1/Product/internal-currency-list`
    );
  }

  public getAllPricing() {
    return this.axios.get<PricingListResponse[]>(
      `/api/v1/Product/internal-pricing-list`
    );
  }

  public getOrderNumber() {
    return this.axios.get<string>("/api/v1/Order/get-order-number");
  }

  public async createProducts(params: ProductParams) {
    return await this.axios.post<number>(
      `/api/v1/Product/internal-add-products`,
      params
    );
  }

  public createRegularType(params: RegularQuestionTypeParams) {
    return this.axios.post<number>(
      `/api/v1/Category/create-regular-type`,
      params
    );
  }

  public async createRegularQuestion(params: CreateRegularType) {
    return await this.axios.post<number>(
      `/api/v2/content/baseContent/create-content`,
      params
    );
  }

  public async getAllProducts() {
    return await this.axios.get<ProductListResponse[]>(
      `/api/v1/Product/internal-products-list`
    );
  }

  public async setProductStatus(params: ProductSetStatusParams) {
    return await this.axios.put<number>(
      `/api/v1/Product/internal-set-product-status`,
      params
    );
  }

  public async getAllReportedIssues() {
    return await this.axios.get("/api/v1/Customer/get-all-report-issues");
  }

  public async getRegularQuestionDDCategory(type: number) {
    return await this.axios.get("/api/v1/Category/get-category-by-type", {
      params: {
        CategoryType: type,
      },
    });
  }

  public async getAllInternalAccount() {
    return await this.axios.get<GetAllInternalAccount[]>(
      `/api/v2/internal/baseInternal/internal-all-accounts`
    );
  }

  public async web_get_regular_question(params: WebGetContentsParams) {
    return await this.axios.post<AuthorizedContentsResponseType[]>(
      `/api/v2/content/BaseContent/authorized-contents?${qs.stringify({ ...params })}`
    );
  }

  public async getAllInclusions() {
    return await this.axios.get<GetAllInclusionResponse[]>(
      `/api/v1/product/internal-all-inclusions`
    );
  }

  public async delete_route(MenuId: string) {
    return await this.axios.delete(
      `/api/v2/content/BaseContent/inapp-route-delete?${qs.stringify({ MenuId })}`
    );
  }

  public async createInclusions(params: CreateInclusionParams) {
    return await this.axios.post(
      `/api/v1/product/internal-add-inclusions`,
      params
    );
  }

  public async deleteInclusion(InclusionId: string) {
    return await this.axios.delete(
      `/api/v1/product/internal-delete-inclusion?${qs.stringify({ id: InclusionId })}`
    );
  }

  public async editInclusion(params: EditInclusionParams) {
    return await this.axios.put(
      `/api/v1/product/internal-update-inclusion`,
      params
    );
  }
  public async web_create_subsequent(params: SubsequentOptionType) {
    return await this.axios.post<SubsequentOptionType>(
      `/v1/api/Chatbot/create-subsequent-options`,
      params
    );
  }
  public async getSelectedApprover() {
    return await this.axios.get<GetDefaultReviewerResponse[]>(
      `/api/v2/content/BaseContent/get-selected-approvers`
    );
  }

  public async getAllInclusionLists() {
    return await this.axios.get<GetAllInclusionResponse[]>(
      `/api/v1/Product/internal-all-inclusions`
    );
  }

  public async getSubsequentLists() {
    return await this.axios.get<GetSubsequentLists[]>(
      `/v1/api/Chatbot/get-subsequent-list`
    );
  }
  public async createAuthorizedMenus(params: CreateAuthorizedMenusParams) {
    return await this.axios.post(
      `/api/v2/content/BaseContent/create-authorized-menus`,
      params
    );
  }

  public async getAllMenus() {
    return await this.axios.get<AuthorizedMenuResponse[]>(
      `/api/v2/content/BaseContent/get-all-menus`
    );
  }

  public async getMenuById(params: GetMenuByIdParams) {
    return await this.axios.get<AuthorizedMenuResponse>(
      `/api/v2/content/BaseContent/get-menu?${qs.stringify({ ...params })}`
    );
  }

  public async updateMenuItem(params: UpdateMenuItemParams) {
    return await this.axios.post(
      `/api/v2/content/BaseContent/update-menu-item`,
      params
    );
  }

  public async getAllCategory() {
    return await this.axios.get<CategoryResponseType[]>(
      "/api/v1/Category/fetch-all-category-type"
    );
  }

  public async maintenaceModeByEnv(params: string[]) {
    return await this.axios.post("/api/v1/Customer/commence-maintenance-mode", {
      environments: params,
    });
  }

  public async getFormId() {
    return await this.axios.get("/api/v2/content/BaseContent/get-form-id");
  }

  public async createDndOptions(params: CreateDndOptionsParams) {
    return await this.axios.post(
      "/api/v2/content/BaseContent/create-dnd-option",
      params
    );
  }

  public async getDndOptionList(params: DndOptionParams) {
    return await this.axios.post<DndOptionsResponseType[]>(
      `/api/v2/content/BaseContent/get-all-dnd-options`,
      { ...params }
    );
  }

  public async deleteDndOption(optionId: string) {
    return await this.axios.delete(
      `/api/v2/content/BaseContent/delete-dnd-option?${qs.stringify({ OptionId: optionId })}`
    );
  }

  public async updateHelpWidgetStatus(isEnabled: boolean) {
    return await this.axios.put(`/api/v1/Customer/update-helpwidget-status`, {
      isEnabled,
    });
  }

  public async getAllCaseNames() {
    return await this.axios.get<CaseNameResponseType[]>(
      `/api/v2/content/BaseContent/get-case-names`
    );
  }

  public async createCaseName(params: CaseNameParams) {
    return await this.axios.post(
      `/api/v2/content/BaseContent/create-case-name`,
      params
    );
  }

  public async deleteCaseName(params: DeleteCaseNameParams) {
    return await this.axios.delete(
      `/api/v2/content/BaseContent/delete-case-name?${qs.stringify({ ...params })}`
    );
  }

  public async createGoliveSchedule(params: CreateGoliveSchedule) {
    return await this.ssrAxios.post(`/api/go-live/create-schedule`, params);
  }

  public async getCountryTimezone(params: GetCountryTimezonesParams) {
    return await this.axios.post<GetCountryTimezonesParams[]>(
      `/api/v2/content/baseContent/get-country-timezones`,
      params
    );
  }

  public async getAllSections() {
    return await this.axios.get<GetAllSectionsResponseType[]>(
      `/api/v2/content/BaseContent/get-sections`
    );
  }
  
  public async getSectionListByType(params: GetSectionParams) {
    return await this.axios.get<GetAllSectionsResponseType[]>(
      `/api/v2/content/BaseContent/get-sections?${qs.stringify({ ...params })}`);
  }

  public async deleteSectionList(sectionId: string) {
    return await this.axios.delete(`/api/v2/content/BaseContent/${sectionId}`);
  }
  
  public async updateSectionById(form: FormData) {
    return await this.axios.put<UpdateSectionResponse | number>(
      `/api/v2/content/BaseContent/${form.get("sectionId")}`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }

  public async createSection(form: FormData) {
    return await this.ssrAxios.post<CreateSectionResponse | number>(
      `/api/programs/create-section`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }

  public async createPrograms(params: CreateProgramParams) {
    const form = createFormData({
      title: params.title,
      programImage: params.programImage[0],
      programType: params.programType.toString(),
      stringifiedSections: JSON.stringify(params.stringifiedSections),
    });

    return await this.ssrAxios.post<CreateProgramResponse | number>(
      `/api/programs/create-program`,
      form,
      { 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  }

  public async getAllPrograms() {
    return await this.axios.get<StandardProgramListType[]>(
      `/api/v2/content/BaseContent/get-internal-programs`
    );
  }

  public async getAllProgramsByType(params: GetProgramParams) {
    return await this.axios.get<StandardProgramListType[]>( 
      `/api/v2/content/BaseContent/get-internal-programs?${qs.stringify({ ...params })}`);
  }

  public async updatePrograms(params: UpdateProgramParams) {
    const form = createFormData({
      id: params.id,
      title: params.title,
      programImage: params.programImage[0],
      programType: params.programType.toString(),
      stringifiedSections: JSON.stringify(params.stringifiedSections),
    });

    return await this.axios.put<number>(
      `/api/v2/content/BaseContent/update-program`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  }

  public async deleteProgramById(programId: string) {
    return await this.axios.delete(`/api/v2/content/BaseContent/delete-program/${programId}`);
  }

  public async deleteProgramSectionById(params: DeleteProgramSectionParams) {
    return await this.axios.delete(`/api/v2/content/BaseContent/delete-program-section`, {
      data: params,
    });
  }

  public async deleteReportIssue(params: DeleteReportIssuesParams) {
    return await this.axios.delete(
      `/api/v1/Customer/delete-report-issue?${qs.stringify({ ...params })}`
    );
  }
  public async caseStudyList(params: GetCaseStudyListParams) {
    return await this.axios.get<CaseStudyListResponse[]>(
      `/api/v2/content/BaseContent/get-content-by-author?${qs.stringify({ ...params })}`
    );
  }
  public async getPdf(policyType: number) {
    return await this.axios.get<PolicyFileResponseType>(
      `/api/v2/content/BaseContent/get-file-url?policy=${policyType}`
    );
  }
  public async getAllContacts() {
    return await this.axios.get<ContactResponseType>(
      `/api/v2/content/BaseContent/get-contact-us`
    );
  }

  
  public async deleteContact(id: string) {
    return await this.axios.delete(
      `/api/v2/content/BaseContent/delete-contact-us`, { data: { id } }
    );
  }
}


