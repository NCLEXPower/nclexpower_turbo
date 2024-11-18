import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { ContainedCaseStudyQuestionType } from '../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types';
import { render, screen } from '../../common';
import { AnswerCaseStudy } from '../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudyCreation/AnswerCaseStudy';

jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useFormContext: jest.fn(),
    useWatch: jest.fn(),
}));

describe('AnswerCaseStudy', () => {
    const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
        const form = useForm<ContainedCaseStudyQuestionType>()
        return (
            <FormProvider {...form}>{children}</FormProvider>
        )
    }
    const defaultIndex = 0;

    const mockFormValues = {
        getValues: jest.fn(),
        setValue: jest.fn(),
        resetField: jest.fn(),
        watch: jest.fn().mockImplementation((field: string) => {
            switch (field) {
                case `questionnaires.${defaultIndex}.questionType`:
                    return 'SATA';
                case `questionnaires.${defaultIndex}.seqNum`:
                    return 2;
                default:
                    return undefined;
            }
        }),
    };

    beforeEach(() => {
        (useFormContext as jest.Mock).mockReturnValue(mockFormValues);
        (useWatch as jest.Mock).mockReturnValue({
            questionnaires: [{ questionType: 'SATA', seqNum: 2, answers: [] }],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the AnswerCaseStudy component', () => {
        render(<Wrapper><AnswerCaseStudy index={defaultIndex} /> </Wrapper>);
        expect(screen.getByTestId('answer-case-study')).toBeInTheDocument();
    });
})