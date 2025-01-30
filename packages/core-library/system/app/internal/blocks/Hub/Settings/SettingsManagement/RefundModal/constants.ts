import { visaIcon } from "../../../../../../../../assets";
import {
  RefundCardData,
  RefundPaymentItem,
  RefundPaymentValues,
} from "../types";

export const policies: { value: string; hasTable?: boolean }[] = [
  {
    value:
      "There is no trial account nor trial access provided. Sample videos of the training program and review materials found inside the review system are shown in promotional videos in various social media accounts, to allow potential buyers to see how the system works even before purchasing.",
  },
  {
    value:
      "Although we are confident on the quality of our product, we will allow a client to request a refund, subject to the following provisions:",
    hasTable: true,
  },
  {
    value:
      "Clients are requested to reach out to Technical Support or use the Help Chat for any questions, comments and suggestions they may have, in an attempt to solve any issues before requesting for a refund.",
  },
  {
    value:
      "Breach of privacy policy and copyright terms and conditions shall automatically invalidate any claim to a refund.",
  },
];

export const policyConditions: string[] = [
  "Refund request subject to approval.",
  "Completion of refund will depend on processing times from Stripe, as timed from start of refund approval, which will be emailed to the client.",
];

export const gridData: { timePeriod: string; amount: string }[] = [
  {
    timePeriod: "48h - 72h",
    amount: "100%",
  },
  {
    timePeriod: "72h - 1 week",
    amount: "50%",
  },
  {
    timePeriod: "More than a week",
    amount: "No refund",
  },
];

export const refundPaymentData: RefundPaymentValues = {
  refundDuration: "5-7 Days",
  subtotal: 180,
  timePeriod: "12h",
  refundPercentage: 100,
};

export const refundPaymentItems: RefundPaymentItem[] = [
  {
    label: "Estimated Refund Duration",
    value: "",
  },
  {
    label: "Subtotal",
    value: "",
  },
  {
    label: "Time Period",
    value: "",
  },
  {
    label: "Refund Percentage",
    value: "",
  },
  {
    label: "Total Refundable",
    value: "",
  },
];

export const refundCardData: RefundCardData = {
  icon: visaIcon,
  name: "Visa",
  endingDigits: 3532,
  expiryMonth: 12,
  expiryYear: 25,
};
