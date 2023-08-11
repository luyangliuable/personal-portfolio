import React, { Component } from 'react';
import HeroSection from "../../components/HeroSection/HeroSection";
import ILandingPagestate from "./Interface/ILandingPageState";
import Experiences from '../../components/ExperienceSection/ExperienceSection';

class LandingPage extends Component<{}, ILandingPagestate> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }


    componentDidUpdate(): void {
    }

    componentDidMount(): void {
    }

    render(): React.ReactElement<any, any> {
        return (
            <>
                <div className="landing-page-content">
                    <HeroSection />

                    <div className="home-container Experience">
                        <Experiences />
                    </div>

                    <div className="home-container blogs">
                        <div style={{ textAlign: "left" }}>
                            <h1>Blogs</h1>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LandingPage;
