import React, { useState } from "react";
import LandingPageCard from "../LandingPageCard/LandingPageCard";

interface IConnectWithMeSectionState {
}

const ConnectWithMeSection: React.FC = () => {

    const linksToMyOtherSocialMedia = [
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
    ]

    return (
        <LandingPageCard
            heading="Connect with Me"
            className="connect-with-me-section"
            landingPageCardType="fitContent">

            {
                linksToMyOtherSocialMedia.map(
                    (item: any, index: number) => (
                        <a key={index} href={item.link} className="hero-section-badge__link" target="_blank" rel="noopener noreferrer" >
                            <img src={item.imageSrc} alt={item.name} />
                        </a>
                    )
                )
            }
        </LandingPageCard>
    )
}

export default ConnectWithMeSection;
