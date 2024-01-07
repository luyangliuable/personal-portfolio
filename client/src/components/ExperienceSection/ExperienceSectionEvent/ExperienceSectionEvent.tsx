import { cardGradientEffect } from "../../Utility/MouseUtility";
import React, { RefObject, useRef, useEffect } from 'react';
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionEvent.css";
import { PiMapPinLineThin } from "react-icons/pi";

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
    const experienceSectionCardClassName = ["card experience-section-card no-boundary flex flex-row justify-around items-center"];

    experienceSectionCardIndexIsEvenNumber ? experienceSectionCardClassName.push("above")
        : experienceSectionCardClassName.push("below");

    const imageWrapperClassName = ["experience-section-card__image-wrapper"];
    const imageClassName = ["experience-section-card__image"];

    imageWrapperClassName.push("experience-section-card__image-wrapper--experience")

    const experienceSectionCardTextExperienceBody = (): React.ReactElement => (
        <div className="experience-section-card__text-body">
            <h2>{item.cardTitle}</h2>
            <div className="experience-section-card__date">{item.dateTime}</div>
            <div className="experience-section-card__job-title">{item.cardSubtitle}</div>
        </div>
    )

    function updateConnectingLine() {
        const connectingLine = connectingLineRef.current;
        const timeline = timeLineRef.current;

        if (timeline && connectingLine) {
            const timelineRect = timeline.getBoundingClientRect();
            const connectingLineRect = connectingLine.getBoundingClientRect();
            const timelineMidPoint = timelineRect.top + window.scrollY + timelineRect.height/2;
            const connectingLineTop = connectingLineRect.top + window.scrollY;
            const requiredHeight = Math.min(Math.abs(timelineMidPoint - (connectingLineTop + connectingLineRect.height)), 200);
            connectingLine.style.height = `${requiredHeight}px`;
        }
    }

    const experienceSectionCardTextImageBody = (): React.ReactElement => (
        <div className="experience-section-card__text-body" style={{ marginBottom: 0 }}>
            <div className="experience-section-card__detailed-text">{item.cardDetailedText}</div>
            <div className="experience-section-card__location">
                {item.location && (<PiMapPinLineThin />)}
                <div>{item.location}</div>
            </div>
        </div>
    )

    return (
        <div
            onMouseMove={cardGradientEffect}
            className={experienceSectionCardClassName.join(" ")}>
            {defaultDisplay && experienceSectionCardTextExperienceBody()}
            <div className="connecting-line" ref={connectingLineRef}></div>
            <div className={imageWrapperClassName.join(" ")}>
                <img className={imageClassName.join(" ")}
                    alt={alt}
                    src={item.media.source.url} />
            </div>

            {experienceSectionCardTextImageBody()}
        </div>
    );
}

export default ExperienceSectionEvent;
