import React from 'react';
import { cardGradientEffect } from "../../Utility/MouseUtility";
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionImageDisplay.css";
import SequentialRiseSpan from '../../Atoms/SequentialRiseSpan/SequentialRiseSpan';
import { PiMapPinLineThin } from "react-icons/pi";
import Image from "../../Image/Image";

interface IExperienceSectionImageDisplayProps {
    item: ExperienceSectionItem,
    index: number,
    alt?: string
}

const ExperienceSectionImageDisplay: React.FC<IExperienceSectionImageDisplayProps> = ({ item, index, alt }) => {
    const experienceSectionCardIndexIsEvenNumber = index % 2 === 0;
    const experienceSectionCardTextImageBody = (): React.ReactElement => (
        <div className="w-full flex flex-col items-center mt-5">
            <SequentialRiseSpan elementType="p" className="image-display__detailed-text" minNumberOfLettersPerLine={50} calculationAdjustment={1.1}>
                {item.cardDetailedText}
            </SequentialRiseSpan>
            <div className="experience-section-card__location flex items-center justify-center font-fira-code">
                {item.location && (<PiMapPinLineThin />)}
                <div>{item.location}</div>
            </div>
        </div>
    );

    const experienceSectionCardClassName = ["card experience-section-card no-boundary"];

    experienceSectionCardIndexIsEvenNumber ? experienceSectionCardClassName.push("above")
        : experienceSectionCardClassName.push("below");
    return (
        <div
            onMouseMove={cardGradientEffect}
            className={experienceSectionCardClassName.join(" ")}>
            <div className="connecting-line"></div>
            <div className="image-display__image__wrapper flex justify-center items-center box-shadow-large">
                <Image alt={alt} src={item.media.source.url} />
            </div>
            {experienceSectionCardTextImageBody()}
        </div>
    );
}

export default React.memo(ExperienceSectionImageDisplay);
