/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { MutOpt, ApiServiceErr, CategoryResponseType } from "./types";
import { useApi, useApiCallback } from "../../hooks";
import {
  CalcItemSelectResponseItem,
  ItemSelectTypes,
  RegularAnswer,
} from "../../types";
import { AxiosError, AxiosResponse } from "axios";
import { CategoryListResponse } from "../../types/category-response";
import {
  CategoryFormParams,
  CreatePaymentIntentParams,
  PaymentIntentResponse,
  IrtExamLogsResponse,
  ProductSetStatusParams,
  ThetaZeroCummResponse,
  ConfirmPaymentResponse,
  ConfirmPaymentParams,
  CheckoutSessionResponse,
  CheckoutSessionParams,
  CreateCustomerParams,
  ReportedIssuesResponse,
  ThetaCalcScratchResponse,
  ReportIssueType,
  GetAllInternalAccount,
  CreateRegularType,
  AuthorizedContentsResponseType,
  WebGetContentsParams,
  GetAllInclusionResponse,
  CreateInclusionParams,
  EditInclusionParams,
  SubsequentOptionType,
  GetDefaultReviewerResponse,
  DefaultReviewerDto,
  GetSubsequentLists,
  CreateAuthorizedMenusParams,
  AuthorizedMenu,
  AuthorizedMenuResponse,
  GetMenuByIdParams,
  UpdateMenuItemParams,
  ContactFormType,
  GetSectionParams,
  GetAllSectionsResponseType
} from "../../api/types";
import { PricingParams, ProductParams } from "../../types/types";
import { useAccessToken } from "../../contexts/auth/hooks";
import { StandardProgramListType } from "../../types/wc/programList";

export const useAppMutation = <Response, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<Response>,
  opt?: MutOpt<Response, TVariables>
) => useMutation<Response, ApiServiceErr, TVariables>(mutationFn, opt);

export const useLoadPreProcessQuery = (
  queryKey: string[]
): UseQueryResult<any, unknown> => {
  const [accessToken, setAccessToken] = useAccessToken();
  const loadPTestHimemCb = useApiCallback((api) =>
    api.calc.initializeLoadPTestHimem()
  );
  const loadPreTrackItemCb = useApiCallback((api) =>
    api.calc.initializeLoadPrepareTrackItem()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      if (!accessToken) return;
      loadPTestHimemCb.execute();
      loadPreTrackItemCb.execute();
    },
    { staleTime: Infinity }
  );
};

export const useSelectQuestionsQuery = (
  queryKey: string[],
  data: ItemSelectTypes
): UseQueryResult<CalcItemSelectResponseItem[] | undefined, any> => {
  const [accessToken, setAccessToken] = useAccessToken();
  const selectQuestionCb = useApiCallback(
    async (api, args: ItemSelectTypes) => await api.calc.ItemSelect(args)
  );

  return useQuery<CalcItemSelectResponseItem[] | undefined, ApiServiceErr>(
    queryKey,
    async () => {
      if (!accessToken) return;
      const result = await selectQuestionCb.execute({ ...data });
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useAnswerSubmission = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const submmisionCb = useApiCallback(
    async (api, args: RegularAnswer) => await api.calc.createAnswer(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, RegularAnswer>(
    async (data) => {
      const result = await submmisionCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useSelectAllCategories = (
  queryKey: string[]
): UseQueryResult<CategoryListResponse[] | undefined, any> => {
  const selectAllCategories = useApi(
    (api) => api.webbackoffice.web_internal_selectAll_categories(),
    []
  );

  return useQuery<CategoryListResponse[] | undefined, ApiServiceErr>(
    queryKey,
    async () => {
      const result = await selectAllCategories.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useCreateCategorySubmission = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const submissionCategoryCb = useApiCallback(
    async (api, args: CategoryFormParams) =>
      await api.webbackoffice.createCategoryInternal(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, CategoryFormParams>(
    async (data) => {
      const result = await submissionCategoryCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useCreateCustomer = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const createCustomerSubmissionCb = useApiCallback(
    async (api, args: CreateCustomerParams) =>
      await api.web.web_ssr_create_customer(args)
  );
  return useAppMutation<AxiosResponse<any, AxiosError>, CreateCustomerParams>(
    async (data) => {
      const result = await createCustomerSubmissionCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useDeleteCategory = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const deleteCategoryCb = useApiCallback(
    async (api, args: string) => await api.webbackoffice.deleteCategory(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, string>(
    async (id) => {
      const result = await deleteCategoryCb.execute(id);
      return result;
    },
    opt
  );
};

export const useCreatePricingSubmission = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const submissionCreatePricingCb = useApiCallback(
    async (api, args: PricingParams) =>
      await api.webbackoffice.createPricing(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, PricingParams>(
    async (data) => {
      const result = await submissionCreatePricingCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useCreateProductSubmission = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const submissionCreateProductCb = useApiCallback(
    async (api, args: ProductParams) =>
      await api.webbackoffice.createProducts(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, ProductParams>(
    async (data) => {
      const result = await submissionCreateProductCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useSetProductStatus = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const submissionSetProductStatusCb = useApiCallback(
    async (api, args: ProductSetStatusParams) =>
      await api.webbackoffice.setProductStatus(args)
  );
  return useAppMutation<
    AxiosResponse<number, AxiosError>,
    ProductSetStatusParams
  >(async (data) => {
    const result = await submissionSetProductStatusCb.execute({ ...data });
    return result;
  }, opt);
};

export const useCreatePaymentIntent = (
  opt?: MutOpt<AxiosResponse<PaymentIntentResponse, AxiosError>>
) => {
  const submissionCreatePaymentIntentCb = useApiCallback(
    async (api, args: CreatePaymentIntentParams) =>
      await api.web.web_create_payment_intent(args)
  );
  return useAppMutation<
    AxiosResponse<PaymentIntentResponse, AxiosError>,
    CreatePaymentIntentParams
  >(async (data) => {
    const result = await submissionCreatePaymentIntentCb.execute({ ...data });
    return result;
  }, opt);
};

export const useConfirmPayment = (
  opt?: MutOpt<AxiosResponse<ConfirmPaymentResponse, AxiosError>>
) => {
  const submissionConfirmPaymentCb = useApiCallback(
    async (api, args: ConfirmPaymentParams) =>
      await api.web.web_ssr_confirm_payment(args)
  );
  return useAppMutation<
    AxiosResponse<ConfirmPaymentResponse, AxiosError>,
    ConfirmPaymentParams
  >(async (data) => {
    const result = await submissionConfirmPaymentCb.execute({ ...data });
    return result;
  }, opt);
};

export const useCheckoutSession = (
  opt?: MutOpt<AxiosResponse<CheckoutSessionResponse, AxiosError>>
) => {
  const submissionCreateSessionCb = useApiCallback(
    async (api, args: CheckoutSessionParams) =>
      await api.web.web_ssr_create_checkout_session(args)
  );
  return useAppMutation<
    AxiosResponse<CheckoutSessionResponse, AxiosError>,
    CheckoutSessionParams
  >(async (data) => {
    const result = await submissionCreateSessionCb.execute({ ...data });
    return result;
  }, opt);
};

export const useGetAllCurrencies = (
  queryKey: string[]
): UseQueryResult<any, unknown> => {
  const getAllCurrencies = useApi((api) =>
    api.webbackoffice.getAllCurrencies()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllCurrencies.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllPricing = (queryKey: string[]) => {
  const getAllPricingList = useApi(
    (api) => api.webbackoffice.getAllPricing(),
    []
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllPricingList.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetOrderNumber = (queryKey: string[]) => {
  const getOrderNumber = useApiCallback((api) =>
    api.webbackoffice.getOrderNumber()
  );
  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getOrderNumber.execute();
      return result.data;
    },
    {
      enabled: false,
      staleTime: Infinity,
    }
  );
};

export const useSelectAllProducts = (queryKey: string[]) => {
  const getAllProducts = useApi(
    (api) => api.webbackoffice.getAllProducts(),
    []
  );
  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllProducts.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useDeleteAllCalc = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const deleteAllCalc = useApiCallback(
    async (api, args: string) => await api.calc.deleteAllCalc(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, string>(
    async (id) => {
      const result = await deleteAllCalc.execute(id);
      return result;
    },
    opt
  );
};

export const useGetIrtExamLogs = (
  queryKey: string[],
  accountId: string
): UseQueryResult<IrtExamLogsResponse[] | undefined, any> => {
  const getIrtExamLogs = useApi((api) => api.calc.getIrtExamlogs(accountId));

  return useQuery<IrtExamLogsResponse[] | undefined, ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getIrtExamLogs.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetIrtZeroCalc = (
  queryKey: string[],
  accountId: string
): UseQueryResult<ThetaZeroCummResponse[] | undefined, any> => {
  const getIrtZeroCalc = useApi((api) => api.calc.getIrtZeroCalc(accountId));

  return useQuery<ThetaZeroCummResponse[] | undefined, ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getIrtZeroCalc.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllReportedIssues = (
  queryKey: string[]
): UseQueryResult<ReportedIssuesResponse[] | undefined, any> => {
  const getAllReportedIssues = useApi((api) =>
    api.webbackoffice.getAllReportedIssues()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllReportedIssues.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetIrtThetaCalcScratch = (
  queryKey: string[],
  accountId: string
): UseQueryResult<ThetaCalcScratchResponse[] | undefined, any> => {
  const getIrtThetaCalcScratch = useApi((api) =>
    api.calc.getIrtThetaCalScratch(accountId)
  );

  return useQuery<ThetaCalcScratchResponse[] | undefined, ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getIrtThetaCalcScratch.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useCreateReportIssue = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const submissionCreateReportIssueCb = useApiCallback(
    async (api, args: ReportIssueType) =>
      await api.web.web_create_report_issue(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, ReportIssueType>(
    async (data) => {
      const result = await submissionCreateReportIssueCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useGetCategoryByType = (
  queryKey: string[],
  type: number
): UseQueryResult<any | undefined, any> => {
  const getCategoryByType = useApi((api) => api.web.get_category_by_type(type));

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getCategoryByType.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetRegularQuestionDDCategory = (
  queryKey: string[],
  type: number
): UseQueryResult<any | undefined, any> => {
  const getClientNeeds = useApi((api) =>
    api.webbackoffice.getRegularQuestionDDCategory(type)
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getClientNeeds.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllInternalAccounts = (
  queryKey: string[]
): UseQueryResult<GetAllInternalAccount[] | undefined, any> => {
  const getAllInternalAccount = useApi((api) =>
    api.webbackoffice.getAllInternalAccount()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllInternalAccount.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useCreateRegularQuestion = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const CreateRegularQuestionCb = useApiCallback(
    async (api, args: CreateRegularType) =>
      await api.webbackoffice.createRegularQuestion(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, CreateRegularType>(
    async (data) => {
      const result = await CreateRegularQuestionCb.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useGetContents = (
  queryKey: string[],
  args: WebGetContentsParams
): UseQueryResult<AuthorizedContentsResponseType[] | undefined, any> => {
  const getRegularQuestions = useApi((api) =>
    api.webbackoffice.web_get_regular_question(args)
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getRegularQuestions.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllInclusion = (
  queryKey: string[]
): UseQueryResult<GetAllInclusionResponse[] | undefined, any> => {
  const getAllInclusion = useApi((api) => api.webbackoffice.getAllInclusions());

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllInclusion.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useDeleteRoute = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const deleteCategoryCb = useApiCallback(
    async (api, args: string) => await api.webbackoffice.delete_route(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, string>(
    async (id) => {
      const result = await deleteCategoryCb.execute(id);
      return result;
    },
    opt
  );
};

export const useCreateInclusion = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const createInclusionCB = useApiCallback(
    async (api, args: CreateInclusionParams) =>
      await api.webbackoffice.createInclusions(args)
  );
  return useAppMutation<
    AxiosResponse<number, AxiosError>,
    CreateInclusionParams
  >(async (data) => {
    const result = await createInclusionCB.execute({ ...data });
    return result;
  }, opt);
};

export const useUpdateInclusion = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const updateInclusionCB = useApiCallback(
    async (api, args: EditInclusionParams) =>
      await api.webbackoffice.editInclusion(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, EditInclusionParams>(
    async (data) => {
      const result = await updateInclusionCB.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useCreateSubsequentOptions = (
  opt?: MutOpt<AxiosResponse<SubsequentOptionType, AxiosError>>
) => {
  const createSubsequentOption = useApiCallback(
    async (api, args: SubsequentOptionType) =>
      await api.webbackoffice.web_create_subsequent(args)
  );
  return useAppMutation<
    AxiosResponse<SubsequentOptionType, AxiosError>,
    SubsequentOptionType
  >(async (data) => {
    const result = await createSubsequentOption.execute({ ...data });
    return result;
  }, opt);
};

export const useGetSelectedApprovers = (
  queryKey: string[]
): UseQueryResult<DefaultReviewerDto[] | undefined, any> => {
  const getSelectedApprover = useApi((api) =>
    api.webbackoffice.getSelectedApprover()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getSelectedApprover.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllInternalInclusions = (
  queryKey: string[]
): UseQueryResult<GetAllInclusionResponse[] | undefined, any> => {
  const getInternalInclusions = useApi((api) =>
    api.webbackoffice.getAllInclusionLists()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getInternalInclusions.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetSubsequentList = (
  queryKey: string[]
): UseQueryResult<GetSubsequentLists[] | undefined, any> => {
  const getSubsequentLists = useApi((api) =>
    api.webbackoffice.getSubsequentLists()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getSubsequentLists.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useCreateAuthorizedMenus = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const createAuthorizedMenus = useApiCallback(
    async (api, args: CreateAuthorizedMenusParams) =>
      await api.webbackoffice.createAuthorizedMenus(args)
  );
  return useAppMutation<
    AxiosResponse<number, AxiosError>,
    CreateAuthorizedMenusParams
  >(async (data) => {
    const result = await createAuthorizedMenus.execute({ ...data });
    return result;
  }, opt);
};

export const useGetAllMenus = (
  queryKey: string[]
): UseQueryResult<AuthorizedMenuResponse[] | undefined, any> => {
  const getAllMenus = useApi((api) => api.webbackoffice.getAllMenus());

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllMenus.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetMenuById = (
  queryKey: string[],
  menuId: GetMenuByIdParams
): UseQueryResult<AuthorizedMenuResponse | undefined, any> => {
  const getMenuById = useApi((api) => api.webbackoffice.getMenuById(menuId));

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getMenuById.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useUpdateMenuItem = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const updateMenuItem = useApiCallback(
    async (api, args: UpdateMenuItemParams) =>
      await api.webbackoffice.updateMenuItem(args)
  );
  return useAppMutation<
    AxiosResponse<number, AxiosError>,
    UpdateMenuItemParams
  >(async (data) => {
    const result = await updateMenuItem.execute({ ...data });
    return result;
  }, opt);
};

export const useCreateContactUs = (
  opt?: MutOpt<AxiosResponse<number, AxiosError>>
) => {
  const contactUsSubmission = useApiCallback(
    async (api, args: ContactFormType) =>
      await api.web.web_create_contact_us(args)
  );
  return useAppMutation<AxiosResponse<number, AxiosError>, ContactFormType>(
    async (data) => {
      const result = await contactUsSubmission.execute({ ...data });
      return result;
    },
    opt
  );
};

export const useGetAllCategories = (
  queryKey: string[]
): UseQueryResult<CategoryResponseType[] | undefined, any> => {
  const getAllCategories = useApi((api) => api.webbackoffice.getAllCategory());

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllCategories.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useCommenceEnvMaintenanceMode = (
  opt?: MutOpt<AxiosResponse<string[], AxiosError>>
) => {
  const commenceEnvMaintenanceMode = useApiCallback(
    async (api, args: string[]) =>
      await api.webbackoffice.maintenaceModeByEnv(args)
  );
  return useAppMutation<AxiosResponse<string[], AxiosError>, string[]>(
    async (data) => {
      const result = await commenceEnvMaintenanceMode.execute(data);
      return result;
    },
    opt
  );
};

export const useGetSectionsByType = (
  queryKey: string[],
  sectionType: GetSectionParams
): UseQueryResult<GetAllSectionsResponseType | undefined, any> => {
  const getSectionsByType = useApi((api) => api.webbackoffice.getSectionListByType(sectionType));

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getSectionsByType.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllSections = (
  queryKey: string[],
): UseQueryResult<GetAllSectionsResponseType | undefined, any> => {
  const getAllSections = useApi((api) => api.webbackoffice.getAllSections());

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllSections.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};

export const useGetAllPrograms = (
  queryKey: string[],
): UseQueryResult<StandardProgramListType | undefined, any> => {
  const getAllPrograms = useApi((api) => api.webbackoffice.getAllPrograms());

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      const result = await getAllPrograms.execute();
      return result.data;
    },
    { staleTime: Infinity }
  );
};