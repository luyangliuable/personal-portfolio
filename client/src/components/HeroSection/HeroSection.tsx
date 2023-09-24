import { Component } from 'react';
import CodingCat from "../CodingCat/CodingCat";
import './HeroSection.css';
import IHeroState from "./Interface/IHeroState";
import IHeroProps from "./Interface/IHeroProps";
import LandingPageCard from "../LandingPageCard/LandingPageCard";


class HeroSection extends Component<IHeroProps, IHeroState> {
    contentInterval: any;

    constructor(props: IHeroProps) {
        super(props);
        this.state = {
            backgrounds: [],
            mainContent: {
                heading: "Hi There 👋",
                itemsToShow: [],
                items: [
                    "🔭 I’m currently working on a personal profile website.",
                    "🌱 I’m currently learning mlops and cybersecurity out of interest.",
                    "👯 I’m looking to collaborate on building a start up.",
                    "🤔 I’m looking for people to talk to about programming.",
                ]
            },
            linkToMyOtherSocialMedia: [
                {
                    "name": "Notion",
                    "link": "https://www.notion.so/luyangl/71be1ff365c44fd2b4f6f8dce14b7536?v=f1e55d08878e4bfda1b744e76b9480c7&pvs=4",
                    "imageSrc": "https://img.shields.io/badge/notion-%2312100E.svg?&style=for-the-badge&logo=notion&logoColor=%23333&color=%239e9e9e"
                },
                {
                    "name": "Email",
                    "link": "mailto:luyang.l@protonmail.me",
                    "imageSrc": "https://img.shields.io/badge/email-%2312100E.svg?&style=for-the-badge&logo=protonmail&logoColor=white&color=black"
                },
                {
                    "name": "GitHub",
                    "link": "https://github.com/luyangliuable",
                    "imageSrc": "https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=black"
                },
                {
                    "name": "LinkedIn",
                    "link": "https://www.linkedin.com/in/luyang-l",
                    "imageSrc": "https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"
                },
                {
                    "name": "Codecademy",
                    "link": "https://www.codecademy.com/profiles/luyangliuable",
                    "imageSrc": "https://img.shields.io/badge/codecademy-%2312100E.svg?&style=for-the-badge&logo=codecademy&logoColor=white&color=black"
                },
            ]
        }
    }

    componentDidMount() {
        let contentIndex = 0;

        this.contentInterval = setInterval(() => {
            if (contentIndex < this.state.mainContent.items.length) {
                this.setState((prevState) => ({
                    mainContent: {
                        ...prevState.mainContent,
                        itemsToShow: [
                            ...prevState.mainContent.itemsToShow,
                            this.state.mainContent.items[contentIndex]
                        ]
                    }
                }));
                contentIndex++;
            } else {
                clearInterval(this.contentInterval);
            }
        }, 100);

    }

    componentWillUnmount() {
        clearInterval(this.contentInterval);
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
                                this.state.mainContent.items.map((item: string, index: number) => (
                                    <p key={index} className="hero-section__content__left__text">{item}</p>
                                ))
                            }
                            <div className="button noselect" onClick={() => window.location.href = "/digital_chronicles/blogs"}>See my Blogs</div>
                            <div className="button noselect hero-section__project-button" onClick={() => window.location.href = "/projects/code"}>See my Projects</div>
                        </div>
                        <div className="hero-section__background__wrapper">
                            {this.state.backgrounds}
                        </div>
                        <div className="hero-section__content__right">
                            <CodingCat showAnimtion={this.props.scrolling} />
                        </div>
                    </div>
                    <div className="hero-section-badge__container">
                        {
                            this.state.linkToMyOtherSocialMedia.map((item: any) => (
                                <a href={item.link} className="hero-section-badge__link" target="_blank">
                                    <img src={item.imageSrc} alt={item.name} />
                                </a>
                            ))
                        }
                    </div>
                </LandingPageCard>
            </div>
        );
    }
}

export default HeroSection;
