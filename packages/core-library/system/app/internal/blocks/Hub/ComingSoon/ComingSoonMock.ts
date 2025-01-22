import { SelectOption } from "../../../../../../components";

export const CountryMockData: SelectOption[] = [
  { label: "USA", value: "USA" },
  { label: "Canada", value: "Canada" },
  { label: "Australia", value: "Australia" },
];

export const TimezoneMockData: SelectOption[] = [
  { label: "GMT+8 Asia/Singapore", value: "Etc/GMT-8" },
  { label: "GMT+9 Asia/Tokyo", value: "Etc/GMT-9" },
  { label: "GMT+4 Asia/Dubai", value: "Etc/GMT-4" },
  { label: "GMT Europe/London", value: "Etc/GMT" },
  { label: "GMT-5 America/New_York", value: "Etc/GMT+5" },
];

export const environment: SelectOption[] = [
  { label: "Pre-Prod", value: "Pre-Prod" },
  { label: "Dev", value: "Dev" },
];


export interface TableColumns extends Record<string, unknown> {
  id: string;
  email: string;
  dateReceived: string;
  count: number;
  status: string;
}

export const emailMockData: TableColumns[] = [
  {
    id: "1",
    email: "user1@example.com",
    dateReceived: "February 21, 2025",
    count: 5,
    status: "sent",
  },
  {
    id: "2",
    email: "user2@example.com",
    dateReceived: "February 22, 2025",
    count: 3,
    status: "Pending",
  },
  {
    id: "3",
    email: "user3@example.com",
    dateReceived: "February 23, 2025",
    count: 7,
    status: "sent",
  },
];
