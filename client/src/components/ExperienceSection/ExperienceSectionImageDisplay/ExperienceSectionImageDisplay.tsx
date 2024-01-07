import React, { RefObject, useRef, useEffect } from 'react';
import { cardGradientEffect } from "../../Utility/MouseUtility";
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionImageDisplay.css";
import { PiMapPinLineThin } from "react-icons/pi";
import DynamicLoadQueue from "../../../stores/DynamicLoadQueue/DynamicLoadQueue";

interface IExperienceSectionImageDisplayProps {
    item: ExperienceSectionItem,
    timeLineRef: RefObject<HTMLDivElement>,
    index: number,
    alt?: string
}

const ExperienceSectionImageDisplay: React.FC<IExperienceSectionImageDisplayProps> = ({ item, index, alt, timeLineRef }) => {
    const experienceSectionCardIndexIsEvenNumber = index % 2 === 0;
    const connectingLineRef = useRef<HTMLDivElement>();

    function updateConnectingLine() {
        const connectingLine = connectingLineRef.current;
        const timeline = timeLineRef.current;

        if (timeline && connectingLine) {
            const timelineRect = timeline.getBoundingClientRect();
            const connectingLineRect = connectingLine.getBoundingClientRect();
            const timelineMidPoint = timelineRect.top + window.scrollY;
            const connectingLineTop = connectingLineRect.top + window.scrollY;
            const requiredHeight = Math.min(Math.abs(timelineMidPoint - (connectingLineTop + connectingLineRect.height)), 200);
            connectingLine.style.height = `${requiredHeight}px`;
        }
    }

    /* useEffect(() => {
*     const dynamicLoadQueue = DynamicLoadQueue.getInstance();
*     if (connectingLineRef !== undefined)
*         dynamicLoadQueue.addToQueue(connectingLineRef!.current);
* }, [connectingLineRef]); */


    const experienceSectionCardTextImageBody = (): React.ReactElement => (
        <div className="experience-section-card__text-body">
            <span className="image-display__detailed-text">{item.cardDetailedText}</span>
            <div className="experience-section-card__location">
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
            <div className="connecting-line" ref={connectingLineRef}></div>
            <div className="image-display__wrapper flex">
                <img className="image-display__image box-shadow-large"
                    alt={alt}
                    src={item.media.source.url} />
            </div>
            {experienceSectionCardTextImageBody()}
        </div>
    );
}

export default ExperienceSectionImageDisplay;
