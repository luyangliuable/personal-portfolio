import { Component, CSSProperties } from "react";
import { isoDateFormatToString } from "../../../components/Utility/StringUtility";
import { cardGradientEffect } from "../../../components/Utility/MouseUtility";
import "./GalleryItem.css";
import IGalleryItemProps from "./Interface/IGalleryItemProps";
import { TbToolsOff } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import TagCloud from "../../TagCloud/TagCloud";

class GalleryItem extends Component<IGalleryItemProps, {}> {
    constructor(props: IGalleryItemProps) {
        super(props);
        this.state = {};
    }

    get GalleryItemTypeSegment(): React.ReactElement | undefined {
        switch ( this.props.type ) {
            case "blog":
                return (
                    <div className="gallery-item__type">
                        <CgWebsite />
                        <span>Blog</span>
                    </div>
                )
                break;
            case "tool":
                return (
                    <div className="gallery-item__type">
                        <TbToolsOff />
                        <span>Tool</span>
                    </div>
                )
        }
    }

    render() {
        const style: CSSProperties = this.props.style || {};

        return (
            <div
                style={style}
                key={this.props.key}
                onClick={(e) => {
                    window.location.href = this.props.link
                }}
                onMouseMove={cardGradientEffect}
                className="gallery-item card">
                {this.GalleryItemTypeSegment}
                <img className="gallery-item__image" src={this.props.image} />
                <h3>{this.props.name}</h3>
                {
                    this.props.minuteRead && this.props.dateCreated &&
                        (<p className="gallery-item__metadata">{this.props.minuteRead} min read | {isoDateFormatToString( new Date(this.props.dateCreated) )} </p>)
                }
                <p>{this.props.subheading}</p>
                <p style={{marginTop: "10px"}}>{this.props.description}</p>
                <TagCloud tags={this.props.tags} />
                </div>
        );
    }
}

export default GalleryItem;
