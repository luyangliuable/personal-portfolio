import React, { Component, createRef, RefObject } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import IHeroState from "./Interface/IHeroState";
import IHeroProps from "./Interface/IHeroProps";
import CodingCat from "../CodingCat/CodingCat";
import Button from "../Button/Button";
import LandingPageCard from "../LandingPageCard/LandingPageCard";
import SequentialRiseSpan from "../Atoms/SequentialRiseSpan/SequentialRiseSpan";

import "./HeroSection.css";

class HeroSection extends Component<IHeroProps, IHeroState> {
    heroSectionText: React.RefObject<HTMLDivElement>;
    contentInterval: any;

    constructor(props: IHeroProps) {
        super(props);
        this.heroSectionText = createRef();
        this.state = {
            backgrounds: [],
            introduction: (
                <SequentialRiseSpan calculationAdjustment={1.07} minNumberOfLettersPerLine={48} maxNumberOfLettersPerLine={70}>
                    Passionate software engineer with expertise in web/mobile development, machine learning, and efficient time management with over 2 years of full-time industry experience.
                </SequentialRiseSpan>
            ),
            mainContent: {
                heading: "Hi There, I am Luyang.",
                itemsToShow: [],
                items: [
                    "🔭 I’m currently working on a personal profile website.",
                    "🌱 I’m currently learning mlops and cybersecurity out of interest.",
                    "👯 I’m looking to collaborate on building a start up.",
                    "🤔 I’m looking for people to talk to about programming.",
                ],
            },
            linkToMyOtherSocialMedia: [
                {
                    name: "Notion",
                    link: "https://luyangl.notion.site/luyangl/71be1ff365c44fd2b4f6f8dce14b7536?v=f1e55d08878e4bfda1b744e76b9480c7",
                    imageSrc:
                        "https://img.shields.io/badge/notion-%2312100E.svg?&style=for-the-badge&logo=notion&logoColor=%23333&color=%239e9e9e",
                },
                {
                    name: "Email",
                    link: "mailto:luyang.l@protonmail.me",
                    imageSrc:
                        "https://img.shields.io/badge/email-%2312100E.svg?&style=for-the-badge&logo=protonmail&logoColor=white&color=black",
                },
                {
                    name: "GitHub",
                    link: "https://github.com/luyangliuable",
                    imageSrc:
                        "https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=black",
                },
                {
                    name: "LinkedIn",
                    link: "https://www.linkedin.com/in/luyang-l",
                    imageSrc:
                        "https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white",
                },
                {
                    name: "Codecademy",
                    link: "https://www.codecademy.com/profiles/luyangliuable",
                    imageSrc:
                        "https://img.shields.io/badge/codecademy-%2312100E.svg?&style=for-the-badge&logo=codecademy&logoColor=white&color=black",
                },
            ],
        };
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
                            this.state.mainContent.items[contentIndex],
                        ],
                    },
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

    wrapTextLinesInSpans(element: HTMLElement): void {
        if (!element) return;
        Array.from(element.childNodes).forEach(child => {
            if (child.nodeType !== Node.TEXT_NODE) {
                element.removeChild(child);
            }
        });
        const words = element.textContent?.split(' ') || [];
        element.textContent = ''; // Clear the element
        let currentLine = document.createElement('span');
        element.appendChild(currentLine);
        words.forEach(word => {
            const testLine = currentLine.cloneNode(true) as HTMLSpanElement;
            testLine.textContent += `${word} `;
            element.appendChild(testLine);
            if (testLine.offsetWidth > element.offsetWidth) {
                currentLine = document.createElement('span');
                currentLine.textContent = `${word} `;
                element.appendChild(currentLine);
            } else {
                currentLine.textContent = testLine.textContent;
            }
            element.removeChild(testLine);
        });
    }


    render(): any {
        const heroSectionState = this.state;

        return (
            <section className="hero-section__wrapper">
                <LandingPageCard className="hero-section" landingPageCardType="fitContent" >
                    <div className="space h-28"></div>
                    <section className="hero-section__content">
                        <section className="hero-section__content__right">
                            <CodingCat showAnimtion={this.props.scrolling} />
                        </section>
                        <section className="hero-section__content__left">
                            <header className="self-start">
                                <SequentialRiseSpan elementType="h1" className="hero-section__heading" minNumberOfLettersPerLine={40}>
                                    {heroSectionState.mainContent.heading}
                                </SequentialRiseSpan>
                            </header>
                            <div ref={this.heroSectionText} className="hero-section__content__left__text position-relative">{heroSectionState.introduction}</div>
                            <div className="flex flex-row mt-10 justify-start self-start">
                                <Button to="/digital_chronicles/blogs">See my Blogs <AiOutlineArrowRight /></Button>
                                <Button to="/projects/code">See my Projects <AiOutlineArrowRight /></Button>
                            </div>
                        </section>
                    </section>
                    <footer className="hero-section-badge__container flex justify-center items-center w-full">
                        {heroSectionState.linkToMyOtherSocialMedia.map(
                            (item: any, index: number) => (
                                <a key={index} href={item.link} className="hero-section-badge__link" target="_blank" rel="noopener noreferrer" >
                                    <img src={item.imageSrc} alt={item.name} />
                                </a>
                            )
                        )}
                    </footer>
                </LandingPageCard>
            </section>
        );
    }
}

export default HeroSection;
