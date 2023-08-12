import React from 'react';
/* import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'; */
import { Component, JSXElementConstructor } from 'react';
import { Chrono } from "react-chrono";
import IExperienceSectionState from './Interface/IExperienceSectionState';


class ExperienceSection extends Component<{}, IExperienceSectionState<any, JSXElementConstructor<any>>> {
    constructor(props: {}) {
        super(props);

        this.state = {
            items: [{
                title: "2018",
                cardTitle: "MW Sheetmetal",
                url: "http://www.cisco.com",
                cardSubtitle: "Computer Aided Design Technician",
                cardDetailedText: "",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://media.licdn.com/dms/image/C560BAQEdvzZMUGZKJw/company-logo_200_200/0/1603077144281?e=2147483647&v=beta&t=4WMjvRe0GWGQOTH8m4o59cIDL1wWCGflYwochdR7E-w"
                    }
                }
            }, {
                title: "2020",
                cardTitle: "Cisco",
                url: "http://www.cisco.com",
                cardSubtitle: "Network Engineer Intern",
                cardDetailedText: "",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://pbs.twimg.com/profile_images/1580961507566751744/2pydn4GY_400x400.jpg"
                    }
                }
            }, {
                title: "2021",
                cardTitle: "Mad Patties",
                url: "http://www.cisco.com",
                cardSubtitle: "Kitchen Hand",
                cardDetailedText: "",
                media: {
                    type: "IMAGE",
                    source: {
                        url: ""
                    }
                }
            }, {
                title: "2022",
                cardTitle: "Monash Young Medtech Innovators",
                url: "https://www.mymi.org.au/",
                cardSubtitle: "Software Engineer",
                cardDetailedText: "",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://static.wixstatic.com/media/5a7243_2d7c4a2b680749db90f073b5b601def3~mv2.png/v1/fill/w_1648,h_694,al_c/5a7243_2d7c4a2b680749db90f073b5b601def3~mv2.png"
                    }
                }
            }, {
                title: "2023",
                cardTitle: "WEX",
                url: "http://www.wex.com",
                cardSubtitle: "Software Development Intern",
                cardDetailedText: "",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://www.wexinc.com/wp-content/uploads/2020/03/social-share-logo.png"
                    }
                }
            }
            ]
        };
    }

    render() {
        return (
            <>
                <div style={{ textAlign: "left", marginLeft: "2vw" }}>
                    <h1>My Experiences</h1>
                    <div style={{ width: "80vw" }}>
                        <Chrono theme={{
                            primary: "#000",
                            secondary: "#FFF",
                            cardBgColor: "#EEE"
                        }}
                            timelinePointDimension={30}
                            scrollable={{ scrollbar: true }}
                            hideControls={true} items={this.state.items}
                            mediaSettings={{ align: 'right' }}
                            mode="VERTICAL_ALTERNATING"
                            enableOutline slideShow >

                            <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=blac" alt="image1" />
                            <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=blac" alt="image1" />
                            <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=blac" alt="image1" />
                            <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=blac" alt="image1" />
                            <img src="https://img.shields.io/badge/github-%2312100E.svg?&style=for-the-badge&logo=github&logoColor=white&color=blac" alt="image1" />
                        </Chrono>
                    </div>

                </div>
            </>
        );
    }
}

export default ExperienceSection;
