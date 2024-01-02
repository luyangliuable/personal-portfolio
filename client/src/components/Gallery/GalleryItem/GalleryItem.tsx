import { Component, CSSProperties,createRef, RefObject  } from "react";
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
                <div className="gallery-item__type">
                    <CgWebsite />
                    <span>Blog</span>
                </div>
            )
        }

        return (
            <div className="gallery-item__type">
                <TbToolsOff />
                <span>Tool</span>
            </div>
        )
    }

    render() {
        const style: CSSProperties = this.props.style || {};
        const { image } = this.props;

        return (
            <NavLink to={this.props.link ?? ""}>
                <div
                    ref={this.galleryItemRef}
                    style={style}
                    key={this.props.key}
                    onMouseMove={cardGradientEffect}
                    className="gallery-item gallery-item--no-boundary card">
                    {this.GalleryItemTypeSegment}
                    <Image className="gallery-item__image" src={image} />
                    <h3>{this.props.name}</h3>
                    {
                        this.props.minuteRead && this.props.dateCreated &&
                        (<p className="gallery-item__metadata">{this.props.minuteRead} min read | {isoDateFormatToString(new Date(this.props.dateCreated))} </p>)
                    }
                    <p>{this.props.subheading}</p>
                    <p style={{ marginTop: "10px" }}>{this.props.description}</p>
                    <TagCloud tags={this.props.tags} />
                </div>
            </NavLink>
        );
    }
}

export default GalleryItem;
