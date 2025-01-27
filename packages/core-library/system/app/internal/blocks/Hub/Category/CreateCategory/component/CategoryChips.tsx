import React from 'react'
import Chip from '../../../../../../../../components/Chip/Chip'

type Props = {
    categoryIndex: number
}

export const CategoryChips: React.FC<Props> = ({ categoryIndex }) => {
    const categoryTypes = ["PRICING", "REPORT ISSUE", "CLIENT NEEDS", "CONTENT AREA", "COGNITIVE LEVEL", "CONTACT CONCERN"]

    return (
        <Chip  data-testid="chip-test" variant="filled" size="small" label={categoryTypes[categoryIndex]} />
    )
}
