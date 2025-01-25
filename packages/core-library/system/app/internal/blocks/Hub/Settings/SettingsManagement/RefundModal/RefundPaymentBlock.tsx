import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { Button, EvaIcon, TextField } from "../../../../../../../../components";
import { textSx } from "../SettingsStyles";
import { btnSx, cardSx } from "./RefundModalStyles";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { refundReasonSchema, RefundReasonType } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RefundCardData,
  RefundPaymentItem,
  RefundPaymentValues,
} from "../types";
import {
  refundCardData,
  refundPaymentData,
  refundPaymentItems,
} from "./constants";
import { useState } from "react";
import { SubmitRefundRequestModal } from "./SubmitRefundRequestModal";

interface PaymentGridProps {
  paymentValues: RefundPaymentValues;
  refundCardData: RefundCardData;
}

const PaymentGrid: React.FC<PaymentGridProps> = ({
  paymentValues,
  refundCardData,
}) => {
  const form = useForm<RefundReasonType>({
    resolver: yupResolver(refundReasonSchema),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: refundReasonSchema.getDefault(),
  });

  const { refundDuration, subtotal, timePeriod, refundPercentage } =
    paymentValues;

  const { icon, name, endingDigits, expiryMonth, expiryYear } = refundCardData;

  const labelToValueMap: Record<RefundPaymentItem["label"], string> = {
    "Estimated Refund Duration": refundDuration,
    Subtotal: `$${subtotal.toFixed(2)}`,
    "Time Period": timePeriod,
    "Refund Percentage": `${refundPercentage.toFixed(2)}%`,
    "Total Refundable": `$${(subtotal * (refundPercentage / 100)).toFixed(2)}`,
  };

  const items = refundPaymentItems.map((item) => ({
    ...item,
    value: labelToValueMap[item.label] || "",
  }));

  return (
    <Grid container sx={{ width: "100%", marginBottom: "50px" }}>
      <Grid item xs={12} md={7} sx={{ padding: "10px" }}>
        <Box sx={{ ...cardSx }} className="space-y-8">
          <Typography sx={{ ...textSx, fontWeight: 700 }}>
            Payment Method:
          </Typography>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              gap: "20px",
              borderRadius: "15px",
              border: "2px solid #0F2A71",
              minHeight: "160px",
              paddingY: "20px",
              paddingLeft: {
                xs: 0,
                sm: "50px",
              },
              maxWidth: "600px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                width: "30px",
                height: "30px",
                borderRadius: "999px",
                bgcolor: "#0F2A71",
                display: "grid",
                placeItems: "center",
              }}
            >
              <EvaIcon name="checkmark" fill="#FFF" width={20} height={20} />
            </Box>
            <Image src={icon} alt="card icon" width={115} height={80} />

            <Box>
              <Typography
                sx={{ ...textSx, fontWeight: 700, marginBottom: "5px" }}
              >
                {name} ending in {endingDigits}
              </Typography>
              <Typography sx={{ ...textSx, color: "#33333380" }}>
                Expiry date: {expiryMonth}/{expiryYear}
              </Typography>
            </Box>
          </Box>
          <Box component="ul" className="space-y-5">
            {items &&
              !!items.length &&
              items.map((item, i) => (
                <Box
                  key={i}
                  component="li"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      ...textSx,
                      fontWeight: 700,
                      color: "#333333",
                      fontSize: "clamp(15px,4vw,20px)",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      ...textSx,
                      fontWeight: 700,
                      color: "#33333380",
                      fontSize: "clamp(15px,4vw,20px)",
                      textAlign: "right",
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "90px",
                borderTop: "2px solid #0F2A7133",
              }}
            >
              <Typography
                sx={{
                  ...textSx,
                  fontWeight: 700,
                  fontSize: "clamp(20px,4vw,32px)",
                }}
              >
                Refund Amount
              </Typography>
              <Typography
                sx={{
                  ...textSx,
                  fontWeight: 700,
                  fontSize: "clamp(20px,4vw,28px)",
                }}
              >
                {items.find((i) => i.label === "Total Refundable")?.value}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "20px",
        }}
      >
        <FormProvider {...form}>
          <Box sx={{ ...cardSx, flexGrow: 1, padding: "20px" }}>
            <Typography sx={{ ...textSx, fontWeight: 700, fontSize: "28px" }}>
              Refund Reason
            </Typography>
            <FormGroup
              sx={{
                padding: "10px",
              }}
              className="space-y-2"
            >
              <Controller
                name="reason1"
                control={form.control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Content Not as Advertised"
                  />
                )}
              />

              <Controller
                name="reason2"
                control={form.control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Better Alternative Found"
                  />
                )}
              />

              <Controller
                name="reason3"
                control={form.control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Difficulty Navigating Platform"
                  />
                )}
              />
            </FormGroup>

            <div className="flex gap-2 items-end px-3">
              <label htmlFor="otherReason">Others</label>
              <TextField
                control={form.control}
                name="otherReason"
                sx={{
                  height: "30px",
                  border: "none",
                  borderBottom: "1px solid black",
                  "& fieldset": {
                    border: "none",
                  },
                  "& input": {
                    padding: 0,
                  },
                }}
                inputProps={{
                  height: "30px",
                  border: "none",
                }}
              />
            </div>
          </Box>
          <Box sx={{ ...cardSx, flexGrow: 1 }}>
            <Typography sx={{ ...textSx, fontWeight: 700, fontSize: "28px" }}>
              Drop a Note
            </Typography>
            <TextField
              control={form.control}
              name="note"
              multiline
              rows={5}
              placeholder="Describe the reason for this refund"
              sx={{
                bgcolor: "#FFF",
              }}
            />
          </Box>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

interface RefundPaymentBlockProps {
  backPage: () => void;
}
export const RefundPaymentBlock: React.FC<RefundPaymentBlockProps> = ({
  backPage,
}) => {
  const [openSubmit, setOpenSubmit] = useState<boolean>(false);
  const toggleSubmitModal = () => setOpenSubmit((prev) => !prev);
  return (
    <Box>
      <SubmitRefundRequestModal open={openSubmit} onClose={toggleSubmitModal} />
      <Button
        variant="outlined"
        onClick={backPage}
        sx={{ ...btnSx, marginY: "40px", minWidth: "150px" }}
      >
        Back
      </Button>
      <Typography
        sx={{
          ...textSx,
          fontWeight: 700,
          fontSize: "38px",
          paddingLeft: "20px",
        }}
      >
        Refund Payment
      </Typography>

      <PaymentGrid
        paymentValues={refundPaymentData}
        refundCardData={refundCardData}
      />

      <Button
        sx={{
          ...btnSx,
          bgcolor: "#FF0000",
          border: "none",
          minWidth: "230px",
          marginLeft: "auto",
          marginRight: {
            xs: "auto",
            sm: "10px",
          },
        }}
        onClick={toggleSubmitModal}
      >
        Submit Request
      </Button>
    </Box>
  );
};
