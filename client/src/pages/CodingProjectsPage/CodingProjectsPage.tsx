import { Component } from "react";
import "./CodingProjectsPage.css";
import Gallery from "../../components/Gallery/Gallery";
import ICodingCatState from "../../components/CodingCat/Interface/ICodingCatState";

class CodingProjectsPage extends Component<{}, ICodingCatState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            projectsICreated: [
                {
                    name: "MoodMesh (Coming Soon To This Site!)",
                    description: "Mood tracker app",
                    image: "http://llcode.tech/api/image/65053681f9b642fb30be59a4",
                    link: "https://github.com/luyangliuable/MoodMesh"
                },
                {
                    name: "Personal Website",
                    description: "My personal website showcasing details about myself, my skils and my dog.",
                    image: "http://llcode.tech/api/image/650532f2f9b642fb30be59a3"
                },
                {
                    name: "Project Aesop",
                    description: "A mobile application to deliver social stories in a way that reduces maladaptive behaviours and enhances the psychosocial wellbeing of paediatric patients.",
                    image: "http://llcode.tech/api/image/65053cb4f9b642fb30be59a7",
                    link: "https://github.com/luyangliuable/project-aseop"
                },
                {
                    name: "Lexicon",
                    description: "Lexicon is Australia's first medical search engine. This platform enables clinicians to take more efficient and effective decisions by allowing them a quick and an easy access to medical tools and documents.",
                    image: "http://llcode.tech/api/image/65053754f9b642fb30be59a5",
                    link: "https://github.com/luyangliuable/Lexicon"
                },
                {
                    name: "Weather Booking App",
                    description: "App that invites user to engage with the climate like never before. Utilizing a range of meteorological data, you're tasked with predicting weather patterns for future dates. It's more than a guessing game; it's a platform where knowledge meets intuition. Sharpen your forecasting skills, learn about weather trends, and immerse yourself in the dynamic world of meteorology. Your journey into the captivating realm of weather prediction begins here. ",
                    image: "http://llcode.tech/api/image/650539f6f9b642fb30be59a6",
                    link: "https://github.com/weather-booking-app"
                },
                {
                    name: "Usability Accessibility Testing App",
                    description: "This application was built as a toolkit that would allow for the automatic testing of usability and accessibility of target Android apps. The purpose of this project is to allow developers to further improve their applications by addressing possible accessibility and usability flaws. This application utilises algorithms from previous research projects, some with initial source code and prototypes, and integrates them for more detailed output.",
                    image: "http://llcode.tech/api/image/65052edef9b642fb30be59a2",
                    link: "https://github.com/luyangliuable/Usability-Accessibility-Testing-App",
                    islogo: true
                },
                {
                    name: "Luyangliuable Emacs Lite",
                    description: "This is a lightweight Emacs configuration that provides essential functionality with a minimal setup. It includes packages for Evil mode, Treemacs, Which Key, and some custom keybindings. This editor is as lightweight and minimalistic as possible by sticking as close to the orignal emacs while providing maximum utility.",
                    image: "http://llcode.tech/api/image/65053d94f9b642fb30be59a8",
                    link: "https://github.com/luyangliuable/luyangliuable-emacs-lite",
                    islogo: true
                },
            ],
            projectsWithContributions: [
                {
                    name: "Spacemacs",
                    description: "A community-driven Emacs distribution The best editor is neither Emacs nor Vim, it's Emacs and Vim! ",
                    image: "https://www.spacemacs.org/img/logo.svg"
                }
            ]
        };
    }

    render() {
        return (
            <>
                <Gallery heading="Noteworthy Coding Projects" content={this.state.projectsICreated} />
                <Gallery heading="Coding Projects that I Have Contributed to" content={this.state.projectsWithContributions} />
            </>
        );
    }
}

export default CodingProjectsPage;
