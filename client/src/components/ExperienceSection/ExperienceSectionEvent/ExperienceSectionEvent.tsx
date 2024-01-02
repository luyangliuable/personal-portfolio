import { cardGradientEffect } from "../../Utility/MouseUtility";
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionEvent.css";
import { PiMapPinLineThin } from "react-icons/pi";

interface ExperienceSectionEventProps {
    item: ExperienceSectionItem,
    index: number,
    alt?: string 
}

const ExperienceSectionEvent: React.FC<ExperienceSectionEventProps> = ({ item, index, alt }) => {
    const displayIsImage = item.display === "IMAGE";
    const defaultDisplay = item.display === "NORMAL" || !item.display;
    const experienceSectionCardIndexIsEvenNumber = index % 2 === 0;
    const experienceSectionCardClassName = ["card experience-section-card"];

    experienceSectionCardIndexIsEvenNumber ? experienceSectionCardClassName.push("above")
        : experienceSectionCardClassName.push("below");

    const imageWrapperClassName = ["experience-section-card__image-wrapper"];
    const imageClassName = ["experience-section-card__image"];

    if (displayIsImage)  {
        imageWrapperClassName.push("experience-section-card__image-wrapper--image")
        imageClassName.push("box-shadow-large")
    } else {
        imageWrapperClassName.push("experience-section-card__image-wrapper--experience")
    };

    const experienceSectionCardTextExperienceBody = (): React.ReactElement => (
        <div className="experience-section-card__text-body">
            <h2>{item.cardTitle}</h2>
            <div className="experience-section-card__date">{item.dateTime}</div>
            <div className="experience-section-card__job-title">{item.cardSubtitle}</div>
            </div>
    )

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
        style={{ transform: `scale(${item.importance ?? 1})` }}
        onMouseMove={cardGradientEffect}
        className={experienceSectionCardClassName.join(" ")}>

            {defaultDisplay && experienceSectionCardTextExperienceBody()}

            <div className={imageWrapperClassName.join(" ")}>
            <img className={imageClassName.join(" ")}
        alt={alt}
        style={displayIsImage ? { maxHeight: "180px", objectFit: "cover", minWidth: "100%", marginBottom: "10px" } : {}}
        src={item.media.source.url} />
            </div>

            {displayIsImage && experienceSectionCardTextImageBody()}
        </div>
    );
}

export default ExperienceSectionEvent;
