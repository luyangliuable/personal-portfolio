import React, { Component } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import ILandingPagestate from "./Interface/ILandingPageState";
import ILandingPageProps from "./Interface/ILandingPageProps";
import Experiences from "../../components/ExperienceSection/ExperienceSection";
import FeaturedContentSection from "../../components/FeaturedContentSection/FeaturedContentSection";

import BlogPage from "../BlogPage/BlogPage";

class LandingPage extends Component<ILandingPageProps, ILandingPagestate> {
    constructor(props: ILandingPageProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="landing-page-content">
                <div className="landing-page-card">
                    <HeroSection />
                </div>

                <div className="landing-page-card">
                    <FeaturedContentSection scrolled={this.props.scrolled} />
                </div>

                <div className="experience-section-wrapper">
                    <Experiences scrolled={this.props.scrolled} />
                </div>

                <div className="landing-page-card blogs">
                    <div style={{ width: "92%", textAlign: "left", marginLeft: "2vw" }}>
                        <h1>Blogs</h1>
                        <BlogPage />
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;
