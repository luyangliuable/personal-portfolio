import React from "react";
import IHeroHeaderProps from "./Interface/IHeroHeaderProps";
import SequentialRiseSpan from "../Atoms/SequentialRiseSpan/SequentialRiseSpan";
import "./HeroHeader.css";

const HeroHeader: React.FC<IHeroHeaderProps> = ({ heading, description, graphics }) => {
    return (
        <div className="hero-header flex flex-row justify-start items-center">
            {
                graphics && (
                    <div className="hero-header__graphics-container">{graphics}</div>
                )
            }
            <div className="w-full">
                <SequentialRiseSpan elementType="h1" minNumberOfLettersPerLine={23}>
                    {heading}
                </SequentialRiseSpan>
                <SequentialRiseSpan className="hero-header--description" minNumberOfLettersPerLine={23}>
                    {description}
                </SequentialRiseSpan>
            </div>
        </div>
    );
}

export default HeroHeader;
