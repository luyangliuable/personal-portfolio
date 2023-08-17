import React, { Component } from 'react';
import HeroSection from "../../components/HeroSection/HeroSection";
import ILandingPagestate from "./Interface/ILandingPageState";
import ILandingPageProps from "./Interface/ILandingPageProps";
import Experiences from '../../components/ExperienceSection/ExperienceSection';

class LandingPage extends Component<ILandingPageProps, ILandingPagestate> {
    constructor(props: ILandingPageProps) {
        super(props);
        this.state = {};
    }


    componentDidUpdate(): void {
    }

    componentDidMount(): void {
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="landing-page-content">
                <div className="landing-page-card">
                    <HeroSection />
                </div>

                <div style={{left: 0, marginLeft: 0, height: "180vh", transform: "translate(0, 0)"}}>
                    <div className="landing-page-card experience">
                        <Experiences scrolled={this.props.scrolled} />
                    </div>
                </div>

                <div className="landing-page-card blogs">
                    <div style={{ textAlign: "left", marginLeft: "2vw" }}>
                        <h1>Blogs</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;
