import React, {Component} from 'react';
import Hero from "./Hero";

interface AbcState {
    state: any
};

class LandingPage extends Component<{}, AbcState> {
    constructor(props: any) {
        super(props);

        this.state = {}
    }

    get NavBarHeight() {
        const element = document.querySelector('.navbar');
        return window.getComputedStyle(element).height;
    }

    componentDidUpdate() {
        if (this.state.scrolled > this.NavBarHeight) {
            console.log("Detach.");
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;
            console.log(`Scrolled ${scrolled}.`);
            console.log(this.NavBarHeight);
        });
    }

    render() {
        return (
            <>
                <div className="landing-page-content">
                    <Hero />
                </div>
            </>
        )
    }
}


export default LandingPage;
