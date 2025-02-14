import { Box, Chip, Typography } from "@mui/material";
import { contentApprovers } from "./ContentReviewerData";
import {
  Button,
  Card,
  TextField,
} from "../../../../../../../../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { approverSchema, approverType } from "./validation";
import { FormProvider, useForm } from "react-hook-form";
import { CustomPopover } from "../../../../../../../../../../components/Popover/Popover";
import ReplyIcon from "@mui/icons-material/Reply";

type Props = {};

export default function ContentApproverForm({}: Props) {
  const form = useForm<approverType>({
    mode: "all",
    resolver: yupResolver(approverSchema),
    defaultValues: approverSchema.getDefault(),
  });

  const { control, reset, handleSubmit, clearErrors } = form;

  const onSubmit = (values: approverType) => {
    console.log("Reply: ", values);
    reset();
  };

  return (
    <FormProvider {...form}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold", color: "#0c215c" }}
        >
          Approver Details:
        </Typography>
        <CustomPopover
          icon={<ReplyIcon />}
          label="Reply"
          open={true}
          sx={{
            marginTop: 4,
            px: 4,
            py: 2,
            backgroundColor: "#343a40",
            borderRadius: "10px",
            color: "#F3F3F3",
            "&:hover": {
              backgroundColor: "#212529",
            },
          }}
        >
          <Card
            sx={{
              width: "100%",
              padding: 6,
              border: "1px solid #80ed99",
              height: "auto",
            }}
          >
            <TextField
              control={control}
              name="reply"
              placeholder="Leave a comment..."
              sx={{ width: 500, mb: 4 }}
              onBlur={() => clearErrors()}
            />
            <Button
              sx={{
                py: 1.5,
                width: "100%",
                backgroundColor: "#80ed99",
                borderRadius: "10px",
                color: "#030303",
                "&:hover": {
                  backgroundColor: "#386641",
                  color: "#F3F3F3",
                },
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Comment
            </Button>
          </Card>
        </CustomPopover>
      </Box>
      <Box>
        {contentApprovers.length > 0 &&
          contentApprovers.map((item, index) => (
            <div key={index}>
              <Chip
                sx={{
                  backgroundColor: "#0c215c",
                  color: "#F3F3F3",
                  marginBottom: 4,
                }}
                label={item.content}
              />
              <Typography sx={{ fontSize: "1rem", color: "#0c215c" }}>
                Approver name: {item.approver}
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "#0c215c" }}>
                Comment: {item.comment}
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "#0c215c" }}>
                Created At: {item.createdAt}
              </Typography>
            </div>
          ))}
      </Box>
    </FormProvider>
  );
}
