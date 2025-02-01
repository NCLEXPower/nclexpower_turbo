import { Box } from "@mui/material";
import { Button, TextField } from "core-library/components";
import {
  InformationRegistrationFormType,
  informationRegistrationSchema,
  RegistrationAtom,
  RegistrationFormType
} from "./validation";
import React from "react";
import { useAtom } from "jotai";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface Props {
  nextStep(values: Partial<RegistrationFormType>): void;
  next: () => void;
  values: Partial<RegistrationFormType>;
}

export const InformationRegistration: React.FC<Props> = ({
  nextStep,
  next
}) => {
  const [registrationDetails, setRegistrationDetails] = useAtom(RegistrationAtom);
  const methods = useForm<InformationRegistrationFormType>({
    resolver: yupResolver(informationRegistrationSchema),
    defaultValues: {
      firstname: registrationDetails.firstname || "",
      middlename: registrationDetails.middlename || "",
      lastname: registrationDetails.lastname || "",
    },
  });
  const { control, handleSubmit } = methods;

  async function handleNextStep(values: InformationRegistrationFormType) {
    const data = ({ ...values, ...registrationDetails });
    setRegistrationDetails(data);
    nextStep(data);
    next();
  }

  return (
    <Box className="flex flex-col w-full gap-2 p-4">
      <Box className="w-full">
        <TextField
          label="First Name"
          control={control}
          name="firstname"
          sx={{
            borderRadius: "0.625rem",
            width: "100%",
            backgroundColor: "rgba(15, 42, 113, 0.05);",
            border: "1px solid rgba(15, 42, 113, 0.05);"
          }}
          inputProps={{
            style: { padding: 15, borderRadius: "10px" },
          }}
        />
      </Box>
      <Box className="flex flex-col w-full">
        <TextField
          label="Middle Initial (optional)"
          control={control}
          name="middlename"
          sx={{
            borderRadius: "0.625rem",
            width: "100%",
            backgroundColor: "rgba(15, 42, 113, 0.05);",
            border: "1px solid rgba(15, 42, 113, 0.05);"
          }}
          inputProps={{
            style: { padding: 15, borderRadius: "10px" },
          }}
        />
      </Box>
      <Box className="w-full">
        <TextField
          label="Last Name"
          control={control}
          name="lastname"
          sx={{
            borderRadius: "0.625rem",
            width: "100%",
            backgroundColor: "rgba(15, 42, 113, 0.05);",
            border: "1px solid rgba(15, 42, 113, 0.05);"
          }}
          inputProps={{
            style: { padding: 15, borderRadius: "10px" },
          }}
        />
      </Box>
      <div className="flex justify-end gap-2 py-4">
        <Button
          sx={{
            py: 2,
            fontFamily: "PT Sans Narrow",
            fontWeight: "bold",
            backgroundColor: "#0f2a71",
            border: "1px solid #0f2a71",
            color: "#fff",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#0f2a7195",
              border: "1px solid #ced4da",
            },
          }}
          disabled={!methods.formState.isValid}
          onClick={handleSubmit(handleNextStep)}
        >
          Continue
        </Button>
      </div>
    </Box>
  );
};