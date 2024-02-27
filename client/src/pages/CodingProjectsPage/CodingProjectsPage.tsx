import React, { Component } from "react";
import "./CodingProjectsPage.css";
import Gallery from "../../components/Gallery/Gallery";
import IHeroHeaderProps from "../../components/HeroHeader/Interface/IHeroHeaderProps";
import ICodingCatState from "../../components/CodingCat/Interface/ICodingCatState";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import { GalleryItem } from "../../components/Gallery/Interface/IGalleryProps";

type CodingProjects = {
    projectsICreated: GalleryItem[],
    projectsWithContributions: GalleryItem[]
}

const CodingProjectsPage: React.FC<{}> = () => {
    const heroHeaderContent = Object.freeze({
        heading: "Coding Projects",
        description: "My coding projects outside of work that are either from uni, self-interest or for fun."
    }); // as const

    const projects: CodingProjects = {
        projectsICreated: [
            {
                name: "MoodDiaries (Coming Soon To This Site!)",
                description: "Mood tracker app",
                image: "https://llcode.tech/api/image/65053681f9b642fb30be59a4",
                link: "https://github.com/luyangliuable/MoodMesh",
                tags: ["Electron", "NextJS", "Typescript", "CSS", "IndexDB", "MongodDB", "Rust"]
            },
            {
                name: "Personal Website",
                description: "My personal website showcasing details about myself, my skils and my dog.",
                image: "https://llcode.tech/api/image/650532f2f9b642fb30be59a3",
                tags: ["React", "CSS", "Typescript", "MongoDB", "Rust"]
            },
            {
                name: "Project Aesop",
                description: "A mobile application to deliver social stories in a way that reduces maladaptive behaviours and enhances the psychosocial wellbeing of paediatric patients.",
                image: "https://llcode.tech/api/image/65053cb4f9b642fb30be59a7",
                link: "https://github.com/luyangliuable/project-aseop",
                tags: ["React Native", "Javascript", "CSS"]
            },
            {
                name: "Lexicon",
                description: "Lexicon is Australia's first medical search engine. This platform enables clinicians to take more efficient and effective decisions by allowing them a quick and an easy access to medical tools and documents.",
                image: "https://llcode.tech/api/image/65053754f9b642fb30be59a5",
                link: "https://github.com/luyangliuable/Lexicon",
                tags: ["NextJS", "ExpressJS", "AWS EC2"]
            },
            {
                name: "Weather Booking App",
                description: "App that invites user to engage with the climate by booking for a day and predicted weather by using a range of meteorological data.",
                image: "https://llcode.tech/api/image/650539f6f9b642fb30be59a6",
                link: "https://github.com/weather-booking-app",
                tags: ["React", "Ionic", "Django", "CSS"]
            },
            {
                name: "Usability Accessibility Testing App",
                description: "This application was built as a toolkit that would allow for the automatic testing of usability and accessibility of target Android apps. The purpose of this project is to allow developers to further improve their applications by addressing possible accessibility and usability flaws. This application utilises algorithms from previous research projects, some with initial source code and prototypes, and integrates them for more detailed output.",
                image: "https://llcode.tech/api/image/65052edef9b642fb30be59a2",
                link: "https://github.com/luyangliuable/Usability-Accessibility-Testing-App",
                tags: ["React", "Flask", "MongoDB"]
            },
            {
                name: "Luyangliuable Emacs Lite",
                description: "This is a lightweight Emacs configuration that provides essential functionality with a minimal setup. It includes packages for Evil mode, Treemacs, Which Key, and some custom keybindings.",
                image: "https://llcode.tech/api/image/65053d94f9b642fb30be59a8",
                link: "https://github.com/luyangliuable/luyangliuable-emacs-lite",
                tags: ["Emacs Lisp"]
            },
        ],
        projectsWithContributions: [
            {
                name: "Spacemacs",
                description: "A community-driven Emacs distribution The best editor is neither Emacs nor Vim, it's Emacs and Vim! ",
                image: "https://www.spacemacs.org/img/logo.svg",
                tags: ["Emacs Lisp"]
            }
        ]
    };

    const { heading, description } = heroHeaderContent;

    return (
        <main>
            <HeroHeader heading={heading} description={description} />
            <Gallery heading="Noteworthy Coding Projects" content={projects.projectsICreated} />
            <Gallery heading="Coding Projects that I Have Contributed to" content={projects.projectsWithContributions} />
        </main>
    );
}

export default React.memo(CodingProjectsPage);
