import React, { Component } from 'react';
import './LandingPageCard.css';
import { ILandingPageCardProps, LandingPageCardType } from "./Interface/ILandingPageCardProps";
import SequentialRiseSpan from '../Atoms/SequentialRiseSpan/SequentialRiseSpan';


class LandingPageCard extends Component<ILandingPageCardProps, any> {

    constructor(props: ILandingPageCardProps) {
        super(props);
        this.state = {}
    }

    componentDidMount(): void {
        window.addEventListener("scroll", () => {
            this.setState({
                ...this.state,
                scrolling: true
            });
        });

        document.documentElement.scrollTo(0, 0);

        setInterval(() => {
            if (this.state.scrolling) {
                this.setState({
                    ...this.state,
                    scrolling: false
                });
            }
        }, 500);
    }

    private determineWhatTypeOfLandingPageCardToUse(landingPageCardType: LandingPageCardType): string {
        const mapper = {
            "normal": "landing-page-card",
            "fitUnderNavbar": "landing-page-card landing-page-card--fit-under-navbar",
            "fitContent": "landing-page-card landing-page-card--fit-content"
        }

        return mapper[landingPageCardType];
    }

    render(): any {
        let classArray = [
            this.determineWhatTypeOfLandingPageCardToUse(this.props.landingPageCardType),
            this.props.className
        ];
        if (this.props.blendWithBackground) classArray.push('blend-with-background');
        const landingPageCardHeading = this.props.heading;
        return (
            <div className={classArray.join(' ')}>
                <div className="landing-page-card__content">
                    {landingPageCardHeading && (
                        <header className="landing-page-card__heading important-text">
                            <SequentialRiseSpan elementType="h2" className="landing-page-card__header" >
                                {landingPageCardHeading ?? ""}
                            </SequentialRiseSpan>
                        </header>
                    )}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LandingPageCard;
