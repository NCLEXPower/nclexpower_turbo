export interface TableColumns extends Record<string, unknown> {
  id: string;
  title: string;
  dateReceived: string;
  content: string;
  image?: string;
}

export const mockData: TableColumns[] = [
  {
    id: "1",
    title: "New Announcement",
    dateReceived: "2024-12-01T10:00:00.000Z",
    content: "This is a test announcement content.",
  },
  {
    id: "2",
    title: "System Maintenance",
    dateReceived: "2024-12-05T14:30:00.000Z",
    content: "Scheduled system maintenance will occur on Sunday.",
  },
  {
    id: "3",
    title: "Holiday Notice",
    dateReceived: "2024-12-15T08:15:00.000Z",
    content: "Office will be closed for the holidays from December 24th to 26th.",
  },
];