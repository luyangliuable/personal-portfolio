import React, {Component} from 'react';
import Hero from "./Hero";
import AbcState from "../interface/AbcState";

class LandingPage extends Component implements AbcState {
    constructor(props: any) {
        super(props);
        /* this.state = {}; */
    }

    /* makeContentTopEqualNavBarHeight(): void {
     *     const top = this.navBarHeight;
     *     const el = document.getElementById("landing-page-content");
     *     el.style.top = `${top}px`;
     * } */


    componentDidUpdate(): void {
        /* if (this.state.scrolled > this.navBarHeight) {
         *     console.log("Detach.");
         * } */
    }

    componentDidMount(): void {
        /* this.makeContentTopEqualNavBarHeight(); */
    }

    render(): React.ReactElement<any, any> {
        return (
            <>
                <div id="landing-page-content">
                    <Hero />
                </div>
            </>
        )
    }
}


export default LandingPage;
