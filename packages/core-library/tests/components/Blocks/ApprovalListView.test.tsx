import { render, fireEvent, screen } from "../../common";
import {
  ApprovalBlockProps,
  ApprovalListView,
} from "../../../components/blocks/ContentApproval/ApprovalListView";
import { AuthorizedContentsResponseType } from "../../../api/types";
import { ColumnDef } from "@tanstack/react-table";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components", () => ({
  Alert: ({ title }: { title: string }) => <div>{title}</div>,
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CustomBadge: ({ badgeContent }: { badgeContent: number }) => (
    <div>{badgeContent}</div>
  ),
  EvaIcon: () => <div>Icon</div>,
  ReactTable: ({ data }: { data: AuthorizedContentsResponseType[] }) => (
    <div>{data.length} rows</div>
  ),
  CustomPopover: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("ApprovalListView", () => {
  const mockHandleMultipleSelection = jest.fn();
  const mockHandleSelection = jest.fn();
  const mockHandleSelectedRows = jest.fn();

  const columns: ColumnDef<AuthorizedContentsResponseType>[] = [
    { accessorKey: "id", header: "ID" },
  ];
  const data: AuthorizedContentsResponseType[] = [
    {
      id: "3fa12385f21364-5717-4562-b3fc-2c963f66afa16",
      contentApprovers: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
          contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          content: "Approval for educational article",
          approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
          approver: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
            accountId: "approver-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z",
          },
        },
      ],
      contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f166afa9",
      author: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
        accountId: "author-001",
        createdDate: "2024-09-21T18:40:52.515Z",
        updatedDate: "2024-09-21T18:40:52.515Z",
      },
      contentRevisionsId: "3fa85f64-5717-4562-b3fc-21c963f66afaa",
      revisions: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        mainContent: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afab",
          type: "Article",
          mainType: "Text",
          mainContentCollections: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afac",
              cognitiveLevel: "High",
              clientNeeds: "Educational Material",
              contentArea: "Science",
              question: "What is the scientific method?",
              mainContentAnswerCollections: [
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afad",
                  answer: "A systematic process for experimentation.",
                  answerKey: true,
                },
              ],
            },
          ],
          createdDate: "2024-09-21T18:40:52.515Z",
          updatedDate: "2024-09-21T18:40:52.515Z",
        },
        adminId: "3fa85f64-5717-4562-b3fc-2c963f66afae",
        highlights: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afaf",
            highlightedText: "scientific method",
            comment: "Important concept to clarify.",
            startPosition: 0,
            endPosition: 17,
          },
        ],
        revisionStatus: 1,
        createdDate: "2024-09-21T18:40:52.515Z",
      },
      contentId: "3fa85f64-5717-4562-b3fc-2c1963f66afag",
      mainContent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afah",
        type: "Article",
        mainType: "Text",
        mainContentCollections: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afai",
            cognitiveLevel: "Medium",
            clientNeeds: "Knowledge Acquisition",
            contentArea: "Mathematics",
            question: "How do you calculate the area of a circle?",
            mainContentAnswerCollections: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afaj",
                answer: "Use the formula πr².",
                answerKey: true,
              },
            ],
          },
        ],
        createdDate: "2024-09-21T18:40:52.515Z",
        updatedDate: "2024-09-21T18:40:52.515Z",
      },
      mainContentStatus: 0,
      workflow: 0,
      implementationSchedule: "",
      createdDate: "",
      updatedDate: "",
      timeZone: "",
    },
  ];

  const DEFAULTPROPS: ApprovalBlockProps = {
    columns,
    data,
    multiple: false,
    handleMultipleSelection: mockHandleMultipleSelection,
    selectedRows: 2,
    handleSelection: mockHandleSelection,
    handleSelectedRows: mockHandleSelectedRows,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component correctly", () => {
    render(<ApprovalListView {...DEFAULTPROPS} />);

    expect(screen.getByText("Manage Approvals")).toBeInTheDocument();
    expect(screen.getByText("Multiple Selection")).toBeInTheDocument();
  });

  it("calls handleMultipleSelection on Switch toggle", () => {
    render(<ApprovalListView {...DEFAULTPROPS} />);
    const switchInput = screen.getByRole("checkbox");

    fireEvent.click(switchInput);
    expect(mockHandleMultipleSelection).toHaveBeenCalled();
  });
});
