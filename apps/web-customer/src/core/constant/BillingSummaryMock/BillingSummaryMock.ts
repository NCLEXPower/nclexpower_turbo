export interface BillingSummaryType {
  id: string;
  billingId: string;
  billingEmail: string;
  billCreatedAt: string;
  billUpdatedAt: string;
  amount: number;
  currency: string;
  productDescription: string;
  productName: string;
}

export const billlingSummaryMockData: BillingSummaryType[] = [
    { id: "1", billingId: '8E3401FE-29E5-41CA-9232-2147F3837BA3', billingEmail: "nclexpower@gmail.com", billCreatedAt: '01-18-2025 09:04:31', billUpdatedAt: '01-20-2025 17:04:31', amount: 123.34, currency: 'usd',  productDescription: "Standard 23 Days Program", productName: "RN"},
    { id: "2", billingId: '9S3401FE-29E5-41CA-9232-2147F3837BA3', billingEmail: 'nclexpower1@gmail.com', billCreatedAt: '01-16-2025 09:04:31', billUpdatedAt: '01-16-2025 09:04:31', amount: 200.89, currency: 'aud', productDescription: "Fastrack 8 Days Program", productName: "PN"},
    { id: "3", billingId: '1B3401FE-29E5-41CA-9232-2147F3837BA3', billingEmail: 'nclexpower2@gmail.com', billCreatedAt: '01-14-2025 09:04:31', billUpdatedAt: '01-14-2025 09:04:31', amount: 140.23, currency: 'cad', productDescription: "Standard 23 Days Program", productName: "RN"},
    { id: "4", billingId: '7Q3401FE-29E5-41CA-9232-2147F3837BA3', billingEmail: 'nclexpower3@gmail.com', billCreatedAt: '01-12-2025 09:04:31', billUpdatedAt: '01-12-2025 09:04:31', amount: 123.67, currency: 'usd', productDescription: "Fastrack 8 Days Program", productName: "PN"},
  ];

export const billingSummaryColumns = [
  {
    field: "billingId",
    sortable: false,
    headerName: "Billing ID",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "billCreatedAt",
    sortable: false,
    headerName: "Bill Created Date",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "productDescription",
    sortable: false,
    headerName: "Product Description",
    flex: 1,
    maxWidth: 450,
  }
];

export const orderDetailTitles = ["billCreatedAt", "billUpdatedAt", "amount", "currency", "productName", "productDescription"];