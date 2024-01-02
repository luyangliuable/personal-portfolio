import React, { Component } from 'react';
import "./SkeletonImage.css";
import ISkeletonImageProps from "./Interface/ISkeletonImageProps";

class SkeletonImage extends Component<ISkeletonImageProps, {}> {
    constructor(props: ISkeletonImageProps) {
        super(props);
    }

    render() {
        const className = `image-skeleton ${this.props.class}`;
        return (
            <div className={className} style={this.props.style}></div>
        );
    }
}

export default SkeletonImage;
