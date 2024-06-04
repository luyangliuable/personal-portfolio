import React, { useMemo } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import IHeroProps from "./Interface/IHeroProps";
import CodingCat from "../CodingCat/CodingCat";
import Button from "../Button/Button";
import LandingPageCard from "../LandingPageCard/LandingPageCard";
import SequentialRiseSpan from "../Atoms/SequentialRiseSpan/SequentialRiseSpan";
import "./HeroSection.css";

const HeroSection: React.FC<IHeroProps> = ({ scrolling }) => {
    const mainHeading: string = "Hi There, I am Luyang.";

    const introduction: JSX.Element = (
        <SequentialRiseSpan calculationAdjustment={1.07} minNumberOfLettersPerLine={48} maxNumberOfLettersPerLine={70}>
            A novice software engineer, dog lover and fitness ethusiast who enjoys cooking, experimenting, eager to embrace life’s adventures and form meaningful connections with like-minded people!
        </SequentialRiseSpan>
    );

    const connections: any = [{
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
    }]

    const footer = useMemo(() => {
        return (
            <footer className="hero-section-badge__container flex justify-center items-center w-full">
                {connections.map(
                    (item: any, index: number) => (
                        <a key={index} href={item.link} className="hero-section-badge__link" target="_blank" rel="noopener noreferrer" >
                            <img src={item.imageSrc} alt={item.name} />
                        </a>
                    )
                )}
            </footer>
        );
    }, [connections]);

    const heroSectionContentLeft = useMemo(() => {
        return (
            <section className="hero-section__content__left">
                <header className="self-start">
                    <SequentialRiseSpan elementType="h1" className="hero-section__heading" minNumberOfLettersPerLine={40}>
                        {mainHeading}
                    </SequentialRiseSpan>
                </header>
                <div className="hero-section__content__left__text position-relative">{introduction}</div>
                <div className="flex flex-row mt-10 justify-start self-start">
                    <Button to="/digital_chronicles/blogs">See my Blogs <AiOutlineArrowRight /></Button>
                    <Button to="/projects/code">See my Projects <AiOutlineArrowRight /></Button>
                </div>
            </section>
        );
    }, [mainHeading, introduction]);

    return (
        <section className="hero-section__wrapper">
            <LandingPageCard className="hero-section" landingPageCardType="fitContent" >
                <div className="space h-28"></div>
                <section className="hero-section__content">
                    <section className="hero-section__content__right">
                        <CodingCat showAnimation={scrolling} />
                    </section>
                    {heroSectionContentLeft}
                </section>
                {footer}
            </LandingPageCard>
        </section>
    );
}

export default HeroSection;
