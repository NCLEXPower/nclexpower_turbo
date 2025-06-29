import {
  AccountReferenceInformation,
  useAccountReferenceContext,
} from "../../contexts/AccountReferenceContext";
import { isCustomer } from "../../core";

export const useCustomerInfo = (): AccountReferenceInformation | null => {
  const { customerInfo } = useAccountReferenceContext();
  return customerInfo;
};

export const useInternalInfo = (): AccountReferenceInformation | null => {
  const { internalInfo } = useAccountReferenceContext();
  return internalInfo;
};

export const useAccountEmail = (): string | null => {
  const { customerInfo, internalInfo } = useAccountReferenceContext();
  return isCustomer && customerInfo
    ? customerInfo.email
    : internalInfo && internalInfo.email;
};

export const useAccountName = (): string | null => {
  const { customerInfo, internalInfo } = useAccountReferenceContext();
  return isCustomer && customerInfo
    ? `${customerInfo.firstname} ${customerInfo.lastname}`
    : internalInfo && `${internalInfo.firstname} ${internalInfo.lastname}`;
};

export const useGetUserId = (): string | null => {
  const { customerInfo, internalInfo } = useAccountReferenceContext();
  return isCustomer && customerInfo
    ? customerInfo.id
    : internalInfo && internalInfo.id;
};
