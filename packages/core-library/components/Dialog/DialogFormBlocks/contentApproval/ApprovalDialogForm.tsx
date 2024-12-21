/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import { Button, DateField } from "../../../../components";
import { contentDateSchema, ContentDateType } from "./validation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type props = {
  onSubmit: (values: ContentDateType) => void;
  values: ContentDateType;
};
export const ApprovalDialogForm: React.FC<props> = ({ onSubmit, values }) => {
  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
    defaultValues: values,
  });

  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (Array.isArray(values?.approval)) {
      values.approval.forEach((item, index) => {
        setValue(`approval.${index}.contentId`, item.contentId);
        setValue(`approval.${index}.contentAuthorId`, item.contentAuthorId);
      });
    }
  }, [values, setValue]);

  return (
    <Box
      marginTop={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      gap="25px"
    >
      <Typography padding="10px" fontSize="20px">
        Select dates for content approvals in the simulator.
      </Typography>
      <Box marginTop="14px">
        <DateField
          name="implementationSchedule"
          control={control}
          label="Select Date"
          placeholder="DD - MM - YYYY"
        />
      </Box>
      <Box marginTop="14px">
        <Button data-testid="submit-button" onClick={handleSubmit(onSubmit)}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};
