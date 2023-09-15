import React, { Component } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import ILandingPagestate from "./Interface/ILandingPageState";
import ILandingPageProps from "./Interface/ILandingPageProps";
import Experiences from "../../components/ExperienceSection/ExperienceSection";
import FeaturedContentSection from "../../components/FeaturedContentSection/FeaturedContentSection";
import LandingPageCard from "../../components/LandingPageCard/LandingPageCard";

import BlogPage from "../BlogPage/BlogPage";

class LandingPage extends Component<ILandingPageProps, ILandingPagestate> {
    constructor(props: ILandingPageProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="landing-page-content">
                <HeroSection />

                <FeaturedContentSection scrolled={this.props.scrolled} />

                <div className="experience-section-wrapper">
                    <Experiences scrolled={this.props.scrolled} />
                </div>

                <LandingPageCard landingPageCardType="fitContent" heading="Digital Chronicles of the Real World">
                    <BlogPage />
                </LandingPageCard>
            </div>
        )
    }
}

export default LandingPage;
