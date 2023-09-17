import { Component } from 'react';
import CodingCat from "../CodingCat/CodingCat";
import './HeroSection.css';
import IHeroState from "./Interface/IHeroState";
import IHeroProps from "./Interface/IHeroProps";
import LandingPageCard from "../LandingPageCard/LandingPageCard";


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
            <div className="hero-section__wrapper">
                <LandingPageCard
                    className="hero-section"
                    heading={this.state.mainContent.heading}
                    landingPageCardType="fitUnderNavbar">

                    <div className="hero-section__content">
                        <div className="hero-section__content__left">
                            {
                                this.state.mainContent.items.map((item: string, index: number) => {
                                    return (
                                        <p key={index} className="light-black-text">{item}</p>
                                    )
                                })
                            }
                            <div className="button noselect" onClick={() => window.location.href = "/digital_chronicles/blogs"}>
                                See my Blogs
                            </div>
                            <div className="button noselect hero-section__project-button" onClick={() => window.location.href = "/projects/code"}>
                                See my Projects
                            </div>
                        </div>

                        <div className="hero-section__background__wrapper">
                            <div className="hero-section__background-one" />
                            <div className="hero-section__background-two" />
                            <div className="hero-section__background-three" />
                            <div className="hero-section__background-four" />
                            <div className="hero-section__background-five" />
                            <div className="hero-section__background-six" />
                        </div>

                        <div className="hero-section__content__right">
                            <CodingCat showAnimtion={this.state.scrolling} />
                        </div>
                    </div>


                    <div className="hero-section-badge__container">
                        <a href="mailto:luyang.l@protonmail.me" className="hero-section-badge__link" target="_blank">
                            <img src="https://img.shields.io/badge/email-%2312100E.svg?&style=for-the-badge&logo=protonmail&logoColor=white&color=black" alt="GitHub Badge" />
                        </a>
                        <a href="https://github.com/luyangliuable" className="hero-section-badge__link" target="_blank">
                            <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=black" alt="GitHub Badge" />
                        </a>

                        <a href="https://www.linkedin.com/in/luyang-l" className="hero-section-badge__link" target="_blank">
                            <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge" />
                        </a>

                        <a href="https://www.codecademy.com/profiles/luyangliuable" className="hero-section-badge__link" target="_blank">
                            <img src="https://img.shields.io/badge/codecademy-%2312100E.svg?&style=for-the-badge&logo=codecademy&logoColor=white&color=black" alt="Codecademy Badge" />
                        </a>
                    </div>
                </LandingPageCard>
            </div>
        );
    }
}

export default HeroSection;
