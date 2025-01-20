import { visaIcon } from "../../../../../../../../assets";
import {
  BillingHistoryItem,
  LatestPaymentItem,
  Payment,
  PlanType,
} from "../types";

export const billingHistoryItems: BillingHistoryItem[] = [
  {
    orderId: "RN23-7854865",
    date: "12-05-2024 09:04:30",
  },
  {
    orderId: "RN24-7854987",
    date: "08-15-2024 09:04:30",
  },
];

export const billingHistoryItemsHeader: string[] = [
  "Order ID",
  "Date",
  "Action",
];

export const latestPaymentItems: LatestPaymentItem[] = [
  {
    id: 1,
    label: "Payment Date",
  },
  {
    id: 2,
    label: "Type of Plan",
  },
  {
    id: 3,
    label: "Card Used to Pay",
    icon: visaIcon,
  },
  {
    id: 4,
    label: "Total Payment",
  },
];

export const latestPayment: Payment = {
  paymentDate: "December 05, 2024",
  planType: "Practical Nurse - 8 days(Fast Track)",
  cardUsed: "Visa ****3532",
  totalPayment: 180,
};

export const plans: PlanType[] = [
  {
    abbr: "PN",
    planName: "Practical Nurse",
    planType: "Fast Track",
    duration: 8,
    price: 180,
    currency: "$",
    registered: true,
  },
  {
    abbr: "PN",
    planName: "Practical Nurse",
    planType: "Standard",
    duration: 23,
    price: 230,
    currency: "$",
    registered: false,
  },
];
