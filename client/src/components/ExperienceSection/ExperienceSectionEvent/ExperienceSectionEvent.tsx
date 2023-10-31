import { cardGradientEffect } from "../../Utility/MouseUtility";
import { ExperienceSectionItem } from "../Interface/IExperienceSectionState";
import "./ExperienceSectionEvent.css";
import { PiMapPinLineThin } from "react-icons/pi";

const ExperienceSectionEvent: React.FC<{ item: ExperienceSectionItem, index: number }> = ({ item, index }) => {
    const displayIsImage = item.display === "IMAGE";
    const defaultDisplay = item.display === "NORMAL" || !item.display;

    return (
        <div
            style={{ border: "none", background: "transparent", transform: `scale(${item.importance ?? 1})` }}
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
                    <div className="light-black-text" style={{marginBottom: 0}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            {item.location && (<PiMapPinLineThin />)}
                            <div>{item.location}</div>
                        </div>
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
                <img className="experience-section-card__image"
                    style={displayIsImage ? { maxHeight: "87%", objectFit: "cover", minWidth : "100%" } : {}}
                src={item.media.source.url} />
            </div>
        </div>
    );
}

export default ExperienceSectionEvent;


