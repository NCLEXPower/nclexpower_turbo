import { DndOptionsResponseType } from '../../../../api/types'
import { DNDOptionList } from '../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/components/DNDOptionList'
import { DNDQuestion } from '../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/DNDQuestion';
import { QuestionnaireItem } from '../../../../system/app/internal/types';
import { fireEvent, render, screen } from '../../../common'

jest.mock("../../../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
    useRouter: jest.fn(),
}));

describe("DNDQuestion", () => {
    const mockDndContent: QuestionnaireItem = {
        questionType: "DND",
        itemStem: "A sample DND Question [[item1]] and [[item2]]",
        answers: [],
        transitionHeader: "Transition Header for SATA Question",
        maxPoints: 0,
        seqNum: 0,
        itemNum: 0,
        dndAnswer: [],
        centerLabelName: undefined,
        rightLabelName: undefined,
        rightSection: undefined,
        centerSection: undefined,
        leftSection: undefined,
        hcpContent: undefined,
        maxAnswer: undefined,
        leftLabelName: undefined
    }

    it("Should render the render the DND Question Type", () => {
        render(<DNDQuestion questionData={mockDndContent} />)

        const dndBlock = screen.getByTestId('dnd-answer-block')
        expect(dndBlock).toBeInTheDocument()
    })
})