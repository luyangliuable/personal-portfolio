import React, { Component, createRef } from "react";
import { IGalleryProps } from "./Interface/IGalleryProps";
import IGalleryState from "./Interface/IGalleryState";
import GalleryItem from "./GalleryItem/GalleryItem";
import TagCloud from "../TagCloud/TagCloud";
import "./Gallery.css";


class Gallery extends Component<IGalleryProps, IGalleryState> {
    galleryContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IGalleryProps) {
        super(props);

        this.galleryContainerRef = createRef();
        this.state = {
            shouldAddDummy: false
        };
    }

    componentDidMount(): void {
        const container = this.galleryContainerRef.current!;
        const itemCount = container.querySelectorAll(':scope > *').length;

        if (itemCount === 1) {
            this.setState({ shouldAddDummy: true });
        } else {
            this.setState({ shouldAddDummy: false });
        }
    }

    renderGalleryItems(): React.ReactNode {
        return this.props.content.map((item: any, index: number) => (
            <GalleryItem key={index} {...item} />
        ))
    }

    render() {
        return (
            <>
                <div className="heading__wrapper"><h1>{this.props.heading}</h1></div>
                <div ref={this.galleryContainerRef} className="gallery-item__container">
                    {this.renderGalleryItems()}
                    {this.state.shouldAddDummy && <GalleryItem style={{ visibility: "hidden" }} />}
                </div>
            </>
        );
    }
}

export default Gallery;
