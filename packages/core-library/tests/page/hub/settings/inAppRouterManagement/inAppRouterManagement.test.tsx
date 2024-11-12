import { InAppRouterManagement } from '../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/InAppRouterManagement';
import { fireEvent, render, screen } from '../../../../common';



jest.mock("../../../../../config", () => ({
    getConfig: jest
        .fn()
        .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
    config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
    useRouter: jest.fn(),
}));


jest.mock("../../../../../hooks/useApi", () => ({
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


describe('inAppRouterManagement', () => {
    const nextStep = jest.fn()
    const previous = jest.fn()
    const previousStep = jest.fn()
    const reset = jest.fn()


    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render the inApp router management block', () => {
        render(<InAppRouterManagement nextStep={nextStep} previous={previous} previousStep={previousStep} reset={reset} values={{}} />)
        expect(screen.getByTestId("in-app-router")).toBeInTheDocument();
    })

    it('should render the router creation form on click of add new meu', () => {
        render(<InAppRouterManagement nextStep={nextStep} previous={previous} previousStep={previousStep} reset={reset} values={{}} />)
        const addNewMenu = screen.getByRole('button', { name: /Add New Menu/i })
        fireEvent.click(addNewMenu)
        expect(screen.getByTestId('router-creation-form')).toBeInTheDocument()
    })
})