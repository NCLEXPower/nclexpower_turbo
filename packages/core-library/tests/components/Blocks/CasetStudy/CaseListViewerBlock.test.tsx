import { CaseStudyListViewBlock } from "../../../../system/app/internal/blocks";
import { render, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@mui/x-data-grid", () => {
  const actualModule = jest.requireActual("@mui/x-data-grid");
  return {
    ...actualModule,
    DataGrid: (props: {
      rows: any[];
      columns: any[];
      isLoading: boolean;
      initPageSize: number;
      "data-testid"?: string;
    }) => {
      if (props.isLoading) {
        return <div role="progressbar">Loading...</div>;
      }
      return (
        <div role="grid" data-testid={props["data-testid"] || "data-grid"}>
          {props.rows.length === 0 ? (
            <div>No data</div>
          ) : (
            props.rows.map((row) => <div key={row.id}>{row.name}</div>)
          )}
        </div>
      );
    },
  };
});

describe("CaseListViewBlock", () => {
  it("Should display the case list", () => {
    render(<CaseStudyListViewBlock />);
    const block = screen.getByTestId("case-list-block");
    expect(block).toBeInTheDocument();
  });
});
