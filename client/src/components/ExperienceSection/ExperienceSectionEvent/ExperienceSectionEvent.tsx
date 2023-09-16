import { cardGradientEffect } from "../../Utility/MouseUtility";
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionEvent.css";

const ExperienceSectionEvent: React.FC<{ item: ExperienceSectionItem, index: number }> = ({ item, index }) => {
    const displayIsImage = item.display === "IMAGE";
    const defaultDisplay = item.display === "NORMAL" || !item.display;

    return (
        <div
            style={{ transform: `scale(${item.importance ?? 1})` }}
            onMouseMove={cardGradientEffect}
            className={`card experience-section-card ${index % 2 === 0 ? 'above' : 'below'}`}>

            {
                defaultDisplay && (
                    <>
                        <h2>{item.cardTitle}</h2>
                        <div className="light-black-text">{item.dateTime}</div>
                        <div className="light-black-text">{item.cardSubtitle}</div>
                    </>
                )
            }
            {
                displayIsImage && (
                    <div className="light-black-text">
                        {item.cardDetailedText}
                    </div>
                )
            }

            <div style={displayIsImage ? {
                display: "flex",
                height: "80%",
                justifyContent: "center",
                alignItems: "flex-end",
            } : {
                display: "flex",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <img className="card__image"
                    style={displayIsImage ? { transform: "scale(2)" } : {}}
                    src={item.media.source.url} />
            </div>
        </div>
    );
}

export default ExperienceSectionEvent;


