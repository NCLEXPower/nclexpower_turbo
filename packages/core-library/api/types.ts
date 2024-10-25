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

export interface LoginParams {
  email: string;
  password: string;
  appName: string;
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
}

export interface ProductSetStatusParams {
  productId: string;
  productStatus: number;
}

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
  orderNumber: string;
  productId: string;
  totalAmount: number;
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

export type ResendCodeParams = {
  email: string;
};

export type ValidateTokenParams = {
  accessToken: string | undefined;
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
    type: string;
    mainType: string;
    mainContentCollectionsDtos: MainContentCollectionsDtos[];
  };
};
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

export type Approver = User;
export type Author = User;

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
