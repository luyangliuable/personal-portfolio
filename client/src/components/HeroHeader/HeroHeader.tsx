import React from "react";
import IHeroHeaderProps from "./Interface/IHeroHeaderProps";
import "./HeroHeader.css";

const HeroHeader: React.FC<IHeroHeaderProps> = ({heading, description, graphics}) => {
    return (
        <div className="hero-header">
            {
                graphics && (
                    <div className="hero-header__graphics-container">
                        {graphics}
                    </div>
                )
            }
            <div className="hero-header__content">
            <h1>{heading}</h1>
            <p>{description}</p>
            </div>
        </div>
    );
}

export default HeroHeader;
