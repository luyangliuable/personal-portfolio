import { Component } from "react";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { IGalleryProps } from "./Interface/IGalleryProps";
import IGalleryState from "./Interface/IGalleryState";
import GalleryItem from "./GalleryItem/GalleryItem";
import "./Gallery.css";

class Gallery extends Component<IGalleryProps, IGalleryState> {
    constructor(props: IGalleryProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div className="heading__wrapper">
                    <h1>
                        {this.props.heading}
                    </h1>
                </div>
                <div className="gallery-item__container">
                    {
                        this.props.content.map((item: any, index: number) => (
                            <GalleryItem key={index} {...item} />
                        ))
                    }
                </div>
            </>
        );
    }
}

export default Gallery;
