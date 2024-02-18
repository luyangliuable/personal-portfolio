import { cardGradientEffect } from "../../Utility/MouseUtility";
import React, { RefObject, useRef, useEffect } from 'react';
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionEvent.css";
import Image from "../../Image/Image";

interface ExperienceSectionEventProps {
    timeLineRef: RefObject<HTMLDivElement>,
    item: ExperienceSectionItem,
    index: number,
    alt?: string
}

const ExperienceSectionEvent: React.FC<ExperienceSectionEventProps> = ({ item, index, alt, timeLineRef }) => {
    const defaultDisplay = item.display === "NORMAL" || !item.display;
    const connectingLineRef = useRef<HTMLDivElement>();
    const experienceSectionCardIndexIsEvenNumber = index % 2 === 0;
    const experienceSectionCardClassName = ["card experience-section-card no-boundary flex flex-row justify-between items-center"];

    experienceSectionCardIndexIsEvenNumber ? experienceSectionCardClassName.push("above")
        : experienceSectionCardClassName.push("below");

    const imageWrapperClassName = ["experience-section-card__image-wrapper"];
    const imageClassName = ["experience-section-card__image object-cover"];

    imageWrapperClassName.push("experience-section-card__image-wrapper")

    const experienceSectionCardTextExperienceBody = (): React.ReactElement => (
        <div className="w-70">
            <h2>{item.cardTitle}</h2>
            <div className="experience-section-card__text-body">
                <div className="experience-section-card__date">{item.dateTime}</div>
                <div className="experience-section-card__job-title">{item.cardSubtitle}</div>
            </div>
        </div>
    )

    return (
        <div onMouseMove={cardGradientEffect}
            className={experienceSectionCardClassName.join(" ")}>
            {defaultDisplay && experienceSectionCardTextExperienceBody()}
            <div className="connecting-line" ref={connectingLineRef}></div>
            <div className={imageWrapperClassName.join(" ")}>
                <img className={imageClassName.join(" ")}
                    alt={alt}
                    src={item.media.source.url} />
            </div>
        </div>
    );
}

export default ExperienceSectionEvent;
