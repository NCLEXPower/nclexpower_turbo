import { DeviceInfo, useSessionStorage } from "../../hooks";
import { IntentValueType } from "../../types/global";
import { AliveCheck } from "./hooks/useAuthSessionIdleTimer";

export const useAccessToken = () =>
  useSessionStorage<string | undefined>("accessToken", undefined);

export const useRefreshToken = () =>
  useSessionStorage<string | undefined>("refreshToken", undefined);

export const useEncryptItem = () =>
  useSessionStorage<string | undefined>("SessionItem", undefined);

export const useCheckoutIntent = () =>
  useSessionStorage<IntentValueType>("CheckoutIntent", undefined);

export const useConfirmedIntent = () =>
  useSessionStorage<IntentValueType>("ConfirmedIntent", undefined);

export const useSecretClient = () =>
  useSessionStorage<string | undefined>("secretKey", undefined);

export const useOrderNumber = () =>
  useSessionStorage<string | undefined>("orderNumber", undefined);

export const usePaymentIntentId = () =>
  useSessionStorage<string | undefined>("pi", undefined);

export const useAccountId = () =>
  useSessionStorage<string | undefined>("uid", undefined);

export const useAccessLevel = () =>
  useSessionStorage<number | undefined>("al", undefined);

export const useSession = () =>
  useSessionStorage<string | undefined>("sessionId", undefined);

export const useAuthSession = () =>
  useSessionStorage<AliveCheck>("auth_session", undefined);

export const useDeviceSessionInfo = () =>
  useSessionStorage<DeviceInfo | null>("dinfo", null);

export const useDeviceNotRecognized = () =>
  useSessionStorage<boolean | undefined>("not_recognized", undefined);

export const useDeviceSession = () =>
  useSessionStorage<DeviceInfo | null>("dinfo", null);

export const useNewAccount = () =>
  useSessionStorage<boolean>("new_account", false);
