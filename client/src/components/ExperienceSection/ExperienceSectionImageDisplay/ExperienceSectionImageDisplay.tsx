import React from 'react';
import { cardGradientEffect } from "../../Utility/MouseUtility";
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionImageDisplay.css";
import { PiMapPinLineThin } from "react-icons/pi";

interface IExperienceSectionImageDisplayProps {
    item: ExperienceSectionItem,
    index: number,
    alt?: string
}

const ExperienceSectionImageDisplay: React.FC<IExperienceSectionImageDisplayProps> = ({ item, index, alt }) => {
    const experienceSectionCardIndexIsEvenNumber = index % 2 === 0;
    const experienceSectionCardTextImageBody = (): React.ReactElement => (
        <div className="w-full">
            <p className="image-display__detailed-text">{item.cardDetailedText}</p>
            <div className="experience-section-card__location flex items-center justify-center">
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
                <img alt={alt} src={item.media.source.url} />
            </div>
            {experienceSectionCardTextImageBody()}
        </div>
    );
}

export default ExperienceSectionImageDisplay;
