/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { ContactForm } from "./ContactForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { ContactFormType, contactSchema } from "./validation";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "core-library/contexts";

export function ContactFormBlock() {
  const toast = useExecuteToast();

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(contactSchema),
    defaultValues: contactSchema.getDefault(),
  });

  const { businessQueryCreateContactUs } = useBusinessQueryContext();
  const { mutateAsync } = businessQueryCreateContactUs();

  const { handleSubmit, control, reset, setValue, watch } = form;

  async function onSubmit(params: ContactFormType) {
    try {
      await mutateAsync({ ...params });
      toast.executeToast(
        "Your message has been received. Thank you",
        "top-right",
        false,
        { type: "success" }
      );
      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.executeToast(
        `There was an error submitting your message: ${(error as Error).message}`,
        "top-right",
        true,
        { type: "error" }
      );
    }
  }

  const handleSetCountryCode = (code: string) => {
    setValue("countryCode", code);
  };

  return (
    <ContactForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleSetCountryCode={handleSetCountryCode}
      countryCode={watch("countryCode")}
    />
  );
}
