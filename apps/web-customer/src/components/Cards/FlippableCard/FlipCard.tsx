import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react'

interface FlipCardProps {
    frontImage: StaticImageData;
    backImage: StaticImageData;
}

export const FlipCard: React.FC<FlipCardProps> = ({ frontImage, backImage }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }
    return (
        <div
            className={`flip-card ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip} >
            <div className="flip-card-inner h-full">
                <div className="flip-card-front">
                    <Image src={frontImage} alt="FrontFaceCard" className="h-full min-w-full rounded-md" />
                </div>
                <div className="flip-card-back">
                    <Image src={backImage} alt="BackFaceCard" className="h-full min-w-full rounded-md" />
                </div>
            </div>
        </div>
    )
}