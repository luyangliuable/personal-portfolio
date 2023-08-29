import React, { Component } from 'react';
import IFeaturedContentSectionState from "./Interface/IFeaturedContentSectionState";
import IFeaturedContentSectionProps from "./Interface/IFeaturedContentSectionProps";
import "./FeaturedContentSection.css";

import TwinCandle from "../TwinCandle/TwinCandle";

class FeaturedContentSection extends Component<IFeaturedContentSectionProps, IFeaturedContentSectionState> {
    constructor(props: IFeaturedContentSectionProps) {
        super(props);
    }

    render() {
        return (
            <div className="featured-content-section">
                <h1 style={{ textAlign: "left", marginLeft: "2vw" }}>
                    Featured Content
                </h1>
                <div className="featured-section-content">
                    <div className="featured-section-content-content">
                    </div>
                    <TwinCandle />
                </div>
            </div>
        );
    }
}

export default FeaturedContentSection;
