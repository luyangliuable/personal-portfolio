import React, { Component } from 'react';
import "./FeaturedContentSection.css";
import "./FeaturedContentSectionKeyframeAnimations.css";
import IFeaturedContentSectionState from "./Interface/IFeaturedContentSectionState";
import IFeaturedContentSectionProps from "./Interface/IFeaturedContentSectionProps";

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
                <div className="wrapper">
                    <div className="candles">
                        <div className="light__wave"></div>
                        <div className="candle1">
                            <div className="candle1__body">
                                <div className="candle1__eyes">
                                    <span className="candle1__eyes-one"></span>
                                    <span className="candle1__eyes-two"></span>
                                </div>
                                <div className="candle1__mouth"></div>
                            </div>
                            <div className="candle1__stick"></div>
                        </div>

                        <div className="candle2">
                            <div className="candle2__body">
                                <div className="candle2__eyes">
                                    <div className="candle2__eyes-one"></div>
                                    <div className="candle2__eyes-two"></div>
                                </div>
                            </div>
                            <div className="candle2__stick"></div>
                        </div>
                        <div className="candle2__fire"></div>
                        <div className="sparkles-one"></div>
                        <div className="sparkles-two"></div>
                        <div className="candle__smoke-one">

                        </div>
                        <div className="candle__smoke-two">

                        </div>
                    </div>
                    <div className="floor">
                    </div>
                </div>
            </div>
        );
    }
}

export default FeaturedContentSection;
