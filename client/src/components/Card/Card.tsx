import { Component, createRef } from "react";
import "./Card.css";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { truncateTextBody, stripAwayHashSymbols, isoDateFormatToString } from "../../components/Utility/StringUtility";

import ICardProps from "./Interface/ICardProps";
import ICardState from "./Interface/ICardState";

class Card extends Component<ICardProps, ICardState> {
    iframePreviewRef = createRef<HTMLIFrameElement>();
    defaultImage: string = "http://llcode.tech/api/image/651942aaf9b642fb30be59ae";
    defaultAuthorImage: string = "http://llcode.tech/api/image/65194be0f9b642fb30be59af";

    constructor(props: ICardProps) {
        super(props);
    }

    checkDateIsValid(): boolean {
        return this.props.date_created !== "";
    }

    render() {
        const displayMinuteRead = this.props.minuteRead ? `{this.props.minuteRead} min read` : "X min read";
        const displayDateCreated = this.checkDateIsValid() ? isoDateFormatToString(new Date(this.props.date_created)) : '';

        return (
            <div
                onClick={(e) => {
                    window.location.href = this.props.link
                }}
                onMouseMove={cardGradientEffect}
                className="card-item card">
                <div className="card-image--author-info">
                    <img className="card-image--author-image" src={this.props.authorImage ?? this.defaultAuthorImage} />
                    {this.props.author ?? ""}
                </div>
                <h3 className="card-item__heading">{this.props.heading}</h3>
                <p className="card-item__label">
                    {`${displayMinuteRead} | ${displayDateCreated}`}
                </p>
                {/* <p className="card-item__description">{stripAwayHashSymbols(truncateTextBody(this.props.body))}</p> */}
                <img className="card-image-preview" src={this.props.image ?? this.defaultImage} />
            </div>
        );
    }
}

export default Card;
