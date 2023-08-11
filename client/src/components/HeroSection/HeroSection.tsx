import React, { Component } from 'react';
import CodingCat from "../CodingCat/CodingCat";
import './HeroSection.css';
import IHeroState from "./Interface/IHeroState";
import IHeroProps from "./Interface/IHeroProps";


class HeroSection extends Component<IHeroProps, IHeroState> {

    constructor(props: IHeroProps) {
        super(props);
        this.state = {
            scrolling: false,
            mainContent: {
                heading: "Hi There 👋",
                items: [
                    "🔭 I’m currently working on a personal profile website.",
                    "🌱 I’m currently learning mlops and cybersecurity out of interest.",
                    "👯 I’m looking to collaborate on building a start up.",
                    "🤔 I’m looking for people to talk to about programming.",
                    "🤔 I'm born Christmas and I am a dog person."
                ]
            }
        }
    }

    componentDidMount(): void {
        window.addEventListener("scroll", () => {
            console.log('scroll')
            this.setState({
                ...this.state,
                scrolling: true
            });
        });

        setInterval(() => {
            if (this.state.scrolling) {
                console.log("Stop scroll");
                this.setState({
                    ...this.state,
                    scrolling: false
                });
            }
        }, 500);
    }


    render(): any {
        return (
            <div className="home-container">
                {/* <div className="hero-accordion-button hero-accordion-left" /> */}
                <div style={{ textAlign: "left" }}>
                    <ul>
                        <h1>
                            {(this.state && this.state.mainContent) ? this.state.mainContent.heading : ""}
                        </h1>
                    </ul>


                    {
                        this.state.mainContent.items.map((item: string, index: number) => {
                            return (
                                <ul key={index}>
                                    <p className="light-black-text">{item}</p>
                                </ul>
                            )
                        })
                    }
                </div>

                <CodingCat showAnimtion={this.state.scrolling} />
                {/* <div className="hero-accordion-button hero-accordion-right"  /> */}
            </div>
        );
    }
}

export default HeroSection;
