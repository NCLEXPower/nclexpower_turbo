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

describe('InclusionBlock', () => {
    beforeEach(() => {
        (useDialogContext as jest.Mock).mockReturnValue({
            openDialog: jest.fn(),
        });
    });

    it("should render the page successfully", async () => {
        render(<InclusionBlock />);

        const inclusionElement = await screen.findByTestId('inclusion-block', {}, { timeout: 3000 });

        expect(inclusionElement).toBeInTheDocument();
    });
});
