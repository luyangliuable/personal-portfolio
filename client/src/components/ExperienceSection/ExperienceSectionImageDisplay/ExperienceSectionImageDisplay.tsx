import React from "react";
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
        <div className="experience-section-card__text-body" style={{ marginBottom: 0 }}>
            <div className="image_display__detailed-text">{item.cardDetailedText}</div>
            <div className="experience-section-card__location">
                {item.location && (<PiMapPinLineThin />)}
                <div>{item.location}</div>
            </div>
        </div>
    );

    const experienceSectionCardClassName = ["card experience-section-card no-boundary"];
    const imageWrapperClassName = [];

    experienceSectionCardIndexIsEvenNumber ? experienceSectionCardClassName.push("above")
        : experienceSectionCardClassName.push("below");
    return (
        <div
            style={{ transform: `scale(${item.importance ?? 1})` }}
            onMouseMove={cardGradientEffect}
            className={experienceSectionCardClassName.join(" ")}>
            <div className="image_display__wrapper flex">
                <img className="image_display__image box-shadow-large"
                    alt={alt}
                    style={{ maxHeight: "180px", objectFit: "cover", minWidth: "100%", marginBottom: "10px" }}
                    src={item.media.source.url} />
            </div>
            {experienceSectionCardTextImageBody()}
        </div>
    );
}

export default ExperienceSectionImageDisplay;
