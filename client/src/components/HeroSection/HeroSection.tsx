import { Component } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai";
import IHeroState from "./Interface/IHeroState";
import IHeroProps from "./Interface/IHeroProps";
import CodingCat from "../CodingCat/CodingCat";
import Button from "../Button/Button";
import LandingPageCard from "../LandingPageCard/LandingPageCard";
import Waves from "../Waves/Waves";

import './HeroSection.css';


class HeroSection extends Component<IHeroProps, IHeroState> {
    contentInterval: any;

    constructor(props: IHeroProps) {
        super(props);
        this.state = {
            backgrounds: [],
            introduction: (<>I am a motivated software engineering grad with a <span className="fancy-underline">diverse array of skills</span> and experiences, ranging from web and mobile app development to machine learning research. I pride myself on my efficient <span className="fancy-underline">time management abilities</span> and my aptitude for <span className="fancy-underline">continuous learning.</span></>),
            mainContent: {
                heading: "Hi There 👋. I am Luyang!",
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
                    "link": "https://luyangl.notion.site/luyangl/71be1ff365c44fd2b4f6f8dce14b7536?v=f1e55d08878e4bfda1b744e76b9480c7",
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
        const heroSectionState = this.state;

        return (
            <div className="hero-section__wrapper">
                <LandingPageCard
                    className="hero-section"
                    landingPageCardType="fitContent">
                    <Waves />
                    <div className="hero-section__content">
                        <div className="hero-section__content__left">
                            <h1>{heroSectionState.mainContent.heading}</h1>
                            <p className="hero-section__content__left__text">{heroSectionState.introduction}</p>
                { heroSectionState.mainContent.items.map((item: string, index: number) => (<p key={index} className="hero-section__content__left__text hero-section__text_small" style={{ margin: "2px" }}>{item}</p>)) }
                            <div className="flex flex-row mt-5 justify-start">
                                <Button to="/digital_chronicles/blogs">See my Blogs <AiOutlineArrowRight /></Button>
                                <Button to="/projects/code">See my Projects <AiOutlineArrowRight /></Button>
                            </div>
                        </div>
                        <div className="hero-section__background__wrapper">{heroSectionState.backgrounds}</div>
                        <div className="hero-section__content__right"><CodingCat showAnimtion={this.props.scrolling} /></div>
                    </div>
                    <div className="hero-section-badge__container">
                        {
                            heroSectionState.linkToMyOtherSocialMedia.map((item: any, index: number) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="hero-section-badge__link"
                                    target="_blank"
                                    rel="noopener noreferrer">
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
