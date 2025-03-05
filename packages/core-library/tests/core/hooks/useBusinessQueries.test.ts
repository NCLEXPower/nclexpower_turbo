import { renderHook, act, screen, render } from "../../common";
import {
  useSelectQuestionsQuery,
  useCreatePaymentIntent,
  useGetContents,
  useDeleteRoute,
  useDeleteCategory,
  useGetAllInternalAccounts,
  useGetRegularQuestionDDCategory,
  useGetCategoryByType,
  useGetAllCurrencies,
  useGetAllPricing,
  useGetOrderNumber,
  useGetAllInclusion,
  useCreateInclusion,
  useUpdateInclusion,
  useCreateSubsequentOptions,
  useCreateReportIssue,
  useGetSelectedApprovers,
  useGetAllInternalInclusions,
  useSelectAllCategories,
  useGetSubsequentList,
  useGetAllMenus,
  useUpdateMenuItem,
  useCreateContactUs,
  useGetAllCategories,
  useCommenceEnvMaintenanceMode,
  useAppMutation,
  useGetSectionsByType,
  useGetAllSections,
  useGetAllPrograms,
} from "../../../core/hooks/useBusinessQueries";
import { useApiCallback } from "../../../hooks";
import { CalcItemSelectResponseItem } from "../../../types";
import { useMutation, useQuery } from "react-query";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import {
  AuthorizedContentsResponseType,
  CreateInclusionParams,
  CurrenciesResponse,
  EditInclusionParams,
  GetAllInclusionResponse,
  GetAllInternalAccount,
  GetCategoryType,
  DefaultReviewerDto,
  PaymentIntentResponse,
  PricingListResponse,
  ReportIssueType,
  SubsequentOptionType,
  GetSubsequentLists,
  AuthorizedMenuResponse,
  UpdateMenuItemParams,
  MenuItems,
  GetMenuByIdParams,
  ContactFormType,
  GetAllSectionsResponseType,
  GetSectionParams,
} from "../../../api/types";
import { CategoryListResponse } from "../../../types/category-response";
import { EditMenuItemsType } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/types/types";
import { CategoryResponseType } from "../../../core/hooks/types";
import { MaintenanceSsr } from "../../../types/global";
import { StandardProgramListType } from "../../../types/wc/programList";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../hooks/useApi", () => ({
  useApiCallback: jest.fn().mockReturnValue({
    loading: false,
    result: {
      data: {},
    },
    error: undefined,
  }),
  useApi: jest.fn().mockReturnValue({
    loading: false,
    result: {
      data: {},
    },
    error: undefined,
  }),
}));

jest.mock("../../../core/hooks/useBusinessQueries", () => ({
  ...jest.requireActual("../../../core/hooks/useBusinessQueries"),
  useAppMutation: jest.fn(),
}));

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

describe("useSelectQuestionsQuery", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return questions data", async () => {
    const mockData: CalcItemSelectResponseItem[] = [
      {
        actionKey: "",
        choices: "",
        cnCateg: 1,
        correct: "0",
        current: 1,
        hasContainer: 0,
        lNum: "",
        qId: 0,
        question: "",
        typeOfQuestion: "",
      },
    ];
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(useQuery).toHaveBeenCalledWith(["questions"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetContents", () => {
  const mockExecute = jest.fn();
  const mockCreateCheckoutSession = jest.fn();

  jest.mock("../../../core/hooks/useBusinessQueries", () => {
    const actualModule = jest.requireActual(
      "../../../core/hooks/useBusinessQueries"
    );
    return {
      ...actualModule,
      useCheckoutSession: () => ({
        mutateAsync: mockCreateCheckoutSession,
      }),
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return authorized contents", async () => {
    const mockData: AuthorizedContentsResponseType[] = [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        contentApprovers: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            content: "string",
            approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            approver: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              createdDate: "2024-09-17T11:46:04.183Z",
              updatedDate: "2024-09-17T11:46:04.183Z",
            },
          },
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        author: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdDate: "2024-09-17T11:46:04.183Z",
          updatedDate: "2024-09-17T11:46:04.183Z",
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        revisions: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "string",
            mainType: "string",
            mainContentCollections: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                cognitiveLevel: "string",
                clientNeeds: "string",
                contentArea: "string",
                question: "string",
                mainContentAnswerCollections: [
                  {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    answer: "string",
                    answerKey: true,
                  },
                ],
              },
            ],
            createdDate: "2024-09-17T11:46:04.183Z",
            updatedDate: "2024-09-17T11:46:04.183Z",
          },
          adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          highlights: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              highlightedText: "string",
              comment: "string",
              startPosition: 0,
              endPosition: 0,
            },
          ],
          revisionStatus: 0,
          createdDate: "2024-09-17T11:46:04.183Z",
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        mainContent: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          type: "string",
          mainType: "string",
          mainContentCollections: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              cognitiveLevel: "string",
              clientNeeds: "string",
              contentArea: "string",
              question: "string",
              mainContentAnswerCollections: [
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  answer: "string",
                  answerKey: true,
                },
              ],
            },
          ],
          createdDate: "2024-09-17T11:46:04.183Z",
          updatedDate: "2024-09-17T11:46:04.183Z",
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "2024-09-17T11:46:04.183Z",
        createdDate: "2024-09-17T11:46:04.183Z",
        updatedDate: "2024-09-17T11:46:04.183Z",
        timeZone: "string",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetContents(["contents"], {
        AccountId: "accountId",
        MainType: "Regular",
      })
    );

    expect(useQuery).toHaveBeenCalledWith(["contents"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() =>
      useGetContents(["contents"], {
        AccountId: "Acount-id",
        MainType: "Regular",
      })
    );
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutate,
      isLoading: false,
    });
  });

  it("should not call delete_route and return undefined when the operation fails", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useDeleteRoute());

    expect(result.current.data).toBeUndefined();
  });

  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call mutateAsync with the correct params", async () => {
    const mockResponse: AxiosResponse<number, AxiosError> = {
      data: 1,
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
    };

    mockMutateAsync.mockResolvedValue(mockResponse);

    const reportIssueData: ReportIssueType = {
      email: "test@example.com",
      categoryId: "0",
      description: "Detailed description of the issue",
      systemProduct: 1,
    };

    async function onSubmit(params: ReportIssueType) {
      await mockMutateAsync({ ...params });
    }

    await act(async () => {
      await onSubmit(reportIssueData);
    });

    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
    expect(mockMutateAsync).toHaveBeenCalledWith(reportIssueData);
  });

  it("should not call useDeleteCategory  and return undefined when the operation fails", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useDeleteCategory());

    expect(result.current.data).toBeUndefined();
  });

  it("should fetch all internal accounts", async () => {
    const mockData: GetAllInternalAccount[] = [
      {
        id: "84dbbb12-58f9-4f5c-5433-08dcd54b33be",
        credentialsId: "3fcfbad5-baa1-42f0-32b9-08dcd54b32d1",
        credentials: [
          {
            id: "3fcfbad5-baa1-42f0-32b9-08dcd54b32d1",
            username: "dev@simulator.com",
            password:
              "$2b$10$fq4BTzLZ9LtCMFB2sn/UUuVORQYSar6MpFgTmB9ZxlaG7Ku69Uh12",
          },
        ],
        tokenizeInformationId: "42d1acaa-84cd-46f2-a462-08dcd54b32cd",
        tokenizeInformation: [
          {
            id: "42d1acaa-84cd-46f2-a462-08dcd54b32cd",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "dev@simulator.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "b158414b-0333-404c-5f23-08dcd54b32d2",
        accessGroup: [
          {
            id: "b158414b-0333-404c-5f23-08dcd54b32d2",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-15T13:56:54.710952",
        updatedAt: "2024-09-15T13:56:54.7113082",
      },
      {
        id: "57202d49-e842-45d1-b02c-08dce066f54c",
        credentialsId: "dc5dc2a7-dedb-41f3-a6ce-08dce066f542",
        credentials: [
          {
            id: "dc5dc2a7-dedb-41f3-a6ce-08dce066f542",
            username: "test@gmail.com",
            password:
              "$2b$10$dxbNYQBm9RimlhrZjoYpVO3gllekYL4xkox9wwyQfpFT9F2T4dFt6",
          },
        ],
        tokenizeInformationId: "2fbd159e-ca2d-47d7-8956-08dce066f542",
        tokenizeInformation: [
          {
            id: "2fbd159e-ca2d-47d7-8956-08dce066f542",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "test@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "31f6fd75-5c75-421a-ba5c-08dce066f542",
        accessGroup: [
          {
            id: "31f6fd75-5c75-421a-ba5c-08dce066f542",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T09:13:18.6495998",
        updatedAt: "2024-09-29T09:13:18.6496124",
      },
      {
        id: "b4483d61-dd35-4210-b02d-08dce066f54c",
        credentialsId: "64fbd5d3-629f-44be-a6cf-08dce066f542",
        credentials: [
          {
            id: "64fbd5d3-629f-44be-a6cf-08dce066f542",
            username: "bj@gmail.com",
            password:
              "$2b$10$3xGQcaNrDcMGmAlnd1M.OuwsD1yVDHfbNqdJFV2BtaF7kGmO3Dy/O",
          },
        ],
        tokenizeInformationId: "fba00c0c-1d0a-4bf2-8957-08dce066f542",
        tokenizeInformation: [
          {
            id: "fba00c0c-1d0a-4bf2-8957-08dce066f542",
            firstname: "bj",
            middlename: "bj",
            lastname: "bj",
            email: "bj@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "ca52bfd2-8b31-4ba4-ba5d-08dce066f542",
        accessGroup: [
          {
            id: "ca52bfd2-8b31-4ba4-ba5d-08dce066f542",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T09:16:54.4833601",
        updatedAt: "2024-09-29T09:16:54.4833612",
      },
      {
        id: "b31060d5-b75c-457e-b02e-08dce066f54c",
        credentialsId: "a9557b96-8b29-49a4-a6d0-08dce066f542",
        credentials: [
          {
            id: "a9557b96-8b29-49a4-a6d0-08dce066f542",
            username: "admin@gmail.com",
            password:
              "$2b$10$e7W8V9lWWnwlwYhcBlnq/OAZprfa5Nj7JbnEqJ2sI8S5yW31Sdpa6",
          },
        ],
        tokenizeInformationId: "c56cf4ea-ee2e-46ad-8958-08dce066f542",
        tokenizeInformation: [
          {
            id: "c56cf4ea-ee2e-46ad-8958-08dce066f542",
            firstname: "admin",
            middlename: "admin",
            lastname: "admin",
            email: "admin@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "1ea74483-608c-44a9-ba5e-08dce066f542",
        accessGroup: [
          {
            id: "1ea74483-608c-44a9-ba5e-08dce066f542",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T09:21:17.7082452",
        updatedAt: "2024-09-29T09:21:17.7082462",
      },
      {
        id: "79a7a364-a095-43bd-b02f-08dce066f54c",
        credentialsId: "cbeac16e-02cd-4cc2-a6d1-08dce066f542",
        credentials: [
          {
            id: "cbeac16e-02cd-4cc2-a6d1-08dce066f542",
            username: "testdev@gmail.com",
            password:
              "$2b$10$Hxq8npxI7UQkKSStlinDoO8QsXaM3LrsnZ59kxuKHUZadKeqgRk22",
          },
        ],
        tokenizeInformationId: "c6219c49-e89c-412a-8959-08dce066f542",
        tokenizeInformation: [
          {
            id: "c6219c49-e89c-412a-8959-08dce066f542",
            firstname: "testdev",
            middlename: "testdev",
            lastname: "testdev",
            email: "testdev@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "e9ce63f3-1032-4cc2-ba5f-08dce066f542",
        accessGroup: [
          {
            id: "e9ce63f3-1032-4cc2-ba5f-08dce066f542",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T13:13:18.4183809",
        updatedAt: "2024-09-29T13:13:18.4183816",
      },
      {
        id: "f197fce6-47b0-47c8-3ef8-08dce09305d7",
        credentialsId: "dbcd1a70-5a8a-4ce5-9ffe-08dce09304db",
        credentials: [
          {
            id: "dbcd1a70-5a8a-4ce5-9ffe-08dce09304db",
            username: "admin2@nclex.com",
            password:
              "$2b$10$T3Ii0vLPvysjCkL8vwAOw.u74NsmdsS5T0tLDIc6lZPsQ3DSoX8m6",
          },
        ],
        tokenizeInformationId: "3007c483-4f12-4153-0d81-08dce09304d6",
        tokenizeInformation: [
          {
            id: "3007c483-4f12-4153-0d81-08dce09304d6",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "admin2@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "00b5514e-65d8-498c-344e-08dce09304dd",
        accessGroup: [
          {
            id: "00b5514e-65d8-498c-344e-08dce09304dd",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T22:28:44.2524773",
        updatedAt: "2024-09-29T22:28:44.2528383",
      },
      {
        id: "8e6d68cf-c552-4b3a-4c29-08dce10d03e6",
        credentialsId: "0e3b7c70-6179-46ae-4386-08dce10d03da",
        credentials: [
          {
            id: "0e3b7c70-6179-46ae-4386-08dce10d03da",
            username: "dev@nclex.com",
            password:
              "$2b$10$kbI7wGB.2QENYvbS6jQwceJx12DP3EKRJvmZjwhPnmxaVJ0zZCot.",
          },
        ],
        tokenizeInformationId: "59370827-2a51-4053-341e-08dce10d03da",
        tokenizeInformation: [
          {
            id: "59370827-2a51-4053-341e-08dce10d03da",
            firstname: "dev",
            middlename: "dev",
            lastname: "dev",
            email: "dev@nclex.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "cc21c5f8-b05d-4d8d-4e9a-08dce10d03da",
        accessGroup: [
          {
            id: "cc21c5f8-b05d-4d8d-4e9a-08dce10d03da",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-30T05:01:59.6014984",
        updatedAt: "2024-09-30T05:01:59.6015118",
      },
      {
        id: "38f40f59-cf7a-41b7-4c2a-08dce10d03e6",
        credentialsId: "2394c70c-fca5-4c4f-4387-08dce10d03da",
        credentials: [
          {
            id: "2394c70c-fca5-4c4f-4387-08dce10d03da",
            username: "devdev@gmail.com",
            password:
              "$2b$10$Idh8Ti5gO1qlrhFIvm8ju.Bq3o7KFVH62QVOwQfZZLbKuI7lPdK/S",
          },
        ],
        tokenizeInformationId: "8fba90a1-0585-4f0a-341f-08dce10d03da",
        tokenizeInformation: [
          {
            id: "8fba90a1-0585-4f0a-341f-08dce10d03da",
            firstname: "devdev",
            middlename: "devdev",
            lastname: "devdev",
            email: "devdev@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "22a95e30-5128-460e-4e9b-08dce10d03da",
        accessGroup: [
          {
            id: "22a95e30-5128-460e-4e9b-08dce10d03da",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-30T05:03:37.8272637",
        updatedAt: "2024-09-30T05:03:37.8272648",
      },
      {
        id: "d0d0a0db-7f4a-4333-4c2b-08dce10d03e6",
        credentialsId: "5f9beaed-2185-42b0-4388-08dce10d03da",
        credentials: [
          {
            id: "5f9beaed-2185-42b0-4388-08dce10d03da",
            username: "accessdev@gmail.com",
            password:
              "$2b$10$UpVwQ1a.RtKxIThMscfK4.5lf.jCSXAF6vRRpaRDQtV.o79fVzFdy",
          },
        ],
        tokenizeInformationId: "2cabb1b8-3c0c-4743-3420-08dce10d03da",
        tokenizeInformation: [
          {
            id: "2cabb1b8-3c0c-4743-3420-08dce10d03da",
            firstname: "all",
            middlename: "all",
            lastname: "all",
            email: "accessdev@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "e539d927-c9c9-4f71-4e9c-08dce10d03da",
        accessGroup: [
          {
            id: "e539d927-c9c9-4f71-4e9c-08dce10d03da",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-30T05:08:31.7625208",
        updatedAt: "2024-09-30T05:08:31.7625213",
      },
      {
        id: "12aca232-84b9-45eb-4d2e-08dce9e9507d",
        credentialsId: "053298bc-52dd-4271-0ff6-08dce9e94f60",
        credentials: [
          {
            id: "053298bc-52dd-4271-0ff6-08dce9e94f60",
            username: "stable-admin@nclex.com",
            password:
              "$2b$10$zw6rPdu.z9/hZrIq1mIlTOqT4QllQAN8GJMc79fLxzi4HJit0omUa",
          },
        ],
        tokenizeInformationId: "94825d9f-5edc-41f9-f523-08dce9e94f54",
        tokenizeInformation: [
          {
            id: "94825d9f-5edc-41f9-f523-08dce9e94f54",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "stable-admin@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "bda20b98-fb22-4714-68d6-08dce9e94f62",
        accessGroup: [
          {
            id: "bda20b98-fb22-4714-68d6-08dce9e94f62",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-10-11T19:39:06.6721335",
        updatedAt: "2024-10-11T19:39:06.6728368",
      },
      {
        id: "b6b5c774-6ce1-4e2e-7c1c-08dcf010c3ba",
        credentialsId: "a1b25b74-5f58-42be-f8b5-08dcf010c3b3",
        credentials: [
          {
            id: "a1b25b74-5f58-42be-f8b5-08dcf010c3b3",
            username: "stable-dev@nclex.com",
            password:
              "$2b$10$oH9yNUknBHIikbXco7MYzOVwW60gTL/94MhFn0Zn2.5EjWZ2F1RLq",
          },
        ],
        tokenizeInformationId: "eb06e7cb-9971-44da-dcbd-08dcf010c3b3",
        tokenizeInformation: [
          {
            id: "eb06e7cb-9971-44da-dcbd-08dcf010c3b3",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "stable-dev@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "6c6c9d63-1974-4b8c-09b1-08dcf010c3b4",
        accessGroup: [
          {
            id: "6c6c9d63-1974-4b8c-09b1-08dcf010c3b4",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-10-19T09:10:42.3751631",
        updatedAt: "2024-10-19T09:10:42.3751641",
      },
      {
        id: "33faf59c-657f-447f-7c1d-08dcf010c3ba",
        credentialsId: "a6b3fba5-99f7-408b-f8b6-08dcf010c3b3",
        credentials: [
          {
            id: "a6b3fba5-99f7-408b-f8b6-08dcf010c3b3",
            username: "stable-dev2@nclex.com",
            password:
              "$2b$10$OEc6RWnT/s9sS1C0b73jQ.4V4X9siZ.Ff.Ing.ssen38arC/pwteq",
          },
        ],
        tokenizeInformationId: "547ec602-6b5d-43f0-dcbe-08dcf010c3b3",
        tokenizeInformation: [
          {
            id: "547ec602-6b5d-43f0-dcbe-08dcf010c3b3",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "stable-dev2@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "3c60eb99-c0da-4e3a-09b2-08dcf010c3b4",
        accessGroup: [
          {
            id: "3c60eb99-c0da-4e3a-09b2-08dcf010c3b4",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-10-19T09:48:55.0573008",
        updatedAt: "2024-10-19T09:48:55.0573019",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetAllInternalAccounts(["getAllInternalAccount"])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getAllInternalAccount"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch client needs data for dropdown", async () => {
    const mockDataClientNeeds: GetCategoryType[] = [
      {
        id: "4a6f1f4c-99f6-4bc3-9007-08dcbac828b2",
        categoryName: "Client Needs Category",
        categoryDescription: "Client Needs Dropdown Category Description",
        categoryType: 2,
        createdAt: "2024-08-12T12:13:21.8774182",
        updatedAt: "2024-08-12T12:13:21.8774322",
      },
      {
        id: "1aa54e3b-fcec-4504-9008-08dcbac828b2",
        categoryName: "Client Needs 1",
        categoryDescription: "Client Needs 1 Description",
        categoryType: 2,
        createdAt: "2024-08-12T16:57:41.6011985",
        updatedAt: "2024-08-12T16:57:41.6011993",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockDataClientNeeds,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetRegularQuestionDDCategory(["getClientNeeds"], 2)
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getClientNeeds"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockDataClientNeeds);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch client needs data for dropdown", async () => {
    const mockDataClientNeeds: GetCategoryType[] = [
      {
        id: "4a6f1f4c-99f6-4bc3-9007-08dcbac828b2",
        categoryName: "Client Needs Category",
        categoryDescription: "Client Needs Dropdown Category Description",
        categoryType: 2,
        createdAt: "2024-08-12T12:13:21.8774182",
        updatedAt: "2024-08-12T12:13:21.8774322",
      },
      {
        id: "1aa54e3b-fcec-4504-9008-08dcbac828b2",
        categoryName: "Client Needs 1",
        categoryDescription: "Client Needs 1 Description",
        categoryType: 2,
        createdAt: "2024-08-12T16:57:41.6011985",
        updatedAt: "2024-08-12T16:57:41.6011993",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockDataClientNeeds,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetRegularQuestionDDCategory(["getClientNeeds"], 2)
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getClientNeeds"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockDataClientNeeds);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch get category by type", async () => {
    const mockDataReportCategories: GetCategoryType[] = [
      {
        id: "3a638144-3577-4ec0-fc1a-08dca6823764",
        categoryName: "Simulator Does Not Load",
        categoryDescription: "Simulator Does Not Load test",
        categoryType: 1,
        createdAt: "2024-07-17T17:02:18.4980667",
        updatedAt: "2024-07-17T17:02:18.4980833",
      },
      {
        id: "468a7caf-f9cc-433a-e3eb-08dcbc166982",
        categoryName: "Button Does Not Work",
        categoryDescription: "Button Does Not Work",
        categoryType: 1,
        createdAt: "2024-08-14T04:06:02.512754",
        updatedAt: "2024-08-14T04:06:02.5127682",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockDataReportCategories,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetCategoryByType(["CategoryList"], 1)
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["CategoryList"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockDataReportCategories);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch get all currencies", async () => {
    const mockDataCurrencies: CurrenciesResponse[] = [
      {
        id: "d4f90b79-3a39-4cdf-b882-07fbcfc0007d",
        symbol: "MDL",
        name: "Moldovan Leu",
        symbol_native: "MDL",
        decimal_digits: 2,
        rounding: 0,
        code: "MDL",
        name_plural: "Moldovan lei",
      },
      {
        id: "7bbdd3b9-3bfa-4341-9b99-08d10eb9c92c",
        symbol: "KHR",
        name: "Cambodian Riel",
        symbol_native: "៛",
        decimal_digits: 2,
        rounding: 0,
        code: "KHR",
        name_plural: "Cambodian riels",
      },
      {
        id: "b9badf38-3aef-441d-8061-1518b7511355",
        symbol: "SR",
        name: "Saudi Riyal",
        symbol_native: "ر.س.‏",
        decimal_digits: 2,
        rounding: 0,
        code: "SAR",
        name_plural: "Saudi riyals",
      },
      {
        id: "199c934e-85ac-4508-879d-17f807b2016e",
        symbol: "J$",
        name: "Jamaican Dollar",
        symbol_native: "$",
        decimal_digits: 2,
        rounding: 0,
        code: "JMD",
        name_plural: "Jamaican dollars",
      },
      {
        id: "9d277982-000f-4ec4-a11d-1896cf139bef",
        symbol: "$U",
        name: "Uruguayan Peso",
        symbol_native: "$",
        decimal_digits: 2,
        rounding: 0,
        code: "UYU",
        name_plural: "Uruguayan pesos",
      },
      {
        id: "5cfbc673-598d-41e8-8131-1978d79344a0",
        symbol: "MX$",
        name: "Mexican Peso",
        symbol_native: "$",
        decimal_digits: 2,
        rounding: 0,
        code: "MXN",
        name_plural: "Mexican pesos",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockDataCurrencies,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetAllCurrencies(["getAllCurrencies"])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getAllCurrencies"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockDataCurrencies);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch get all NCLEX product pricing", async () => {
    const mockDataPricing: PricingListResponse[] = [
      {
        id: "ec975d56-8ab7-4124-f99b-08dcc0533c5f",
        price: 123.0,
        currency: "USD",
        createdAt: "2024-08-19T21:31:30.7384496",
        updatedAt: "2024-08-19T21:31:30.7384842",
      },
      {
        id: "139aebca-0713-43cc-6c76-08dcc5cef65a",
        price: 145.0,
        currency: "USD",
        createdAt: "2024-08-26T12:59:46.6803994",
        updatedAt: "2024-08-26T12:59:46.6804197",
      },
      {
        id: "650c2434-e6d3-4e17-c263-08dcea8efa0d",
        price: 900.99,
        currency: "USD",
        createdAt: "2024-10-12T07:24:58.1209433",
        updatedAt: "2024-10-12T07:24:58.1209623",
      },
      {
        id: "0023e348-8bc3-47bd-032c-08dceebc0709",
        price: 230.0,
        currency: "USD",
        createdAt: "2024-10-17T14:57:31.9047683",
        updatedAt: "2024-10-17T14:57:31.9047809",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockDataPricing,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useGetAllPricing(["selectAllPricing"]));

    expect(useQuery).toHaveBeenCalledWith(
      ["selectAllPricing"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockDataPricing);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch get order number", async () => {
    const mockOrderNumber: string = "NLXPWR-194130714961";

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockOrderNumber,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useGetOrderNumber(["getOrderNumber"]));

    expect(useQuery).toHaveBeenCalledWith(
      ["getOrderNumber"],
      expect.any(Function),
      { enabled: false, staleTime: Infinity }
    );

    expect(useQuery).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockOrderNumber);
    expect(result.current.isLoading).toBe(false);
  });

  describe("useCreateSubsequent", () => {
    const mockExecute = jest.fn();
    const mockMutate = jest.fn();
    const mockData: AxiosResponse<SubsequentOptionType, AxiosError> = {
      data: {
        optionText: "some-text",
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
    };

    const mockSubsequentOption: SubsequentOptionType = {
      optionText: "some-text",
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (useApiCallback as jest.Mock).mockReturnValue({
        execute: mockExecute,
      });
      (useMutation as jest.Mock).mockReturnValue({
        mutateAsync: mockMutate,
        isLoading: false,
      });
    });
    it("should create a subsequent option successfully", async () => {
      const opt = { onSuccess: jest.fn() };
      mockExecute.mockResolvedValue({ data: mockData });
      const { result } = renderHook(() => useCreateSubsequentOptions(opt));

      await act(async () => {
        await result.current?.mutateAsync?.(mockSubsequentOption);
      });

      expect(mockMutate).toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useCreateReportIssue", () => {
    const mockExecute = jest.fn();
    const mockMutate = jest.fn();
    const mockData: AxiosResponse<ReportIssueType, AxiosError> = {
      data: {
        email: "some@gmail.com",
        categoryId: "some-text",
        description: "some-text",
        systemProduct: 0,
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
    };

    const mockReportIssue: ReportIssueType = {
      email: "some@gmail.com",
      categoryId: "some-text",
      description: "some-text",
      systemProduct: 0,
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (useApiCallback as jest.Mock).mockReturnValue({
        execute: mockExecute,
      });
      (useMutation as jest.Mock).mockReturnValue({
        mutateAsync: mockMutate,
        isLoading: false,
      });
    });
    it("should create a report issue successfully", async () => {
      const opt = { onSuccess: jest.fn() };
      mockExecute.mockResolvedValue({ data: mockData });
      const { result } = renderHook(() => useCreateReportIssue(opt));

      await act(async () => {
        await result.current?.mutateAsync?.(mockReportIssue);
      });

      expect(mockMutate).toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });
  });
});

describe("useGetAllInclusion", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return questions data", async () => {
    const mockData: GetAllInclusionResponse[] = [
      {
        id: "test-id",
        option: "test-inclusion",
      },
    ];
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetAllInclusion(["getInclusionApi"])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getInclusionApi"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useCreateInclusion", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<number, AxiosError> = {
    data: 200,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  const mockInclusionOption: CreateInclusionParams = {
    option: "test-inclusion",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutate,
      isLoading: false,
    });
  });

  it("should create a new inclusionSuccessFully", async () => {
    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useCreateInclusion(opt));

    await act(async () => {
      await result.current?.mutateAsync?.(mockInclusionOption);
    });

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { result } = renderHook(() => useCreateInclusion());

    await act(async () => {
      await result.current?.mutateAsync?.(mockInclusionOption);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useMutation as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useCreateInclusion());

    await act(async () => {
      await result.current?.mutateAsync?.(mockInclusionOption);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  it("should pass options to useMutation", () => {
    const mockOptions = {
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };

    renderHook(() => useCreateInclusion(mockOptions));

    expect(useMutation).toHaveBeenCalledWith(expect.any(Function), mockOptions);
  });
});

describe("useUpdateInclusion", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<number, AxiosError> = {
    data: 200,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  const mockInclusion: EditInclusionParams = {
    id: "test-id",
    option: "mock-option",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutate,
      isLoading: false,
    });
  });

  it("should update inclusion successfully", async () => {
    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useUpdateInclusion(opt));

    await act(async () => {
      await result.current?.mutateAsync?.(mockInclusion);
    });

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useGetSelectedApprovers", () => {
  const mockExecute = jest.fn();

  it("should return a list of account ID", async () => {
    const mockData: DefaultReviewerDto[] = [
      {
        accountId: "test-account-account",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetSelectedApprovers(["selectedApprovers"])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["selectedApprovers"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() =>
      useGetSelectedApprovers(["selectedApprovers"])
    );
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() =>
      useGetSelectedApprovers(["selectedApprovers"])
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
  describe("useGetAllInternalInclusions", () => {
    const mockExecute = jest.fn();

    it("should return a list of inclusion lists", async () => {
      const mockData: GetAllInclusionResponse[] = [
        {
          id: "test-id",
          option: "test-option",
        },
      ];

      (useQuery as jest.Mock).mockImplementation(() => {
        return {
          data: mockData,
          isLoading: false,
          error: null,
        };
      });

      const { result } = renderHook(() =>
        useGetAllInternalInclusions(["getAllInternalInclusions"])
      );

      expect(useQuery).toHaveBeenCalledWith(
        ["getAllInternalInclusions"],
        expect.any(Function),
        {
          staleTime: Infinity,
        }
      );

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle loading state", () => {
      (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
      const { result } = renderHook(() =>
        useGetAllInternalInclusions(["getAllInternalInclusions"])
      );
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle error state", async () => {
      const mockError = new Error("Failed to fetch data");
      mockExecute.mockRejectedValue(mockError);

      (useQuery as jest.Mock).mockImplementation(() => {
        return {
          data: undefined,
          isLoading: false,
          error: mockError,
        };
      });

      const { result } = renderHook(() =>
        useGetAllInternalInclusions(["getAllInternalInclusions"])
      );

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("useSelectAllCategories", () => {
    const mockExecute = jest.fn();

    it("should return a list of all categories", async () => {
      const mockData: CategoryListResponse[] = [
        {
          id: "test-id",
          categoryName: "test-category-name",
          categoryDescription: "test-category-description",
          categoryType: 0,
          createdAt: "test-created-at",
          updatedAt: "test-updated-at",
        },
      ];

      (useQuery as jest.Mock).mockImplementation(() => {
        return {
          data: mockData,
          isLoading: false,
          error: null,
        };
      });

      const { result } = renderHook(() =>
        useSelectAllCategories(["selectAllPricing"])
      );

      expect(useQuery).toHaveBeenCalledWith(
        ["selectAllPricing"],
        expect.any(Function),
        {
          staleTime: Infinity,
        }
      );

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle loading state", () => {
      (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
      const { result } = renderHook(() =>
        useSelectAllCategories(["selectAllPricing"])
      );
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle error state", async () => {
      const mockError = new Error("Failed to fetch data");
      mockExecute.mockRejectedValue(mockError);

      (useQuery as jest.Mock).mockImplementation(() => {
        return {
          data: undefined,
          isLoading: false,
          error: mockError,
        };
      });

      const { result } = renderHook(() =>
        useSelectAllCategories(["selectAllPricing"])
      );

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("useGetSubsequentLists", () => {
    const mockExecute = jest.fn();

    it("should return a list of subsequent lists", async () => {
      const mockData: GetSubsequentLists[] = [
        {
          id: "test-id",
          optionText: "test-option-text",
          optionKey: "test-key",
        },
      ];

      (useQuery as jest.Mock).mockImplementation(() => {
        return {
          data: mockData,
          isLoading: false,
          error: null,
        };
      });

      const { result } = renderHook(() =>
        useGetSubsequentList(["subsequentLists"])
      );

      expect(useQuery).toHaveBeenCalledWith(
        ["subsequentLists"],
        expect.any(Function),
        {
          staleTime: Infinity,
        }
      );

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle loading state", () => {
      (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
      const { result } = renderHook(() =>
        useGetSubsequentList(["subsequentLists"])
      );
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle error state", async () => {
      const mockError = new Error("Failed to fetch data");
      mockExecute.mockRejectedValue(mockError);

      (useQuery as jest.Mock).mockImplementation(() => {
        return {
          data: undefined,
          isLoading: false,
          error: mockError,
        };
      });

      const { result } = renderHook(() =>
        useGetSubsequentList(["subsequentLists"])
      );

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBeUndefined();
    });
  });
});

describe("useGetAllMenus", () => {
  const mockExecute = jest.fn();

  it("should return a list of all menus", async () => {
    const mockData: AuthorizedMenuResponse[] = [
      {
        accountLevel: 0,
        id: "test-id",
        menuEnvironments: 0,
        menuItems: [],
        systemMenus: 1,
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useGetAllMenus(["getAllMenus"]));

    expect(useQuery).toHaveBeenCalledWith(
      ["getAllMenus"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useUpdateMenuItem", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<number, AxiosError> = {
    data: 200,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  const mockMenuItem: UpdateMenuItemParams = {
    id: "test-id",
    children: [],
    icon: "test-icon",
    label: "test-label",
    menuId: "test-menu-id",
    parentId: "test-parent-id",
    path: "test-path",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutate,
      isLoading: false,
    });
  });

  it("should update menu successfully", async () => {
    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useUpdateMenuItem(opt));

    await act(async () => {
      await result.current?.mutateAsync?.(mockMenuItem);
    });

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useCreateContactUs", () => {
  const mockExecute = jest.fn();
  const mockApi = {
    web: {
      web_create_contact_us: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: async (data: any) => {
        let isLoading = true;
        await new Promise((resolve) => setTimeout(resolve, 100));
        const result = await mockExecute(data);
        isLoading = false;
        return result;
      },
      isLoading: false,
    });

    mockExecute.mockImplementation(async (args) => {
      return await mockApi.web.web_create_contact_us(args);
    });
  });

  it("should create a contact us request successfully", async () => {
    const mockData: ContactFormType = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "987-654-3210",
      categoryId: "test-id",
      countryCode: "+US",
      message: "This is another test message",
    };

    const mockResult = { data: 200 };
    mockApi.web.web_create_contact_us.mockResolvedValue(mockResult);

    const opt = { onSuccess: jest.fn() };
    const { result } = renderHook(() => useCreateContactUs(opt));

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      const response = await result.current.mutateAsync(mockData);
      expect(response).toEqual(mockResult);
    });

    expect(mockApi.web.web_create_contact_us).toHaveBeenCalledWith(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should indicate loading state correctly", async () => {
    const mockData: ContactFormType = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "987-654-3210",
      categoryId: "test-id",
      countryCode: "+US",
      message: "This is another test message",
    };

    const mockResult = { data: 200 };
    mockApi.web.web_create_contact_us.mockResolvedValue(mockResult);

    const opt = { onSuccess: jest.fn() };
    const { result } = renderHook(() => useCreateContactUs(opt));

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      const promise = result.current.mutateAsync(mockData);
      expect(result.current.isLoading).toBe(false);

      const response = await promise;
      expect(response).toEqual(mockResult);
    });

    expect(mockApi.web.web_create_contact_us).toHaveBeenCalledWith(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useCommenceEnvMaintenanceMode", () => {
  const mockExecute = jest.fn();
  const mockMutateAsync = jest.fn();
  const mockOnSuccess = jest.fn();

  const mockApi = {
    webbackoffice: {
      commenceEnvMaintenanceMode: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });

    (useAppMutation as jest.Mock).mockImplementation((mutationFn, options) => ({
      mutateAsync: mockMutateAsync,
      isLoading: false,
      ...options,
    }));

    mockExecute.mockImplementation(async (data: string[]) => {
      return await mockApi.webbackoffice.commenceEnvMaintenanceMode(data);
    });
  });

  it("handles mutation and success callback correctly", async () => {
    const mockData: string[] = ["dev"];
    const mockResult = { data: 200 };

    mockApi.webbackoffice.commenceEnvMaintenanceMode.mockResolvedValue(
      mockResult
    );
    mockMutateAsync.mockResolvedValue(mockResult);

    const { result } = renderHook(() =>
      useCommenceEnvMaintenanceMode({ onSuccess: mockOnSuccess })
    );

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      const response = await result.current.mutateAsync(mockData);

      expect(response).toEqual(mockResult);
    });

    expect(result.current.isLoading).toBe(false);
  });
});

describe("useGetAllCategories", () => {
  const mockExecute = jest.fn();

  it("should return a list of categories", async () => {
    const mockData: CategoryResponseType[] = [
      {
        id: "test-id",
        categoryTypeName: "test-name",
        categoryTypeValue: 0,
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetAllCategories(["getAllCategories"])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getAllCategories"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useGetSectionsByType", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return sections by type", async () => {
    const mockData: GetAllSectionsResponseType = {
      sectionId: "test-id",
      sectionType: "document",
      sectionTitle: "Document",
      sectionData: [
        {
          sectionDataId: "data-id",
          title: "Welcome to the Program",
        },
      ],
    };
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const sectionType: GetSectionParams = {
      sectionType: "document",
    };

    const { result } = renderHook(() =>
      useGetSectionsByType(["getSectionsByType"], sectionType)
    );

    expect(useQuery).toHaveBeenCalledWith(["getSectionsByType"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const sectionType: GetSectionParams = {
      sectionType: "document",
    };
    const { result } = renderHook(() =>
      useGetSectionsByType(["getSectionsByType"], sectionType)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const sectionType: GetSectionParams = {
      sectionType: "document",
    };

    const { result } = renderHook(() =>
      useGetSectionsByType(["getSectionsByType"], sectionType)
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetAllSections", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return all sections", async () => {
    const mockData: GetAllSectionsResponseType = {
      sectionId: "test-id",
      sectionType: "document",
      sectionTitle: "Document",
      sectionData: [
        {
          sectionDataId: "data-id",
          title: "Welcome to the Program",
        },
      ],
    };
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useGetAllSections(["getAllSections"]));

    expect(useQuery).toHaveBeenCalledWith(["getAllSections"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() => useGetAllSections(["getAllSections"]));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useGetAllSections(["getAllSections"]));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetAllPrograms", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return all programs", async () => {
    const mockData: StandardProgramListType = {
      id: "test-program-id",
      title: "test-program",
      programStatus: "available",
      programImage: {
        src: "test-src",
        height: 100,
        width: 100,
        blurDataURL: "test-blur-url",
      },
      sections: [
        {
          sectionId: "section-id",
          sectionType: "document",
          sectionTitle: "Document",
          sectionStatus: "available",
        },
      ],
    };
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useGetAllPrograms(["getAllPrograms"]));

    expect(useQuery).toHaveBeenCalledWith(["getAllPrograms"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() => useGetAllPrograms(["getAllPrograms"]));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useGetAllPrograms(["getAllPrograms"]));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});