import { Component, createRef, RefObject } from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { isoDateFormatToString } from "../../components/Utility/StringUtility";
import TagCloud from "../TagCloud/TagCloud";
import Image from "../Image/Image";
import ICardProps from "./Interface/ICardProps";
import ICardState from "./Interface/ICardState";
import DynamicLoadQueue from "../../stores/DynamicLoadQueue/DynamicLoadQueue";

class Card extends Component<ICardProps, ICardState> {
    iframePreviewRef = createRef<HTMLIFrameElement>();
    cardItemRef: RefObject<HTMLAnchorElement>;
    dynamicLoadQueue: DynamicLoadQueue;

    constructor(props: ICardProps) {
        super(props);
        this.cardItemRef = createRef();
        this.dynamicLoadQueue = DynamicLoadQueue.getInstance();

        this.state = {
            fetchedImageUrl: null,
        };
    }

    componentDidMount() {
        if (this.cardItemRef.current) {
            this.dynamicLoadQueue.addToQueue(this.cardItemRef.current);
        }
    }

    checkDateIsValid(): boolean {
        return this.props.date_created !== "";
    }

    extractRouteFromURL(url: string): string | null {
        console.log(url)
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === "llcode.tech") {
                return parsedUrl.pathname; // Returns the path (route) of the URL
            } else {
                return null;
            }
        } catch (error) {
            console.error("Invalid URL:", error);
            return null;
        }
    }

    render() {
        const { link, authorImage, image, author, heading, minuteRead, tags, date_created } = this.props;
        const displayMinuteRead = `${minuteRead || "X"} min read`;
        const displayDateCreated = date_created ? isoDateFormatToString(new Date(date_created)) : '';

        return (
            <NavLink ref={this.cardItemRef} onMouseMove={cardGradientEffect} className="card card-item" to={link}>
                <div className="card-image--author-info">
                    {<Image src="http://llcode.tech/api/image/65817ae96c73ceb16ba51731" className="card-image--author-image" alt="Author" />}
                    {author}
                </div>
                <div className="card-item__content">
                    <h3 className="card-item__heading">{heading}</h3>
                    <p className="card-item__label">{`${displayMinuteRead} | ${displayDateCreated}`}</p>
                </div>
                <div className="card-image-preview__wrapper">
                    {<Image src={image} className="card-image-preview" alt="Card Preview" />}
                </div>
                <TagCloud tags={tags} />
            </NavLink>
        );
    }
}

export default Card;
