import React, { Component } from "react";
import "./HardwareProjectsPage.css";
import Gallery from "../../components/Gallery/Gallery";
import IHardwareProjectsPageState from "./Interface/IHardwareProjectsPageState";
import IHeroHeaderProps from "../../components/HeroHeader/Interface/IHeroHeaderProps";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import { GalleryItem } from "../../components/Gallery/Interface/IGalleryProps";

const HardwareProjectsPage: React.FC<{}> = () => {
    const heroHeaderContent = Object.freeze({
        heading: "Hardware Projects",
        description: "I used these hardware components and my arduino for past competitions and also my personal projects. I will release the videos of the projects here soon as well."
    }); // as const

    const content: GalleryItem[] = [
        {
            name: "Arduino mega",
            description: "Harnessing creativity in a compact circuit, my Arduino Mega survived where its predecessor met a fiery end with a rogue laptop charger.",
            image: "https://llcode.tech/api/image/65052756f9b642fb30be599d"
        },
        {
            name: "",
            description: "I used this Raspberry Pi for commanding home devices and blocking ads by using Pi-hole. A real tech charm!",
            image: "https://llcode.tech/api/image/6505281ef9b642fb30be599e"
        },
        {
            name: "rgb controller",
            description: "",
            image: "https://llcode.tech/api/image/65052952f9b642fb30be599f"
        },
        {
            name: "light sensor",
            description: "",
            image: "https://llcode.tech/api/image/650529b6f9b642fb30be59a0"
        },
        {
            name: "bread board",
            description: "Why don't breadboards ever become musicians? Because they're always losing their connections!",
            image: "https://llcode.tech/api/image/65052a6af9b642fb30be59a1"
        }
    ]

    const { heading, description } = heroHeaderContent;

    return (
        <main>
            <HeroHeader heading={heading} description={description} />
            <Gallery heading="3D Hardware that I Use for My Projects" content={content} />
        </main>
    );
}

export default React.memo(HardwareProjectsPage);
