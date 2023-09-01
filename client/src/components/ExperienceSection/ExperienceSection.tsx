import { Component, createRef } from 'react';
import IExperienceSectionProps from "./Interface/IExperienceSectionProps";
import { IExperienceSectionState, ExperienceSectionItem } from './Interface/IExperienceSectionState';
import { isCenterAlignedWithViewport, getHTMLElementCenterYPosition } from "../Utility/ScrollUtility";
import { cardGradientEffect } from "../Utility/MouseUtility";
import "./ExperienceSection.css";

class ExperienceSection extends Component<IExperienceSectionProps, IExperienceSectionState> {
    experienceSectionParentRef = createRef<HTMLDivElement>();
    experienceSectionRef = createRef<HTMLDivElement>();
    experienceSectionContentRef = createRef<HTMLDivElement>();

    constructor(props: IExperienceSectionProps) {
        super(props);

        this.state = {
            lockPosition: null,
            fallBackLockPosition: null,
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
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/440px-Cisco_logo_blue_2016.svg.png"
                    }
                }
            }, {
                title: "2021",
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
                title: "2022",
                cardTitle: "Monash University Humanwise Lab",
                url: "https://www.mymi.org.au/",
                cardSubtitle: "Research Assistant",
                cardDetailedText: "",
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://amsi.org.au/wp-content/uploads/2014/05/logo-monash.png"
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
        this.experienceSectionParentRef.current!.parentElement.parentElement.style.height = `${length + length / 3}px`;
        this.setState({ timeLineLength: length });
    }

    /**
     * Locks the position of the component.
     */
    lockPosition(): void {
        this.experienceSectionParentRef.current!.parentElement.classList.add("fixed");
        this.updateLockPosition();
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
        this.experienceSectionParentRef.current!.parentElement.classList.remove("fixed");
        this.scrollTimeline(0);
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
        const { timeLineLength } = this.state;

        if (scrolled !== prevProps.scrolled) {
            if (isCenterAlignedWithViewport(this.experienceSectionParentRef.current!) < 0) {
                this.lockPosition();
            } else if (scrolled < this.getLockPosition()) {
                this.unlockPosition();
            }

            if (this.isLocked()) {
                this.scrollTimeline(this.getLockPosition() - scrolled);
            }

            if (this.isLocked() && scrolled - this.getLockPosition() > timeLineLength) {
                this.unlockPosition();
            }
        }
    }

    render() {
        const items = this.state.items.sort((a: ExperienceSectionItem, b: ExperienceSectionItem) => {
            return parseInt(b.title) - parseInt(a.title)
        });
        return (
            <div className="landing-page-card experience-section-parent-container">
                <div ref={this.experienceSectionParentRef}>
                    <h1 style={{
                        marginLeft: "2vw"
                    }}>My Experiences</h1>
                    <div ref={this.experienceSectionRef} className="experience-section-container" >
                        <div ref={this.experienceSectionContentRef} className="experience-section-content-container" style={{ transform: "translate(0px, 0px)" }}>
                            {
                                items.map((item: ExperienceSectionItem, idx: number) => (
                                    <div onMouseMove={cardGradientEffect}
                                        className={`card experience-section-card ${idx % 2 === 0 ? 'above' : 'below'}`}
                                        key={idx}>
                                        <h2>{item.cardTitle}</h2>
                                        <div className="light-black-text">{item.title}</div>
                                        <div>{item.cardSubtitle}</div>
                                        <div style={{
                                            display: "flex",
                                            height: "150px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <img className="card-image" src={item.media.source.url} />
                                        </div>
                                    </div>
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
