export interface BillingSummaryType {
    id: string;
    orderId: string;
    dateTime: string;
    payment: string;
    receiptNumber: string;
    purchase: string;
    amount: string;
    validity: string;
    promo: string;
}

export const billlingSummaryMockData: BillingSummaryType[] = [
    { id: "1", orderId: 'RN23-7854864', dateTime: '08-16-2024 09:04:31', payment: 'Credit/Debit (Stripe)', receiptNumber: '854578654821', purchase: '23-Days standard Program (RN)', amount: '$230.00 USD', validity: '180 days (6 months) usage', promo: 'n/a' },
    { id: "2", orderId: 'RN23-7854863', dateTime: '08-15-2024 09:04:32', payment: 'Debit (Stripe)', receiptNumber: '854578654822', purchase: '8-Days standard Program (RN)', amount: '$130.00 USD', validity: '90 days (3 months) usage', promo: 'n/a' },
    { id: "3", orderId: 'RN23-7854862', dateTime: '08-15-2024 09:04:33', payment: 'Credit', receiptNumber: '854578654823', purchase: '23-Days standard Program (PN)', amount: '$330.00 USD', validity: '180 days (6 months) usage', promo: 'n/a' },
    { id: "4", orderId: 'RN23-7854861', dateTime: '08-15-2024 09:04:34', payment: 'Debit', receiptNumber: '854578654824', purchase: '8-Days standard Program (PN)', amount: '$430.00 USD', validity: '90 days (3 months) usage', promo: 'n/a' },
  ];

export const billingSummaryColumns = [
  {
    field: "orderId",
    sortable: false,
    headerName: "Order ID",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "dateTime",
    sortable: false,
    headerName: "Date/Time",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "payment",
    sortable: false,
    headerName: "Payment",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "purchase",
    sortable: false,
    headerName: "Purchase",
    flex: 1,
    maxWidth: 450,
  },
];

export const orderDetailTitles = ["dateTime", "payment", "receiptNumber", "purchase", "amount", "validity", "promo"];

export const billingOwner = {
    name: "Albert Rivera",
    email: "arjon9397@gmail.com"
}