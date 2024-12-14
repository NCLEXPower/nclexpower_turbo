export interface DashboardCardType {
  id: number;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  title: string;
  cardValue: string;
}

export type ContactDataType = {
  id: string;
  name: string;
  categoryId: string;
  refNo: string;
  email: string;
  phone: string;
  message: string;
  isArchived: boolean;
  createdAt: string;
};
