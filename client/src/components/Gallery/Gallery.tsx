import { Component } from "react";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { IGalleryProps } from "./Interface/IGalleryProps";
import IGalleryState from "./Interface/IGalleryState";
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
                        this.props.content.map((item: any) => (
                            <div
                                onClick={(e) => {
                                    window.location.href = item.link
                                }}
                                onMouseMove={cardGradientEffect}
                                className="gallery-item card">

                                <h3>
                                    {item.name}
                                </h3>
                                <img className="gallery-item__image" src={item.image} />

                                <p>
                                    {item.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default Gallery;
