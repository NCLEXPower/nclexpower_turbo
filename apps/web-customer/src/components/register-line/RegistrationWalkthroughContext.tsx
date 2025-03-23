import { RegistrationFormType, registrationSchema } from "./steps/content";
import React, { createContext, useContext, useMemo } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDecryptOrder, useRouter } from "core-library";
import {
  useActiveSteps,
  useApi,
  useApiCallback,
  useBeforeUnload,
  useFormDirtyState,
  useRecaptcha,
} from "core-library/hooks";
import { SelectedProductType } from "core-library/types/global";
import { useExecuteToast } from "core-library/contexts";
import { useCustomerCreation } from "@/core/hooks/useCustomerCreation";
import { CreateCustomerParams } from "core-library/api/types";
import { useShowPassword } from "../blocks/ForgotPasswordBlock/ChangePasswordBlock/useShowPassword";
import { useResetOnRouteChange } from "core-library/core/hooks/useResetOnRouteChange";

export interface RegistrationFormContextValue {
  methods: UseFormReturn<RegistrationFormType>;
  isLoading: boolean;
  isDirty: boolean;
  setIsDirty: (values: boolean) => void;
  onSubmit: (values: RegistrationFormType, token: string) => void;
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
    isLoading: false,
    isDirty: false,
    setIsDirty: () => null,
    onSubmit: () => null,
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
  const router = useRouter();
  const { reset: resetActiveStep } = useActiveSteps(0);

  useBeforeUnload(true);

  useResetOnRouteChange({ resetStep: resetActiveStep });

  const orderNumberCb = useApi((api) => api.webbackoffice.getOrderNumber());
  const createOrderSummaryCb = useApiCallback(
    async (
      api,
      args: {
        orderNumber: string | undefined;
        productId: string;
        accountId: string | undefined;
        pricingId: string | undefined;
      }
    ) => await api.web.create_order_summary(args)
  );
  const orderDetail = useDecryptOrder() as SelectedProductType;
  const { reset, recaptchaRef, siteKey } = useRecaptcha();
  const verifyCb = useApiCallback(
    async (api, args: { token: string }) => await api.auth.verifyRecaptcha(args)
  );
  const toast = useExecuteToast();
  const { createCustomerAsync, isLoading } = useCustomerCreation();
  const {
    showPassword,
    showconfirmPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword,
  } = useShowPassword();

  async function onSubmit(values: RegistrationFormType, token: string | null) {
    const { productId, amount } = orderDetail;

    if (!productId || !amount || !token) return;

    const filteredValues: CreateCustomerParams = {
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      orderNumber: orderNumberCb.result?.data,
      productId,
      totalAmount: amount,
      privacyServicePolicy: values.termsofservice,
    };

    try {
      var result = await verifyCb.execute({ token: token });
      if (result.status === 200) {
        const _result = await createCustomerAsync(filteredValues);

        const orderSummary = {
          orderNumber: orderNumberCb.result?.data,
          productId,
          accountId: _result?.data.accountId,
          pricingId: orderDetail.pricingId,
        };

        await Promise.all([
          createOrderSummaryCb.execute({
            ...orderSummary,
          }),
          _result
        ])
        
        await router.push((route) => route.login);
        toast.showToast("Account created successfully. Login your account", "success");
        resetActiveStep(); 
      }
    } catch (error) {
      toast.showToast(
        `Something went wrong during submission ${error}`,
        "error"
      );
      return;
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
  const isPasswordMatching = newPassword === confirmPassword && newPassword !== "";
  
  const passwordLimitCriteria = [
    {
      isValid: isPasswordLongEnough,
      message: isPasswordLongEnough ? "" : "Password must be at least 8 characters",
    },
  ];
  
  const passwordCriteria = [
    {
      isValid: isPasswordMatching,
      message: isPasswordMatching ? "Passwords match" : "Passwords do not match",
    },
  ];

  const { isDirty, setIsDirty } = useFormDirtyState(methods.formState);

  return (
    <FormProvider {...methods}>
      <RegistrationWizardFormContext.Provider
        value={useMemo(
          () => ({
            methods,
            isLoading: isLoading || orderNumberCb.loading,
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
            isLoading,
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
