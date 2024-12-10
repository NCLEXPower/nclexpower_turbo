import { yupResolver } from "@hookform/resolvers/yup";
import React, { createContext, useContext, useMemo } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { settingsSelectionSchema } from "./validation";
import { SettingsSelectionType } from "./types";
import { useFormDirtyState } from "../../../../../../../hooks";

export interface UseSettingsWizardFormContextValue {
  form: UseFormReturn<SettingsSelectionType>;
  isDirty: boolean;
  setIsDirty: (values: boolean) => void;
}

const SettingsWizardFormContext =
  createContext<UseSettingsWizardFormContextValue>({
    form: {} as UseFormReturn<SettingsSelectionType>,
    isDirty: false,
    setIsDirty: () => null,
  });

export const useSettingsWizardFormContext = () =>
  useContext(SettingsWizardFormContext);

export const SettingsWizardFormContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const form = useForm<SettingsSelectionType>({
    resolver: yupResolver(settingsSelectionSchema),
    mode: "all",
    criteriaMode: "all",
    defaultValues:
      settingsSelectionSchema.getDefault() as SettingsSelectionType,
  });
  const { isDirty, setIsDirty } = useFormDirtyState(form.formState);

  return (
    <FormProvider {...form}>
      <SettingsWizardFormContext.Provider
        value={useMemo(
          () => ({
            form,
            isDirty,
            setIsDirty,
          }),
          [form, isDirty, form.watch("chosen"), form.watch("selection")]
        )}
      >
        {children}
      </SettingsWizardFormContext.Provider>
    </FormProvider>
  );
};
