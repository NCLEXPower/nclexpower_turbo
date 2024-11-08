/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { ContactForm } from "./ContactForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ContactFormType, contactSchema } from "./validation";
import { useExecuteToast } from "core-library/contexts";

export function ContactFormBlock() {
  const toast = useExecuteToast();

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(contactSchema),
    defaultValues: contactSchema.getDefault(),
  });

  const { handleSubmit, control, reset, setValue , watch } = form;

  const onSubmit = (values: ContactFormType) => {
    console.log(values);
    toast.executeToast(
      "Your message have been received. Thank you",
      "top-right",
      false
    );

    reset();
  };

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
