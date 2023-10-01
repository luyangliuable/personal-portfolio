import { Component } from "react";
import { cardGradientEffect } from "../../../components/Utility/MouseUtility";
import "./GalleryItem.css";
import IGalleryItemProps from "./Interface/IGalleryItemProps";

class GalleryItem extends Component<IGalleryItemProps, {}> {
    constructor(props: IGalleryItemProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                key={this.props.key}
                onClick={(e) => {
                    window.location.href = this.props.link
                }}
                onMouseMove={cardGradientEffect}
                className="gallery-item card">
                <img className="gallery-item__image" src={this.props.image} />
                <h3>{this.props.name}</h3>
                <p>{this.props.subheading}</p>
                <p>{this.props.description}</p>
            </div>
        );
    }
}

export default GalleryItem;
