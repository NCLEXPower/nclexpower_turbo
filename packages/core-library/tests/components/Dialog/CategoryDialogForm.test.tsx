import { render } from "@testing-library/react";
import { CategoryDialogFormBlock } from "../../../components";
import { useBusinessQueryContext, useDialogContext } from "../../../contexts";
import { CategoryResponseType } from "../../../core/hooks/types";
import { CategoryForm } from "../../../components/Dialog/DialogFormBlocks/category/CategoryDialogForm";

jest.mock("../../../config", () => ({
    getConfig: jest.fn().mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
    config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
    useDialogContext: jest.fn(),
    useExecuteToast: jest.fn(),
    useBusinessQueryContext: jest.fn(),
}));

jest.mock("jotai", () => {
    const actual = jest.requireActual("jotai");
    return {
        ...actual,
        useAtom: jest.fn(),
    };
});

jest.mock("../../../hooks/useApi", () => ({
    useApiCallback: jest.fn().mockReturnValue({
        loading: false,
        result: { data: {} },
        error: undefined,
    }),
    useApi: jest.fn().mockReturnValue({
        loading: false,
        result: { data: {} },
        error: undefined,
    }),
}));

describe("CategoryDialogForm", () => {
    const mockCloseDialog = jest.fn();
    const mockResponse: CategoryResponseType[] = [
        {
            categoryTypeName: "test-name",
            categoryTypeValue: 0,
            id: "test-id",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        (useDialogContext as jest.Mock).mockReturnValue({
            closeDialog: mockCloseDialog,
            openDialog: jest.fn(),
        });

        (useBusinessQueryContext as jest.Mock).mockReturnValue({
            businessQueryGetAllCategory: jest.fn(() => ({
                data: mockResponse,
            })),
        });
    });

    it("Should Render the Dialog Category Form", () => {
        const { getByTestId } = render(<CategoryForm onSubmit={jest.fn()} />);
        const container = getByTestId("category-dialog-form");

        expect(container).toBeInTheDocument();
    });
});
