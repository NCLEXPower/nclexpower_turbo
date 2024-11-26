/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import { FastTrackList, StandardList } from 'core-library/core/utils/contants/wc/HomePageData';
import { ProductCardType, SelectedProductType } from 'core-library/types/global'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react'

interface CardProps {
    cardData: ProductCardType
    handleSelectProduct: (values: SelectedProductType) => void;
}

const PricingCard: React.FC<CardProps> = ({ cardData, handleSelectProduct }) => {
    const ProgramTitle = cardData.programTitle
    const InclusionsList = cardData.inclusions?.features

    const handleProductDetails = () => {
        handleSelectProduct({
            amount: cardData.pricing.price,
            currency: cardData.pricing.currency,
            productName: cardData.productName,
            productDescription: cardData.productDescription,
            programTitle: cardData.programTitle,
            pricingId: cardData.pricingId,
            productId: cardData.id,
            programType: cardData.programType, // 0 = 23 Days : 1 = 8 Days
            inclusions: cardData.inclusions
        })
    }

    return (
        <div onClick={handleProductDetails} className=' transition-all duration-300 h-full border border-darkGray bg-white w-[350px] px-12 py-5 rounded-md shadow-md'>
            <div className='w-full flex h-fit py-2 items-center justify-center  rounded-md'>
                <p className="text-2xl">{cardData.programType == 0 ? '23 Days (Standard)' : '8 Days (Fast Track)'}</p>
            </div>
            <div className="w-full flex gap-5 pb-5 pt-3 justify-center items-center px-5 border-b">
                <div className="w-1/2 text-center">
                    <p className="text-4xl font-semibold">{cardData.pricing.price} <span className='text-sm'>{cardData.pricing.currency}</span></p>
                </div>
            </div>
            <div className="w-full flex  justify-start items-center py-5">
                <div className="text-xs flex flex-col ">{InclusionsList.length > 0 && InclusionsList.map((list, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <span><CheckCircleOutlineIcon sx={{ fontSize: 20 }} /></span>
                        <p className='m-2'>{list}</p>
                    </div>
                ))}</div>
            </div>
            <div className="w-full flex gap-5 py-5 justify-center items-center px-2 font-semibold">
                <button
                    className={`${ProgramTitle === 1 ? 'bg-[#08474b]' : 'bg-[#0c225c]'} text-white w-full py-2 rounded-lg`}>
                    Get Started
                </button>
            </div>
        </div>
    );
}
export default PricingCard