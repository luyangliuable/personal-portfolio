import { Component, createRef } from 'react';
import IExperienceSectionProps from "./Interface/IExperienceSectionProps";
import { IExperienceSectionState, ExperienceSectionItem } from './Interface/IExperienceSectionState';
import { isCenterAlignedWithViewport, getHTMLElementCenterYPosition } from "../Utility/ScrollUtility";
import ExperienceSectionEvent from "./ExperienceSectionEvent/ExperienceSectionEvent";

import "./ExperienceSection.css";

import madPattiesSunset from "../../assets/photos/scenicMemories/madPattiesSunset.jpg";
import teddieTheDog from "../../assets/photos/scenicMemories/teddieTheDog.jpg";
import camberwellSunset from "../../assets/photos/scenicMemories/camberwellSunset.jpg";
import enrouteToCamberwell from "../../assets/photos/scenicMemories/enrouteToCamberwell.jpg";
import sunsetAtThePark from "../../assets/photos/scenicMemories/sunsetAtThePark.jpg";
import beachMyFamilyVistsOften from "../../assets/photos/scenicMemories/beachMyFamilyVistsOften.jpg";


class ExperienceSection extends Component<IExperienceSectionProps, IExperienceSectionState> {
    experienceSectionParentRef = createRef<HTMLDivElement>();
    experienceSectionRef = createRef<HTMLDivElement>();
    experienceSectionContentRef = createRef<HTMLDivElement>();

    constructor(props: IExperienceSectionProps) {
        super(props);

        this.state = {
            lockPosition: null,
            unlockPosition: null,
            fallBackLockPosition: 1.5 * window.innerHeight + 200,
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
                    cardDetailedText: "A sunset silhouettes a distant cityscape beneath a radiant sky, framed by the gentle foliage of Camberwell.",
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
                            url: "https://media.licdn.com/dms/image/C560BAQEdvzZMUGZKJw/company-logo_200_200/0/1603077144281?e=2147483647&v=beta&t=4WMjvRe0GWGQOTH8m4o59cIDL1wWCGflYwochdR7E-w"
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

        };
    }

    /**
     * Lifecycle method invoked after the component is mounted.
     * Calls methods to update the timeline length and the fallback position where the component will lock.
     */
    componentDidMount(): void {
        this.updateTimelineLength();
        /* this.updateFallBackComponentWillLockPosition(); */
    }

    /**
     * Updates the fallback lock position.
     * This position is set if the user scrolls past the timeline.
     */
    updateFallBackComponentWillLockPosition(): void {
        if (this.experienceSectionRef.current) {
            const navbarHeight = document.querySelector(".navbar")?.getBoundingClientRect().height || 0;
            this.setState({
                fallBackLockPosition: getHTMLElementCenterYPosition(this.experienceSectionRef.current!, navbarHeight)
            });
        }
    }

    /**
     * Adjusts the timeline length.
     * Sets the height of the parent div to the length of the timeline to position the next section correctly.
     */
    updateTimelineLength(): void {
        const offset = 0;
        const length = this.experienceSectionContentRef.current!.getBoundingClientRect().width + offset;
        this.experienceSectionParentRef.current!.parentElement.parentElement.style.height = `${length + length / 8}px`;
        this.setState({ timeLineLength: length });
    }

    /**
     * Locks the position of the component.
     */
    lockPosition(): void {
        const isNotPastUnlockPosition = this.props.scrolled < this.state.unlockPosition || this.state.unlockPosition === null

        if (isNotPastUnlockPosition) {
            this.setState({ isLocked: true });
            this.updateLockPosition();
        }
    }

    /**
     * Updates the component's lock position state.
     */
    updateLockPosition(): void {
        if (this.state.lockPosition === null) {
            console.log(this.props.scrolled);
            this.setState({ lockPosition: this.props.scrolled });
        }
    }

    /**
     * Unlocks the position of the component and resets the timeline scroll.
     */
    unlockPosition(): void {
        if (this.isLocked()) {
            this.setState({ isLocked: false });
            this.scrollTimeline(0);
        }
    }

    /**
     * Scrolls the timeline by the given amount.
     * @param {number} scrollXAmount - Amount to scroll in the x-direction.
     */
    scrollTimeline(scrollXAmount: number): void {
        const transformValue = `translate(${scrollXAmount}px, 0)`;
        this.experienceSectionContentRef.current!.style.transform = transformValue;
        this.experienceSectionContentRef.current!.style.webkitTransform = transformValue;
    }

    /**
     * Determines if the component's position is locked.
     * @return {boolean} True if locked, false otherwise.
     */
    isLocked(): boolean {
        /* return this.experienceSectionParentRef.current!.parentElement.classList.contains("fixed"); */
        return this.state.isLocked;
    }

    /**
     * Gets the component's lock position or defaults to the fallback lock position.
     * @return {number} The lock position.
     */
    getLockPosition(): number {
        return this.state.lockPosition ?? this.state.fallBackLockPosition;
    }

    /**
     * Lifecycle method invoked after the component updates.
     * Locks or unlocks the position based on the scroll position.
     * @param {IExperienceSectionProps} prevProps - The previous props.
     */
    componentDidUpdate(prevProps: IExperienceSectionProps): void {
        const { scrolled } = this.props;

        if (scrolled !== prevProps.scrolled) {
            const proximityYToLockPosition = 110;

            if (isCenterAlignedWithViewport(this.experienceSectionParentRef.current!) < proximityYToLockPosition) {
                this.lockPosition();
            }

            if (this.isLocked()) {
                this.scrollTimeline(this.getLockPosition() - scrolled);
            }

            // Check for conditions to unlock position
            if (this.shouldUnlockPosition(proximityYToLockPosition)) {
                this.unlockPosition();
            }
        }
    }

    /**
     * Checks if the component should unlock its position based on multiple criteria.
     * @returns {boolean} - Returns true if the position should be unlocked.
     */
    private shouldUnlockPosition(proximityYToLockUnlockPosition: number): boolean {
        const isBeforeLockPosition = this.props.scrolled < this.getLockPosition();

        // TODO check if it is past timelime and show a default overlay when locked
        // const isPastTimelineLength = this.isLocked() && this.props.scrolled - this.getLockPosition() > this.state.timeLineLength;

        return isBeforeLockPosition;
    }


    render() {
        const sortedItems = this.state.items.sort((a: ExperienceSectionItem, b: ExperienceSectionItem) => {
            return parseInt(b.dateTime) - parseInt(a.dateTime)
        });

        return (
            <div className="landing-page-card experience-section-parent-container">
                <div ref={this.experienceSectionParentRef}>
                    <h1 style={{ marginLeft: "2vw" }}>Retrospective</h1>
                    <div ref={this.experienceSectionRef} className="experience-section-container" >
                        <div ref={this.experienceSectionContentRef} className="experience-section-content-container" style={{ transform: "translate(0px, 0px)" }}>
                            <div className="timeline-line" />
                            {
                                sortedItems.map((item, idx) => (
                                    <ExperienceSectionEvent key={idx} item={item} index={idx} />
                                ))
                            }
                        </div>
                        <div className="experience-section-timeline-line" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExperienceSection;
