/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { ContactForm } from "./ContactForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ContactFormType, contactSchema } from "./validation";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "core-library/contexts";
import { GetCategoryType } from "core-library/api/types";

export function ContactFormBlock() {
  const { showToast } = useExecuteToast();

  const { businessQueryGetReportCategories, businessQueryCreateContactUs } =
    useBusinessQueryContext();
  const { data } = businessQueryGetReportCategories(["concern-category"], 5);
  const { mutateAsync } = businessQueryCreateContactUs();

  const categories = data?.map((item: GetCategoryType) => ({
    label: item.categoryName,
    value: item.id,
  }));

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(contactSchema),
    defaultValues: contactSchema.getDefault(),
  });

  const { handleSubmit, control, reset, setValue, watch } = form;

  async function onSubmit(params: ContactFormType) {
    try {
      await mutateAsync({ ...params });
      showToast(
        "Your message has been sent. Please check your email for your reference number",
        "success"
      );
      reset();
    } catch (error) {
      showToast("Something went wrong. Please try again later.", "error");
    }
  }

  const handleSetCountryCode = (code: string) => {
    setValue("countryCode", code);
  };

  return (
    <ContactForm
      control={control}
      data={categories ?? []}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleSetCountryCode={handleSetCountryCode}
      countryCode={watch("countryCode")}
    />
  );
}
