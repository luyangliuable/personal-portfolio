import React, { Component, createRef, useReducer, useCallback, useRef, useState, useEffect } from 'react';
import IExperienceSectionProps from "./Interface/IExperienceSectionProps";
import { IExperienceSectionState, ExperienceSectionItem } from './Interface/IExperienceSectionState';
import { isCenterAlignedWithViewport } from "../Utility/ScrollUtility";
import ExperienceSectionEvent from "./ExperienceSectionEvent/ExperienceSectionEvent";
import ExperienceSectionImageDisplay from "./ExperienceSectionImageDisplay/ExperienceSectionImageDisplay";

import "./ExperienceSection.css";

import madPattiesSunset from "../../assets/photos/scenicMemories/madPattiesSunset.jpg";
import teddieTheDog from "../../assets/photos/scenicMemories/teddieTheDog.jpg";
import camberwellSunset from "../../assets/photos/scenicMemories/camberwellSunset.jpg";
import enrouteToCamberwell from "../../assets/photos/scenicMemories/enrouteToCamberwell.jpg";
import sunsetAtThePark from "../../assets/photos/scenicMemories/sunsetAtThePark.jpg";
import beachMyFamilyVistsOften from "../../assets/photos/scenicMemories/beachMyFamilyVistsOften.jpg";


const ExperienceSection: React.FC<IExperienceSectionProps> = ({ scrolled }) => {
    const experienceSectionParentRef = useRef<HTMLDivElement | null>(null);
    const experienceSectionRef = useRef<HTMLElement | null>(null);
    const experienceSectionScrollRef = useRef<HTMLDivElement | null>(null);
    const timeLineRef = useRef<HTMLDivElement | null>(null);

    const [isMounted, toggle] = useReducer((p) => !p, true);

    const [state, setState] = useState<IExperienceSectionState>({
        unlockPosition: null,
        isLocked: false,
        items: [
            {
                dateTime: "2023",
                cardTitle: "",
                location: "-24.997805, 172.478887",
                url: "",
                cardSubtitle: "",
                cardDetailedText: "Last sunset captured onboard the princess cruise voyage.",
                importance: 1,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "http://llcode.tech/api/image/65920a4af1f0fe657dc4683b"
                    }
                }
            },
            {
                dateTime: "2024",
                cardTitle: "Commbank",
                url: "https://www.linkedin.com/company/sonorus-au/",
                cardSubtitle: "Software Engineer",
                cardDetailedText: "",
                importance: 1,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg"
                    }
                }
            }, {
                dateTime: "2023",
                cardTitle: "Sonorous",
                url: "https://www.linkedin.com/company/sonorus-au/",
                cardSubtitle: "ML Engineer",
                cardDetailedText: "",
                importance: 1,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "http://llcode.tech/api/image/65920366f1f0fe657dc46839"
                    }
                }
            }, {
                dateTime: "2023",
                cardTitle: "",
                location: "-37.830474, 145.058351",
                url: "",
                cardSubtitle: "",
                cardDetailedText: "A sunset silhouettes a distant cityscape in Camberwell.",
                importance: 1,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "http://llcode.tech/api/image/65920b85f1f0fe657dc4683c"
                    }
                }
            }, {
                dateTime: "2021",
                cardTitle: "",
                location: "Brighton Beach, Victoria Park, Vic, Australia",
                url: "",
                cardSubtitle: "",
                cardDetailedText: "",
                importance: 1,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: beachMyFamilyVistsOften
                    }
                }
            },
            {
                dateTime: "2022",
                cardTitle: "",
                url: "",
                cardSubtitle: "",
                location: "-37.902488, 145.164690",
                cardDetailedText: "In the park where I habitually strolled with Teddie post-work or studies, the sunset painted serene silences. ",
                importance: 1,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: sunsetAtThePark
                    }
                }
            },
            {
                dateTime: "2020",
                cardTitle: "",
                url: "",
                cardSubtitle: "",
                cardDetailedText: "This photo was captured on 2020.",
                importance: 1,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: enrouteToCamberwell
                    }
                }
            },
            {
                dateTime: "2022",
                cardTitle: "",
                url: "",
                cardSubtitle: "",
                location: "-37.829423, 145.058246",
                cardDetailedText: "A image I took of the sunset in Camberwell where I used to live.",
                importance: .9,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: camberwellSunset
                    }
                }
            },
            {
                dateTime: "2016",
                cardTitle: "",
                url: "",
                cardSubtitle: "",
                cardDetailedText: "Teddie was born.",
                importance: 1,
                display: "IMAGE",
                media: {
                    type: "IMAGE",
                    source: {
                        url: teddieTheDog
                    }
                }
            },
            {
                dateTime: "2018",
                cardTitle: "MW Sheetmetal",
                url: "http://www.cisco.com",
                cardSubtitle: "Computer Aided Design Technician",
                cardDetailedText: "",
                importance: 0.7,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://metro.co.uk/wp-content/uploads/2016/02/poo_emoji.jpg?quality=90&strip=all&zoom=1&resize=644%2C429"
                    }
                }
            },
            {
                dateTime: "2021",
                cardTitle: "",
                url: "",
                cardSubtitle: "",
                location: "-37.790968, 145.172341",
                cardDetailedText: "I captured this serene view at Mad Patties during the COVID era. Every afternoon, it greeted me, making it unforgettable. A year following my departure, the shop closed down.",
                importance: 1,
                display: "IMAGE",
                media: ({
                    type: "IMAGE",
                    source: {
                        url: madPattiesSunset
                    }
                })
            },
            {
                dateTime: "2021",
                cardTitle: "Monash University Humanwise Lab",
                url: "https://www.mymi.org.au/",
                cardSubtitle: "Started role as Summer Research Assistant",
                cardDetailedText: "",
                importance: .85,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://amsi.org.au/wp-content/uploads/2014/05/logo-monash.png"
                    }
                }
            },
            {
                dateTime: "2022",
                cardTitle: "Monash Young Medtech Innovators",
                url: "https://www.mymi.org.au/",
                cardSubtitle: "Started role as Software Engineer",
                cardDetailedText: "",
                importance: .85,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://static.wixstatic.com/media/5a7243_2d7c4a2b680749db90f073b5b601def3~mv2.png/v1/fill/w_1648,h_694,al_c/5a7243_2d7c4a2b680749db90f073b5b601def3~mv2.png"
                    }
                }
            },
            {
                dateTime: "2023",
                cardTitle: "WEX",
                url: "http://www.wex.com",
                cardSubtitle: "Software Developer",
                cardDetailedText: "",
                importance: 1,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://www.wexinc.com/wp-content/uploads/2020/03/social-share-logo.png"
                    }
                }
            }, {
                dateTime: "2021",
                cardTitle: "Mad Patties",
                url: "http://www.cisco.com",
                cardSubtitle: "Kitchen Hand",
                cardDetailedText: "",
                media: ({
                    type: "IMAGE",
                    source: {
                        url: "https://madpatties.com/wp-content/uploads/2021/05/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210511102354-150x150.png"
                    }
                })
            }, {
                dateTime: "2021",
                cardTitle: "Cisco",
                url: "http://www.cisco.com",
                cardSubtitle: "Network Engineer Intern",
                cardDetailedText: "",
                importance: 0.7,
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/440px-Cisco_logo_blue_2016.svg.png"
                    }
                }
            }
        ]
    });

    useEffect(() => {
        updateTimelineLength();
    }, []);

    useEffect(() => {
        const proximityYToLockPosition = 110;

        if (experienceSectionParentRef.current!)
            setLockPosition();

        if (isCenterAlignedWithViewport(experienceSectionParentRef.current!) < proximityYToLockPosition) {
            lockPosition();
        }

        if (state.isLocked && state.lockPosition !== undefined) {
            scrollTimeline(state.lockPosition - scrolled);
        }

        if (isBeforeLockPosition()) {
            unlockPosition();
        }

        /* if (isAfterFinishScrolling()) {
*     unlockPosition();
* } */

    }, [scrolled]);

    const updateTimelineLength = (): void => {
        const offset = 10;
        const timeLineLength = experienceSectionScrollRef.current!.getBoundingClientRect().width + offset;
        const targetElement = experienceSectionParentRef.current?.parentElement;

        if (targetElement) {
            targetElement.style.height = `${timeLineLength + timeLineLength / 8}px`;
        }

        setState({
            ...state,
            timeLineLength: timeLineLength
        });
    }

    const lockPosition = (): void => {
        if (scrolled !== undefined) {
            const isNotPastUnlockPosition = state.unlockPosition === null || scrolled < state.unlockPosition

            if (isNotPastUnlockPosition) {
                setState({
                    ...state,
                    isLocked: true
                });
            }
        }
    }

    const setLockPosition = () => {
        const currentPosition = experienceSectionParentRef.current!.parentElement!.getBoundingClientRect().top + scrolled;

        if (!state.isLocked && state.lockPosition !== currentPosition) {
            setState({
                ...state,
                lockPosition: currentPosition
            });
        }
    }

    const unlockPosition = (): void => {
        if (state.isLocked) {
            setState({
                ...state,
                isLocked: false
            });
            scrollTimeline(0);
        }
    }

    const scrollTimeline = (scrollXAmount: number): void => {
        if (state.isLocked) {
            const transformValue = `translate(${scrollXAmount}px, 0)`;
            experienceSectionScrollRef.current!.style.transform = transformValue;
        }
    }

    const isBeforeLockPosition = (): boolean => {
        const { lockPosition } = state;
        const isBeforeLockPosition = scrolled !== undefined && lockPosition !== undefined && scrolled < lockPosition;
        return isBeforeLockPosition;
    }

    const sortedItems = state.items.sort((a: ExperienceSectionItem, b: ExperienceSectionItem) => {
        return parseInt(b.dateTime) - parseInt(a.dateTime)
    });

    if (isMounted)
        return (
            <article className="landing-page-card flex flex-col justify-start overflow-hidden experience-section-parent-container" ref={experienceSectionParentRef}>
                <header className="ml-2vw"><h2>Retrospective</h2></header>
                <section ref={experienceSectionRef} className="experience-section" >

                    {/* Scrolling timeline within the section */}
                    <div ref={experienceSectionScrollRef} className="experience-section--content">
                        <div className="timeline__line flex flex-row items-center" ref={timeLineRef} >
                            {
                                sortedItems.map((item, idx) => {
                                    if (item.display !== undefined) {
                                        return (
                                            <ExperienceSectionImageDisplay key={idx} item={item} index={idx} />
                                        );
                                    }
                                    return (
                                        <ExperienceSectionEvent timeLineRef={timeLineRef} key={idx} item={item} index={idx} />
                                    );
                                })
                            }
                        </div>
                    </div>

                </section>
            </article>
        );
}

export default ExperienceSection;
