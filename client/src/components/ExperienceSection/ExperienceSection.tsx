import React, { Component, createRef } from 'react';
import IExperienceSectionProps from "./Interface/IExperienceSectionProps";
import { IExperienceSectionState, ExperienceSectionItem } from './Interface/IExperienceSectionState';
import "./ExperienceSection.css";

class ExperienceSection extends Component<IExperienceSectionProps, IExperienceSectionState> {
    experienceSectionParentRef = createRef<HTMLDivElement>();
    experienceSectionRef = createRef<HTMLDivElement>();
    experienceSectionContentRef = createRef<HTMLDivElement>();

    constructor(props: IExperienceSectionProps) {
        super(props);

        this.state = {
            lockPosition: null,
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

    componentDidMount(): void {
        this.updateCurrentPosition();
        this.updateTimelineLength();
    }

    updateCurrentPosition(): void {
        const positionY = this.experienceSectionRef.current!.getBoundingClientRect().top + window.scrollY;
        this.setState({ currentElementPositionY: positionY });
    }

    updateTimelineLength(): void {
        const offset = 0;
        const length = this.experienceSectionContentRef.current!.getBoundingClientRect().width + offset;

        // Adjust the height of the parent div to the length of the timeline so next section can be placed correctly
        this.experienceSectionParentRef.current!.parentElement.parentElement.style.height = `${length + length/3}px`;
        this.setState({ timeLineLength: length });
    }

    isCenterAlignedWithViewport(div: HTMLDivElement): number {
        const rect = div.getBoundingClientRect();
        const divCenterY = rect.top + rect.height / 2;
        const viewportCenterY = window.innerHeight / 2;

        return divCenterY - viewportCenterY;
    }

    lockPosition(): void {
        this.experienceSectionParentRef.current!.parentElement.classList.add("fixed");
        if (this.state.lockPosition === null) {
            this.setState({ lockPosition: this.props.scrolled });
        }
    }

    unlockPosition(): void {
        this.experienceSectionParentRef.current!.parentElement.classList.remove("fixed");

        this.scrollTimeline(0);
    }

    scrollTimeline(scrollXAmount: number): void {
        const transformValue = `translate(${scrollXAmount}px, 0)`;
        this.experienceSectionContentRef.current!.style.transform = transformValue;
        this.experienceSectionContentRef.current!.style.webkitTransform = transformValue;
    }

    isLocked(): boolean {
        return this.experienceSectionParentRef.current!.parentElement.classList.contains("fixed");
    }

    componentDidUpdate(prevProps: IExperienceSectionProps): void {
        const { scrolled } = this.props;
        const { lockPosition, timeLineLength } = this.state;

        if (scrolled !== prevProps.scrolled) {
            if (this.isCenterAlignedWithViewport(this.experienceSectionParentRef.current!) < 0) {
                this.lockPosition();
            } else if (scrolled < lockPosition) {
                this.unlockPosition();
            }

            if (this.isLocked()) {
                this.scrollTimeline(lockPosition - scrolled);
            }

            if (this.isLocked() && scrolled - lockPosition > timeLineLength) {
                this.unlockPosition();
            }
        }
    }

    cardEffect(e: any): void {
        const rect = e.target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        e.target.style.setProperty("--mouse-x", `${x}px`);
        e.target.style.setProperty("--mouse-y", `${y}px`);
    }

    render() {
        const items = this.state.items.sort((a: ExperienceSectionItem, b: ExperienceSectionItem) => {
            return parseInt(b.title) - parseInt(a.title)
        });
        return (
            <>
                <div ref={this.experienceSectionParentRef} className="experience-section-parent-container">
                    <h1 style={{
                        marginLeft: "2vw"
                    }}>My Experiences</h1>
                    <div ref={this.experienceSectionRef} className="experience-section-container">
                        <div ref={this.experienceSectionContentRef} className="experience-section-content-container" style={{ transform: "translate(0px, 0px)" }}>
                            {
                                items.map((item: ExperienceSectionItem, idx: number) => (
                                    <div onMouseMove={this.cardEffect}
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
            </>
        );
    }
}

export default ExperienceSection;
