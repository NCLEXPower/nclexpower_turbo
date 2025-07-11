import { RegistrationFormType, registrationSchema } from "./steps/content";
import React, { createContext, useContext, useMemo } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useActiveSteps,
  useApi,
  useApiCallback,
  useBeforeUnload,
  useFormDirtyState,
  useRecaptcha,
} from "core-library/hooks";
import { CustomerOptions } from "core-library/types/global";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { useShowPassword } from "../blocks/ForgotPasswordBlock/ChangePasswordBlock/useShowPassword";
import { useResetOnRouteChange } from "core-library/core/hooks/useResetOnRouteChange";
import {
  useResolvedProductId,
  useTrial,
} from "core-library/contexts/auth/hooks";
import { LoginResponse } from "core-library/api/types";
import { AxiosResponse } from "axios";

export interface RegistrationFormContextValue {
  methods: UseFormReturn<RegistrationFormType>;
  loading: boolean;
  isDirty: boolean;
  setIsDirty: (values: boolean) => void;
  onSubmit(values: RegistrationFormType, token: string): Promise<boolean>;
  showPassword: boolean;
  showconfirmPassword: boolean;
  handleClickShowPassword: () => void;
  handleClickShowconfirmPassword: () => void;
  passwordCriteria: { isValid: boolean; message: string }[];
  passwordLimitCriteria: { isValid: boolean; message: string }[];
  recaptchaRef?: React.MutableRefObject<any>;
  siteKey: string;
}

const RegistrationWizardFormContext =
  createContext<RegistrationFormContextValue>({
    methods: {} as UseFormReturn<RegistrationFormType>,
    loading: false,
    isDirty: false,
    setIsDirty: () => null,
    onSubmit: async (values: RegistrationFormType, token: string) => {
      return false;
    },
    showPassword: false,
    showconfirmPassword: false,
    handleClickShowPassword: () => null,
    handleClickShowconfirmPassword: () => null,
    passwordCriteria: [],
    passwordLimitCriteria: [],
    recaptchaRef: undefined,
    siteKey: "",
  });

export const useRegistrationWalkthroughFormContext = () => {
  if (!RegistrationWizardFormContext) {
    throw new Error(
      "useRegistrationWalkthroughFormContext must be used within a RegistrationWalkthroughFormContext"
    );
  }
  return useContext(RegistrationWizardFormContext);
};

export const RegistrationWizardFormContextProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [isTrial, , clearTrial] = useTrial();
  const { reset: resetActiveStep } = useActiveSteps(0);
  const toast = useExecuteToast();
  const {
    register,
    loading: authLoading,
    setSecurityMeasures,
  } = useAuthContext();
  const [resolvedProductId] = useResolvedProductId();
  const { recaptchaRef, siteKey } = useRecaptcha();
  useBeforeUnload(true);
  useResetOnRouteChange({ resetStep: resetActiveStep });

  const orderNumberCb = useApi((api) => api.webbackoffice.getOrderNumber());

  const verifyCb = useApiCallback(
    async (api, args: { token: string }) => await api.auth.verifyRecaptcha(args)
  );

  const {
    showPassword,
    showconfirmPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword,
  } = useShowPassword();

  const loading = authLoading || orderNumberCb.loading || verifyCb.loading;

  async function onSubmit(
    values: RegistrationFormType,
    token: string | null
  ): Promise<boolean> {
    if (!token || !resolvedProductId) return false;

    const filteredValues: CustomerOptions = {
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      reference: resolvedProductId,
      email: values.email,
      password: values.password,
      orderNumber: orderNumberCb.result?.data,
      isAgreeWithPrivacyPolicy: values.termsofservice,
      isTrial: isTrial,
    };

    try {
      const result = await verifyCb.execute({ token: token });
      if (result.status === 200) {
        const response: AxiosResponse<LoginResponse> =
          await register(filteredValues);
        if (
          response.data.responseCode === 200 &&
          response.status === 200 &&
          !loading
        ) {
          // setSecurityMeasures(response.data, false);
          return response.data.responseCode === 200 && response.status === 200;
        }
      }
      return false;
    } catch (error) {
      clearTrial();
      toast.showToast(`Something went wrong during submission`, "error");
      return false;
    } finally {
      clearTrial();
    }
  }

  const methods = useForm<RegistrationFormType>({
    mode: "all",
    resolver: yupResolver(registrationSchema),
    criteriaMode: "all",
  });

  const { watch } = methods;

  const newPassword = watch("password", "");
  const confirmPassword = watch("confirmpassword", "");

  const isPasswordLongEnough = newPassword.length >= 8;
  const isPasswordMatching =
    newPassword === confirmPassword && newPassword !== "";

  const passwordLimitCriteria = [
    {
      isValid: isPasswordLongEnough,
      message: isPasswordLongEnough
        ? ""
        : "Password must be at least 8 characters",
    },
  ];

  const passwordCriteria = [
    {
      isValid: isPasswordMatching,
      message: isPasswordMatching
        ? "Passwords match"
        : "Passwords do not match",
    },
  ];

  const { isDirty, setIsDirty } = useFormDirtyState(methods.formState);

  return (
    <FormProvider {...methods}>
      <RegistrationWizardFormContext.Provider
        value={useMemo(
          () => ({
            methods,
            loading,
            isDirty,
            setIsDirty,
            onSubmit,
            confirmPassword,
            showPassword,
            showconfirmPassword,
            handleClickShowPassword,
            handleClickShowconfirmPassword,
            passwordCriteria,
            passwordLimitCriteria,
            recaptchaRef,
            siteKey,
          }),
          [
            methods,
            isDirty,
            setIsDirty,
            loading,
            onSubmit,
            showPassword,
            showconfirmPassword,
            handleClickShowPassword,
            handleClickShowconfirmPassword,
            passwordCriteria,
            passwordLimitCriteria,
            recaptchaRef,
            siteKey,
          ]
        )}
      >
        {children}
      </RegistrationWizardFormContext.Provider>
    </FormProvider>
  );
};
