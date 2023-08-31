import { Component, createRef } from 'react';
import IFeaturedContentSectionState from "./Interface/IFeaturedContentSectionState";
import IFeaturedContentSectionProps from "./Interface/IFeaturedContentSectionProps";
import "./FeaturedContentSection.css";
import { isCenterAlignedWithViewport } from "../Utility/ScrollUtility";

import TwinCandle from "../TwinCandle/TwinCandle";

class FeaturedContentSection extends Component<IFeaturedContentSectionProps, IFeaturedContentSectionState> {
    private currentComponentRef = createRef<HTMLDivElement>();
    private twinCandleComponentRef = createRef<TwinCandle>();

    constructor(props: IFeaturedContentSectionProps) {
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<IFeaturedContentSectionProps>): void {
        if (prevProps.scrolled !== this.props.scrolled) {
            if (Math.abs(isCenterAlignedWithViewport(this.currentComponentRef?.current)) <= 100) {
                this.twinCandleComponentRef?.current?.transitionCandleFireToOn();
            } else {
                this.twinCandleComponentRef?.current?.transitionCandleFireToOff();
            }
        }
    }

    render() {
        return (
            <div ref={this.currentComponentRef} className="featured-content-section">
                <h1 style={{ textAlign: "left", marginLeft: "2vw" }}>
                    Featured Content
                </h1>
                <div className="featured-section-content">
                    <div className="featured-section-content-content">
                    </div>
                    <TwinCandle ref={this.twinCandleComponentRef} />
                </div>
            </div>
        );
    }
}

export default FeaturedContentSection;
