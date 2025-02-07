import { screen } from "../../common";
import { useApi, useApiCallback, useColumns } from "../../../hooks";
import { CaseNameManagementBlock } from "../../../system/app/internal/blocks";
import { render } from "@testing-library/react";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
  useExecuteToast: jest.fn,
}));

jest.mock("../../../hooks", () => ({
  useApi: jest.fn(() => ({
    loading: false,
    execute: jest.fn(),
  })),
  useApiCallback: jest.fn(() => ({
    loading: false,
    execute: jest.fn(),
  })),
  useColumns: jest.fn(() => ({
    columns: [],
  })),
  useCustomAction: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
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

describe("Casename Management Block", () => {
  it("Should render the case name management block", () => {
    render(<CaseNameManagementBlock />);

    expect(screen.getByTestId("casename-management-block")).toBeInTheDocument();
  });
});
