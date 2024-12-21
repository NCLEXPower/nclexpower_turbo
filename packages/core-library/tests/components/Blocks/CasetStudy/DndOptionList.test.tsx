import { DndOptionsResponseType } from '../../../../api/types'
import { DNDOptionList } from '../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/components/DNDOptionList'
import { fireEvent, render, screen } from '../../../common'

jest.mock("../../../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
    useRouter: jest.fn(),
}));

const mockDeleteDndOption = jest.fn();

describe("DndOptionList", () => {
    const mockOptionList: DndOptionsResponseType[] =
        [
            {
                id: 'test-id',
                label: "test-label",
                value: "test-value"
            },
            {
                id: 'test-id-2',
                label: "test-label-2",
                value: "test-value-2"
            }
        ]

    it("should render the option list", () => {
        render(<DNDOptionList deleteDndOption={jest.fn} optionList={mockOptionList} />)
        mockOptionList.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
        expect(screen.getByTestId("dnd-option-list")).toBeInTheDocument()
    })

    it('should call deleteDndOption when delete button is clicked', () => {
        render(<DNDOptionList optionList={mockOptionList} deleteDndOption={mockDeleteDndOption} />);
        const deleteButton = screen.getAllByRole('button')[0];
        fireEvent.click(deleteButton);
        expect(mockDeleteDndOption).toHaveBeenCalledWith('test-id');
    });
})