import { ContainedCaseStudyQuestionType } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { CreateRegularAtom } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/useAtomic";
import { QuestionSelectionOptions } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/types";

export type AccessTokenResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiration: string;
};

export type AccessKeyType = {
  email: string;
  password: string;
  appName: string;
};

export interface Schedule {
  id: string;
  eventName: string;
  description: string;
  environment: number;
}
export interface ScheduleResponse {
  success: boolean;
  daysRemaining: number;
  schedule: Schedule;
  error: string;
}

export interface OpenPagesResponse {
  pageRoute: string;
  pageAuthorization: number;
}

export interface LoginParams {
  email: string;
  password: string;
  appName: string;
  deviceId: string;
}

export interface NotifyParams {
  goLiveId?: string | undefined;
  maintenanceId?: string | undefined;
  email: string;
}

export interface SsoLoginParams {
  email: string;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
  programTitle: number;
  productId: string;
  pricingId: string;
  accountId: string | undefined;
}
export interface UpdatePaymentIntentParams {
  paymentIntentId: string;
  email: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}
export interface LoginResponse {
  accessTokenResponse: AccessTokenResponse;
  responseCode: number | undefined;
  is2FaEnabled: boolean;
  twoFactorCodeExpiryTime: string;
  accountId: string;
  accessLevel: number;
  sessionId: string;
  fingerprint: string; //deprecated
  isPaid: string;
}

export interface RefreshTokenResponse {
  accessTokenResponse: AccessTokenResponse;
}

export interface LogoutParams {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshParams {
  accessToken: string;
  refreshToken: string;
  appName: string;
}

export type CategoryFormParams = {
  categoryName: string;
  categoryDescription: string | null;
  categoryType: number;
};

export type CurrenciesResponse = {
  id: string;
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export type PricingListResponse = {
  id: string;
  price: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export interface ProductListResponse {
  id: string;
  productName: string;
  pricingId: string;
  categoryId: string;
  productDescription: string | null;
  programType: number;
  programTitle: number;
}

export interface CreateSalesParams {
  customerAccountId: string | undefined;
  productId: string;
  currencyId: string | undefined;
  country?: string | undefined;
}

export interface ProductSetStatusParams {
  productId: string;
  productStatus: number;
}

export type AnalyticsParams = Partial<{
  accountId: string;
  firstname: string;
  middlename: string;
  lastname: string;
  status: string;
}>;
export interface IrtExamLogsResponse {
  id: string;
  eventLNum: string;
  lineNum: number;
  itemID: number;
  response: number;
  lineTheta: number;
  lineSEM: number;
  aDisc: number;
  bDiff: number;
  cnCateg: number;
}

export interface ThetaZeroCummResponse {
  id: string;
  seqNum: number;
  lastSumNum: number;
  lastSumDenom: number;
  lastCumulativeTheta: number;
  accountId: string;
}

export interface ThetaCalcScratchResponse {
  seqNum: number;
  qlNum: string;
  aDisc: number;
  bDiff: number;
  cGuess: number;
  response: number;
  inclusion: number;
  eventLNum: string;
}

export interface ConfirmPaymentParams {
  email: string;
  firstname: string;
  middlename?: string | undefined;
  lastname: string;
  orderNumber: string;
  productId: string;
  amount: number;
}

export interface ConfirmPaymentResponse {
  responseCode: number;
  returnUrl: string;
}

export interface CheckoutSessionParams {
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
}

export interface ReportedIssuesResponse {
  id: string;
  ticketNumber: string;
  email: string;
  categoryId: string;
  category: CategoryResponse;
  systemProduct: number;
  description: string;
  dateReported: string;
}

export interface CategoryResponse {
  id: string;
  categoryName: string;
  categoryDescription: string;
  categoryType: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerParams {
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  password: string;
  orderNumber: string | undefined;
  productId: string;
  totalAmount: number;
  privacyServicePolicy: boolean;
}

export interface CreateCustomerResponse {
  accountId: string;
}

export interface CreateCustomerDumpParams {
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  orderNumber: string;
  productId: string;
  totalAmount: number;
  paymentIntentId: string;
}

export type DiscrepanciesResponse = {
  discrepancies: DiscrepancyItem[];
};

export type DiscrepancyItem = {
  record: DiscrepancyRecordItem;
  missingIn: string;
};

export type DiscrepancyRecordItem = {
  qid: number;
  qLNum: number;
  question: string;
  choice_1: string;
  choice_2: string;
  choice_3: string;
  choice_4: string;
  choice_5: string;
  choice_6: string;
  correct: string;
  rationale: string;
  cogLNum: number;
  cnCateg: number;
  integPLNum: number;
  contentLNum: number;
};

export type FileUploadParams = {
  file: File;
};

export type SelectEmailResponse = {
  isExpired: boolean;
  proceed: boolean;
  accountIsFound: boolean;
  remainingDays: number;
  remainingMonths: number;
  validUntil: string;
};

export type VerificationResponse = {
  responseCode: number;
  waitTimeInMinutes: number;
};

export type VerifyCodeParams = {
  code: number;
  email: string;
};

export type OrderSummaryResponse = {
  orderId: string;
  orderNumber: string;
  productName: string;
  productDescription: string;
  currency: string;
  price: number;
  categoryName: string;
  categoryDescription: string;
  programTitle: number;
  programType: number;
  pricingId: string;
  productId: string;
  currencyId: string;
};

export type ResendCodeParams = {
  email: string;
};

export type ValidateTokenParams = {
  accessToken: string | undefined | null;
  appName: string;
};

export type ValidateTokenizeParams = {
  accessToken: string | undefined;
  appName: string;
  accountId: string;
};

export type RegularQuestionTypeParams = {
  questionType: string;
  description: string;
};

export type ValidateResetLinkTokenParams = {
  accountId: string;
  token: string;
};

export type ResetPasswordParams = {
  accountId: string;
  token: string;
  newPassword: string;
};

export type Verify2FAParams = {
  email: string;
  code: string;
  password: string;
  appName: string;
};

export type SsoVerify2FAParams = {
  email: string;
  code: string;
};

export type ReportIssueType = {
  email: string;
  categoryId: string;
  description: string;
  systemProduct: number;
};

export type GetCategoryType = {
  id: string;
  categoryName: string;
  categoryDescription: string;
  categoryType: number;
  createdAt: string;
  updatedAt: string;
};

export type MainContentAnswerCollectionDtos = {
  answer: string;
  answerKey: boolean;
};

export type MainContentCollectionsDtos = {
  cognitiveLevel: string;
  clientNeeds: string;
  contentArea: string;
  question: string;
  mainContentAnswerCollectionDtos: MainContentAnswerCollectionDtos[];
};

export type CreateRegularType = {
  email: string;
  contentDto: {
    type?: string;
    mainType: string;
    mainContentCollectionsDtos?: MainContentCollectionsDtos[];
    mainCaseStudyContentCollectionDtos?: CaseStudyContentCollectionDtos[];
  };
};

export type CaseStudyContentCollectionDtos = {
  caseName: string[];
  hxPhy: SequenceContentType[];
  labs: SequenceContentType[];
  nurseNotes: SequenceContentType[];
  orders: SequenceContentType[];
  questionnaires: QuestionnaireType[];
};

export interface CaseStudyContentCollection
  extends ContainedCaseStudyQuestionType {
  id: string;
}

export type SequenceContentType = {
  seqContent?: string;
  seqNum: number;
};

export type QuestionnaireType = {
  itemNum: number;
  itemStem?: string;
  maxPoints: number;
  questionType?: string;
  seqNum: number;
  transitionHeader: string;
  maxAnswer?: number;
  answers?: AnswerCaseStudy;
};

type Answer = {
  answer: string;
  answerKey: boolean;
};

type OptionWithAnswers = {
  options?: Answer[];
  optionName: string;
};

type AnswerCaseStudy = Answer[] | OptionWithAnswers[] | undefined;

export type credentialsType = {
  id: string;
  username: string;
  password: string;
};

export type tokenizeInformationType = {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  imgurl: string;
};

export type accessGroupType = {
  id: string;
  accessLevel: number;
};

export type GetAllInternalAccount = {
  id: string;
  credentialsId: string;
  credentials: credentialsType[];
  tokenizeInformationId: string;
  tokenizeInformation: tokenizeInformationType[];
  accessGroupId: string;
  accessGroup: accessGroupType[];
  accountStatusEnum: number;
  createdAt: string;
  updatedAt: string;
};

export interface SensitiveInformations {
  tokenizeInformation: TokenizeInformations;
  customerTokenizationInformation: CustomerTokenizeInformations;
}
export interface TokenizeInformations {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  imgurl: string;
}

export interface CustomerTokenizeInformations {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  imgUrl: string;
}
export type RevokeParams = {
  accessToken: string;
  refreshToken: string;
  appName: string;
  email: string;
};

export interface EnrolledDeviceUpdaterParams {
  deviceId: string;
  accountId: string;
  deviceType: string;
  inUse: boolean;
}

export type OTPPreparation = {
  email: string;
  password: string;
  appName: string;
  procedure?: string | undefined;
};

export type SsoExtraDetails = {
  email: string;
  procedure: string;
};

export type AuthorizedMenuParams = {
  accountLevel: number;
  menuEnvironments: number;
  systemMenus: number;
};

export type AuthorizedMenu = {
  id: string;
  systemMenus: number;
  accountLevel: number;
  menuEnvironments: number;
  menuItems: Array<MenuItems>;
}[];

export interface AuthorizedMenuResponse {
  id: string;
  systemMenus: number;
  accountLevel: number;
  menuEnvironments: number;
  menuItems: Array<MenuItems>;
}

export type GetMenuByIdParams = {
  menuId: string;
};

export type CreateAuthorizedMenusParams = {
  systemMenus: number;
  accountLevel: number;
  menuEnvironments: number;
  menuItems: Array<MenuItems>;
};

export type UpdateMenuItemParams = MenuItems;

export type MenuItems = MenuItemsChildren;

export type MenuItemsChildren = {
  id: string;
  label: string;
  path: string;
  icon: string;
  menuId: string;
  parentId: string;
  hide?: boolean;
  children: MenuItemsChildren[];
};

export type AuthorizedRoutes = {
  id: string;
  label: string;
  value: string;
};

export interface AuthorizedContentsResponseType {
  id: string;
  contentApprovers: ContentApprover[];
  contentAuthorId: string;
  author: Author;
  contentRevisionsId: string;
  revisions: Revisions;
  contentId: string;
  mainContent: MainContent;
  mainContentStatus: number;
  workflow: number;
  implementationSchedule: string;
  createdDate: string;
  updatedDate: string;
  timeZone: string;
  children?: AuthorizedContentsResponseType[] | undefined;
}

export interface ContentApprover {
  id: string;
  contentId: string;
  content: string;
  approverId: string;
  approver: Approver;
}

export interface Approver extends User {}

export interface Author extends User {}

export interface User {
  id: string;
  accountId: string;
  createdDate: string;
  updatedDate: string;
}

export interface Revisions {
  id: string;
  contentId: string;
  mainContent: MainContent;
  adminId: string;
  highlights: Highlight[];
  revisionStatus: number;
  createdDate: string;
}

export interface MainContent {
  id: string;
  type: string;
  mainType: string;
  mainContentCollections: MainContentCollection[];
  createdDate: string;
  updatedDate: string;
}

export interface MainContentCollection {
  id: string;
  cognitiveLevel: string;
  clientNeeds: string;
  contentArea: string;
  question: string;
  mainContentAnswerCollections: MainContentAnswerCollection[];
}

export interface MainContentAnswerCollection {
  id: string;
  answer: string;
  answerKey: boolean;
}

export interface Highlight {
  id: string;
  highlightedText: string;
  comment: string;
  startPosition: number;
  endPosition: number;
}

export type WebGetContentsParams = {
  MainType: QuestionSelectionOptions;
  AccountId: string;
};

export type GetDefaultReviewerResponse = {
  accountId: string;
  tokenizeInformation: GetDefaultReviewerDto;
};

export type GetDefaultReviewerDto = {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  imgurl: string;
};

export type DefaultReviewerParams = {
  defaultApproversDtos: DefaultReviewerDto[];
};

export type DefaultReviewerDto = {
  accountId: string;
};

export type GetAllInclusionResponse = {
  id: string;
  option: string;
};

export type CreateInclusionParams = {
  option: string;
};

export type EditInclusionParams = GetAllInclusionResponse;
export type SubsequentOptionType = {
  optionText: string;
};

export type GetSubsequentLists = {
  id: string;
  optionText: string;
  optionKey: string;
};

export type ContactFormType = {
  message: string;
  name: string;
  phone: string;
  countryCode: string;
  categoryId: string;
  email: string;
};

export type PriceButtonType = {
  acronym: "PN" | "RN";
  label: "Practical Nurse" | "Registered Nurse";
  value: 0 | 1;
};

export type CreateDndOptionsParams = {
  option: string;
  formId: string;
  accountId: string;
  itemNo: number;
};

export type DndOptionParams = {
  formId: string;
  accountId: string;
  itemNo: number;
};

export type DndOptionsResponseType = {
  id: string;
  label: string;
  value: string;
};

export type CaseNameParams = {
  caseName: string;
};

export type CaseNameResponseType = {
  id: string;
  caseName: string;
  dateCreated: string;
};

export type DeleteCaseNameParams = {
  id: string;
};

export type CreateGoliveSchedule = {
  eventName: string;
  endDate: string;
  targetEnvironment: string;
  timeZone: string;
  countries: string[];
  selectedCountriesTimezones: string[];
  description: string;
  isActive: boolean;
};

export type GetCountryTimezonesParams = {
  daysRemaining: any;
  country: any;
  countryKey: string;
  goLiveDate: string;
};

export type PolicyFileResponseType = {
  fileName: string;
  fileUrl: string;
};

export type GetCaseStudyListParams = {
  TokenizeInformationId: string;
};

export type CaseStudyListResponse = {
  caseNum: number;
  caseName: string;
  status: number;
  dateCreated: string;
};

export type UpdateStatusParams = {
  proof: File;
  notes: string;
  refNo: string;
  updateStatus: 0 | 1 | 2;
};
export type ContactResponseType = {
  id: string;
  name: string;
  categoryId: string;
  refNo: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};
