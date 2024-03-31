import React from "react";
import ICardProps from "../../Card/Interface/ICardProps";
import Image from "../../Image/Image";
import { Link } from "react-router-dom";
import { cardGradientEffect } from "../../Utility/MouseUtility";
import "../../Card/Card.css";
import "./SmallCard.css";

const SmallCard: React.FC<ICardProps> = ({ link, in_progress, authorImage, image, author, heading, minuteRead, tags, date_created }) => {
    return (
        <Link to={link} onMouseMove={cardGradientEffect} className="card small-card flex flex-row box-border justify-between items-center">
            <div className="w-half">
                <h3>{heading}</h3>
                <footer className="flex mt-5"><Image src={authorImage ?? ""} className="user-image card-image--author-image" alt="Author" />{author}</footer>
            </div>
            <div className="small-card__image__wrapper flex justify-center items-center">
                <Image className="small-card__image" src={image ?? ""} />
            </div>
        </Link>
    )
}

export default SmallCard;
