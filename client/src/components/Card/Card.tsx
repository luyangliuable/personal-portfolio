import React, { Component, createRef, RefObject } from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { isoDateFormatToString } from "../../components/Utility/StringUtility";
import TagCloud from "../TagCloud/TagCloud";
import InProgressBlock from "./InProgressBlock/InProgressBlock";
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

        this.state = {};
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
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === "llcode.tech") {
                return parsedUrl.pathname;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Invalid URL:", error);
            return null;
        }
    }

    render() {
        const { link, in_progress, authorImage, image, author, heading, minuteRead, tags, date_created } = this.props;
        const displayMinuteRead = `${minuteRead || "X"} min read`;
        const displayDateCreated = date_created ? isoDateFormatToString(new Date(date_created)) : '';

        if (link === undefined || image === undefined || authorImage === undefined)
            return (<></>);

        return (
            <NavLink ref={this.cardItemRef} onMouseMove={cardGradientEffect} className="card card-item" to={link}>
                <TagCloud tags={tags} />
                <section className="card-item__content">
                    <h3 className="card-item__heading">{heading}</h3>
                    <p className="card-item__label flex flex-row items-center">{`${displayMinuteRead} | ${displayDateCreated}`}{in_progress && <InProgressBlock />}</p>
                </section>
                <div className="card-image-preview__wrapper position-absolute overflow-hidden flex justify-center items-center">
                    {<Image compression={30} src={image} className="card-image-preview" alt="Card Preview" />}
                </div>
                <footer className="flex mt-5">
                    <Image compression={1} src={authorImage} className="user-image card-image--author-image" alt="Author" />
                    {author}
                </footer>
            </NavLink>
        );
    }
}

export default Card;
