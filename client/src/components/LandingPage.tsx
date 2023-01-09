import React, {Component} from 'react';
import Hero from "./Hero";
import AbcState from "../interface/AbcState";



class LandingPage extends Component implements AbcState {
    constructor(props: any) {
        super(props);
        /* this.state = {}; */
    }

    get navBarHeight() : number {
        const element = document.querySelector('.navbar');
        const navBarHeight = element.getBoundingClientRect().height;
        return navBarHeight;
    }

    detachNavBar(): void {
        const element = document.querySelector('.navbar');
        element.classList.add("detached");
    }

    makeContentTopEqualNavBarHeight(): void {
        const top = this.navBarHeight;
        const el = document.getElementById("landing-page-content");
        el.style.top = `${top}px`;
    }

    attachNavBar(): void {
        const element = document.querySelector('.navbar');
        element.classList.remove("detached");
    }

    updateScrolledProgress(progress: number): void {
        /* const element = document.querySelector(".scroll-progress"); */
        const element = document.getElementById('scroll-progress');
        element.style.width = `${progress*100}vw`;
    }

    componentDidUpdate(): void {
        /* if (this.state.scrolled > this.navBarHeight) {
         *     console.log("Detach.");
         * } */
    }

    componentDidMount(): void {
        this.makeContentTopEqualNavBarHeight();
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;

            if ( scrolled > this.navBarHeight ) {
                this.detachNavBar();
            } else {
                this.attachNavBar();
            }

            const element = document.querySelector("#landing-page-content");
            const pageHeight = element.getBoundingClientRect().height - window.innerHeight;

            this.updateScrolledProgress(scrolled/pageHeight);

        });
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
