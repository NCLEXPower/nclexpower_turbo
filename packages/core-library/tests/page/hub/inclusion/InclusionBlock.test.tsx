import { screen, render } from "../../../common";
import { InclusionBlock } from '../../../../system/app/internal/blocks';
import { useDialogContext } from '../../../../contexts/DialogContext';

jest.mock("../../../../config", () => ({
    getConfig: jest.fn().mockReturnValue({
        publicRuntimeConfig: { processEnv: {} },
    }),
    config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../../contexts/DialogContext", () => ({
    useDialogContext: jest.fn(),
}));

jest.mock("../../../../hooks/useApi", () => ({
    useApiCallback: jest.fn().mockReturnValue({
        loading: false,
        result: {
            data: {},
        },
        error: undefined,
    }),
    useApi: jest.fn().mockReturnValue({
        loading: false,
        result: {
            data: {},
        },
        error: undefined,
    }),
}));

jest.mock('@mui/x-data-grid', () => {
    const actualModule = jest.requireActual('@mui/x-data-grid');
    return {
        ...actualModule,
        DataGrid: (props: {
            rows: any[];
            columns: any[];
            isLoading: boolean;
            initPageSize: number;
            'data-testid'?: string;
        }) => {
            if (props.isLoading) {
                return <div role="progressbar">Loading...</div>;
            }
            return (
                <div
                    role="grid"
                    data-testid={props['data-testid'] || 'data-grid'}
                >
                    {props.rows.length === 0 ? (
                        <div>No data</div>
                    ) : (
                        props.rows.map(row => (
                            <div key={row.id}>{row.name}</div>
                        ))
                    )}
                </div>
            );
        },
    };
});

describe('InclusionBlock', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useDialogContext as jest.Mock).mockReturnValue({
            openDialog: jest.fn(),
        });
    });

    it("should render the page successfully with datagrid", async () => {
        const mockData = [{ id: 1, option: 'Option 1' }, { id: 2, option: 'Option 2' }];

        jest.mock('../../../../contexts', () => ({
            useBusinessQueryContext: () => ({
                businessQueryGetAllInclusion: () => ({
                    data: mockData,
                    isLoading: false,
                    refetch: jest.fn()
                }),
                businessQueryCreateInclusion: jest.fn(),
                businessQueryDeleteInclusion: jest.fn()
            }),
        }));

        render(<InclusionBlock />);

        const inclusionElement = await screen.findByTestId('inclusion-block', {}, { timeout: 3000 });
        const inclusionDatagrid = await screen.findByTestId('data-grid-inclusion');

        expect(inclusionElement).toBeInTheDocument();
        expect(inclusionDatagrid).toBeInTheDocument();
    });
});
