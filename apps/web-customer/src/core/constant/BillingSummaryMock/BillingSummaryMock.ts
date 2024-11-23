interface BillingSummaryType {
    id: string;
    title: string;
    description: string;
}

export const BillingSummaryMock: BillingSummaryType[] = [
    {
        id: "1",
        title: "Date/Time",
        description: "08-15-2024 09:04:30"
    },
    {
        id: "2",
        title: "Payment",
        description: "Credit/Debit (Stripe)"
    },
    {
        id: "3",
        title: "Receipt Number",
        description: "854578654828"
    },
    {
        id: "4",
        title: "Purchase",
        description: "23-Days standard Program (RN)"
    },
    {
        id: "5",
        title: "Amount",
        description: "$230.00 USD"
    },
    {
        id: "6",
        title: "Validity",
        description: "180 days (6 months) usage"
    },
    {
        id: "7",
        title: "Promo",
        description: "n/a"
    },
]