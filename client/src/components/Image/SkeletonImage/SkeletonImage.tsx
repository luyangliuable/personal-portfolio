import React from 'react';
import "./SkeletonImage.css";
import ISkeletonImageProps from "./Interface/ISkeletonImageProps";

const SkeletonImage: React.FC<ISkeletonImageProps> = (props) => {
    const className = `image-skeleton ${props.class}`;

    return (
        <div className={className} style={props.style}></div>
    );
}

export default SkeletonImage;
