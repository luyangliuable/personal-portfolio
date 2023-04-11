import React, { Component } from 'react';
import Hero from "./Hero";
import AbcState from "../interface/AbcState";
import Experiences from './Experiences';

class LandingPage extends Component implements AbcState {
    constructor(props: any) {
        super(props);
        /* this.state = {}; */
    }


    componentDidUpdate(): void {
    }

    componentDidMount(): void {
    }

    render(): React.ReactElement<any, any> {
        return (
            <>
                <div className="landing-page-content">
                    <Hero />

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
