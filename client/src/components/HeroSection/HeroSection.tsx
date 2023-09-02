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
                ]
            }
        }
    }

    componentDidMount(): void {
        window.addEventListener("scroll", () => {
            this.setState({
                ...this.state,
                scrolling: true
            });
        });

        setInterval(() => {
            if (this.state.scrolling) {
                this.setState({
                    ...this.state,
                    scrolling: false
                });
            }
        }, 500);
    }


    render(): any {
        return (
            <div className="hero-section-container">
                <div className="hero-section-content">
                    <div style={{ padding: "0 5vw 0 5vw" }}>
                        <h1>
                            {(this.state && this.state.mainContent) ? this.state.mainContent.heading : ""}
                        </h1>

                        {
                            this.state.mainContent.items.map((item: string, index: number) => {
                                return (
                                    <p key={index} className="light-black-text">{item}</p>
                                )
                            })
                        }
                    </div>
                </div>

                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                    <CodingCat showAnimtion={this.state.scrolling} />
                </div>

                <div className="hero-section-badge-container">
                    <a href="mailto:luyang.l@protonmail.me" className="hero-section-badge-link" target="_blank">
                        <img src="https://img.shields.io/badge/email-%2312100E.svg?&style=for-the-badge&logo=protonmail&logoColor=white&color=black" alt="GitHub Badge" />
                    </a>
                    <a href="https://github.com/luyangliuable" className="hero-section-badge-link" target="_blank">
                        <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=black" alt="GitHub Badge" />
                    </a>

                    <a href="https://www.linkedin.com/in/luyang-l" className="hero-section-badge-link" target="_blank">
                        <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge" />
                    </a>

                    <a href="https://www.codecademy.com/profiles/luyangliuable" className="hero-section-badge-link" target="_blank">
                        <img src="https://img.shields.io/badge/codecademy-%2312100E.svg?&style=for-the-badge&logo=codecademy&logoColor=white&color=black" alt="Codecademy Badge" />
                    </a>
                </div>
            </div>
        );
    }
}

export default HeroSection;
