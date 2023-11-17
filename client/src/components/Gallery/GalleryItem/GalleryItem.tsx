import { Component, CSSProperties } from "react";
import { isoDateFormatToString } from "../../../components/Utility/StringUtility";
import { NavLink } from "react-router-dom";
import { cardGradientEffect } from "../../../components/Utility/MouseUtility";
import "./GalleryItem.css";
import IGalleryItemProps from "./Interface/IGalleryItemProps";
import IGalleryItemState from "./Interface/IGalleryItemState";
import ImageRepository from "../../../repositories/ImageRepository";
import { TbToolsOff } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import TagCloud from "../../TagCloud/TagCloud";

class GalleryItem extends Component<IGalleryItemProps, IGalleryItemState> {
    imageRepository: ImageRepository;

    constructor(props: IGalleryItemProps) {
        super(props);
        this.imageRepository = ImageRepository.getInstance();
        this.state = {};
    }

    componentDidMount() {
        this.updateImage();
    }

    componentDidUpdate(prevProps: IGalleryItemProps) {
        if (this.props.image !== prevProps.image) {
            this.updateImage();
        }
    }

    async updateImage() {
        try {
            const imageId = this.props.image ?? "";

            const [imageUrl] = await Promise.all([
                this.imageRepository.getImageById(imageId),
            ]);

            this.setState({
                fetchedImageUrl: imageUrl,
            });

        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    get GalleryItemTypeSegment(): React.ReactElement | undefined {
        switch (this.props.type) {
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
            <NavLink to={this.props.link ?? ""}>
                <div
                    style={style}
                    key={this.props.key}
                    onMouseMove={cardGradientEffect}
                    className="gallery-item card">
                    {this.GalleryItemTypeSegment}
                    <img className="gallery-item__image" src={this.state.fetchedImageUrl} />
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
