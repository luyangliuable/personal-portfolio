import { Component, createRef } from 'react';
import "./Card.css";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { truncateTextBody, stripAwayHashSymbols, isoDateFormatToString } from "../../components/Utility/StringUtility";

import ICardProps from './Interface/ICardProps';
import ICardState from './Interface/ICardState';

class Card extends Component<ICardProps, ICardState> {
    iframePreviewRef = createRef<HTMLIFrameElement>();

    constructor(props: ICardProps) {
        super(props);
    }

    checkAuthorAndDateIsValid(): boolean {
        return this.props.author !== undefined && this.props.date_created !== "";
    }

    render() {
        return (
            <div
                onClick={(e) => {
                    window.location.href = this.props.link
                }}
                onMouseMove={cardGradientEffect}
                className="card-item card">
                <h3 className="card-item__heading">{this.props.heading}</h3>
                <p className="card-item__label">
                {
                    this.checkAuthorAndDateIsValid() && (
                        <p>{this.props.author ?? ''} | {this.props.date_created && isoDateFormatToString(new Date(this.props.date_created))}</p>
                    )
                }
                </p>
                <p className="card-item__description">
                    {stripAwayHashSymbols(truncateTextBody(this.props.body))}
                </p>

                <img className="card-image-preview" src={this.props.image} />
            </div>
        );
    }
}

export default Card;
