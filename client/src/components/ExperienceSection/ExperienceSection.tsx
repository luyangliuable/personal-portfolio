import { Component, createRef } from 'react';
import IExperienceSectionProps from "./Interface/IExperienceSectionProps";
import { IExperienceSectionState, ExperienceSectionItem } from './Interface/IExperienceSectionState';
import { resetElementPosition, isCloseToAnotherElement, isCenterAlignedWithViewport, getHTMLElementCenterYPosition } from "../Utility/ScrollUtility";
import { cardGradientEffect } from "../Utility/MouseUtility";
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
            fallBackLockPosition: null,
            isLocked: false,
            items: [
                {
                    dateTime: "2021",
                    cardTitle: "",
                    url: "",
                    cardSubtitle: "",
                    cardDetailedText: "Every week, my family and I would journey to our favorite beach, drawn by the allure of the sunset and the embrace of the fresh breeze.",
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
                    cardDetailedText: "Driving my sister home along the Monash freeway from school, I once witnessed a sunset that made me cherish life anew. ",
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
                    cardDetailedText: "Teddie's arrival in my universe was akin to the birth of a radiant star. ",
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
                    dateTime: "2020",
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
                },
                {
                    dateTime: "2021",
                    cardTitle: "",
                    url: "",
                    cardSubtitle: "",
                    cardDetailedText: "I captured this serene view at Mad Patties during the COVID era. Every afternoon, it greeted me, making it unforgettable.",
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
                },
                {
                    dateTime: "2021",
                    cardTitle: "Monash University Humanwise Lab",
                    url: "https://www.mymi.org.au/",
                    cardSubtitle: "Research Assistant",
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
                    cardSubtitle: "Software Engineer",
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
                    cardSubtitle: "Software Development Intern",
                    cardDetailedText: "",
                    importance: 1,
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

    /**
     * Lifecycle method invoked after the component is mounted.
     * Calls methods to update the timeline length and the fallback position where the component will lock.
     */
    componentDidMount(): void {
        this.updateTimelineLength();
        this.updateFallBackComponentWillLockPosition();
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
            resetElementPosition(this.experienceSectionParentRef.current!.parentElement);
            this.experienceSectionParentRef.current!.parentElement.classList.add("fixed");
            this.updateLockPosition();
        }
    }

    /**
     * Updates the component's lock position state.
     */
    updateLockPosition(): void {
        if (this.state.lockPosition === null && this.state.fallBackLockPosition > this.props.scrolled) {
            this.setState({ lockPosition: this.props.scrolled });
        }
    }

    /**
     * Unlocks the position of the component and resets the timeline scroll.
     */
    unlockPosition(): void {
        if (this.isLocked()) {
            this.setState({ isLocked: false });
            // TODO set start and end position manually for every card or something because I tried everything and it is impossible
            /* makeFixedElementAbsoluteWhileRetainingPosition(this.experienceSectionParentRef.current!.parentElement, 0); */
            this.experienceSectionParentRef.current!.parentElement.classList.remove("fixed");
            /* centerElementInParent(this.experienceSectionParentRef.current!.parentElement); */
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
        return this.experienceSectionParentRef.current!.parentElement.classList.contains("fixed");
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
            const proximityYToLockPosition = 0;

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
        const classNamesToCheckProxityFor = ["landing-page-card"]
        const experienceSectionParentElement = this.experienceSectionParentRef.current!.parentElement;

        const isNearExcludedElementBottom = isCloseToAnotherElement(experienceSectionParentElement, "bottom", proximityYToLockUnlockPosition, classNamesToCheckProxityFor).length > 0;
        const isNearExcludedElementTop = isCloseToAnotherElement(experienceSectionParentElement, "top", proximityYToLockUnlockPosition, classNamesToCheckProxityFor).length > 0;

        if (isNearExcludedElementBottom) {
            this.setState({
                unlockPosition: this.props.scrolled
            });
        }

        // fallback condition to unlock position
        const isBeforeLockPosition = this.props.scrolled < this.getLockPosition();

        // fallback condition to unlock position
        const isPastTimelineLength = this.isLocked() && this.props.scrolled - this.getLockPosition() > this.state.timeLineLength;

        return isNearExcludedElementBottom || isNearExcludedElementTop || isBeforeLockPosition;
    }


    render() {
        const sortedItems = this.state.items.sort((a: ExperienceSectionItem, b: ExperienceSectionItem) => {
            return parseInt(b.dateTime) - parseInt(a.dateTime)
        });

        return (
            <div className="landing-page-card experience-section-parent-container">
                <div ref={this.experienceSectionParentRef}>
                    <h1 style={{ marginLeft: "2vw" }}>Experience</h1>
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
