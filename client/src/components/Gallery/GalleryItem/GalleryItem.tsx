import React, { Component, CSSProperties, createRef, RefObject } from "react";
import { isoDateFormatToString } from "../../../components/Utility/StringUtility";
import { NavLink } from "react-router-dom";
import { cardGradientEffect } from "../../../components/Utility/MouseUtility";
import "./GalleryItem.css";
import IGalleryItemProps from "./Interface/IGalleryItemProps";
import IGalleryItemState from "./Interface/IGalleryItemState";
import { TbToolsOff } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import TagCloud from "../../TagCloud/TagCloud";
import DynamicLoadQueue from "../../../stores/DynamicLoadQueue/DynamicLoadQueue";
import Image from "../../Image/Image";
import SequentialRiseSpan from "../../Atoms/SequentialRiseSpan/SequentialRiseSpan";

class GalleryItem extends Component<IGalleryItemProps, IGalleryItemState> {
    galleryItemRef: RefObject<HTMLDivElement>;
    dynamicLoadQueue: DynamicLoadQueue;

    constructor(props: IGalleryItemProps) {
        super(props);
        this.dynamicLoadQueue = DynamicLoadQueue.getInstance();
        this.galleryItemRef = createRef();
        this.state = {};
    }

    componentDidMount() {
        if (this.galleryItemRef.current) {
            this.dynamicLoadQueue.addToQueue(this.galleryItemRef.current);
        }
    }

    get GalleryItemTypeSegment(): React.ReactElement {
        const type = this.props.type;

        if (type === "blog") {
            return (
                <div className="gallery-item__type font-fira-code">
                    <CgWebsite />
                    <span>BLOG</span>
                </div>
            )
        } else if (type === "tool") {
            return (
                <div className="gallery-item__type font-fira-code">
                    <TbToolsOff />
                    <span>TOOL</span>
                </div>
            )
        }

        return (<></>)
    }

    render() {
        const style: CSSProperties = this.props.style || {};
        const { image, className } = this.props;
        return (
            <NavLink className={className} to={this.props.link ?? ""}>
                <div
                    ref={this.galleryItemRef}
                    style={style}
                    key={this.props.key}
                    onMouseMove={cardGradientEffect}
                    className="gallery-item flex flex-col justify-start items-center opacity-0 pb-10 blur-boundary card">
                    {this.GalleryItemTypeSegment}
                    <div className="position-absolute color-white right-0 w-15 top-10 font-fira-code">READ</div>
                    <Image className="gallery-item__image" src={image} />
                    <h3>{this.props.name}</h3>
                    {
                        this.props.minuteRead && this.props.dateCreated &&
                        (<p className="gallery-item__metadata">{this.props.minuteRead} min read | {isoDateFormatToString(new Date(this.props.dateCreated))} </p>)
                    }
                    <p>{this.props.subheading}</p>
                    {this.props.description &&
                        <div className="w-full box-border p-4">
                            <SequentialRiseSpan>
                                {this.props.description}
                            </SequentialRiseSpan>
                        </div>
                    }
                    <TagCloud tags={this.props.tags} />
                </div>
            </NavLink>
        );
    }
}

export default GalleryItem;
