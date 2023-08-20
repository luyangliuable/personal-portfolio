import React from 'react';
/* import { Chrono } from "react-chrono"; */
import { Component, JSXElementConstructor, createRef } from 'react';
import { IExperienceSectionState, ExperienceSectionItem } from './Interface/IExperienceSectionState';
import "./ExperienceSection.css";
import IExperienceSectionProps from "./Interface/IExperienceSectionProps";

class ExperienceSection extends Component<IExperienceSectionProps, IExperienceSectionState<any, JSXElementConstructor<any>>> {
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
                media: {
                    type: "IMAGE",
                    source: {
                        url: "https://madpatties.com/wp-content/uploads/2021/05/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210511102354-150x150.png"
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
        this.updateTimeLineLength();
    }

    updateCurrentPosition(): void {
        this.setState({
            ...this.state,
            currentElementPositionY: this.experienceSectionRef.current!.getBoundingClientRect().top + window.scrollY,
        });
    }


    updateTimeLineLength(): void {
        const offset = 100;

        this.setState({
            ...this.state,
            timeLineLength: this.experienceSectionContentRef.current!.getBoundingClientRect().width + offset,
        });
    }

    isCenterOfDivAtCenterOfScreen(div: HTMLDivElement): number {
        // Get the bounding rectangle of the div
        const rect = div.getBoundingClientRect();

        // Calculate the vertical center of the div
        const divCenterY = rect.top + rect.height / 2;

        // Calculate the center of the viewport
        const viewportCenterY = window.innerHeight / 2;

        // Check if the center of the div is within the tolerance of the viewport center
        const isCenteredVertically = divCenterY - viewportCenterY;

        return isCenteredVertically;
    }


    lockCurrentElementPosition(): void {
        this.experienceSectionParentRef.current!.parentElement.classList.add("fixed");

        if (this.state.lockPosition === null) {
            this.setState({
                ...this.state,
                lockPosition: this.props.scrolled,
            });
        }
    }


    unlockCurrentElementPosition(): void {
        this.experienceSectionParentRef.current!.parentElement.classList.remove("fixed");

        this.scrollTimeLine(0);
    }

    scrollTimeLine(scrollXAmount: number): void {
        this.experienceSectionContentRef.current!.style.transform = `translate(${scrollXAmount}px, 0)`;
    }

    checkCurrentElementLocked(): boolean {
        return this.experienceSectionParentRef.current!.parentElement.classList.contains("fixed");
    }

    componentDidUpdate(prevProps: Readonly<IExperienceSectionProps>, prevState: Readonly<IExperienceSectionState<any, React.JSXElementConstructor<any>>>, snapshot?: any): void {

        if (this.props.scrolled !== prevProps.scrolled) {
            console.log(this.state.lockPosition, this.props.scrolled);
            // lockedPosition gets reused

            if (this.isCenterOfDivAtCenterOfScreen(this.experienceSectionParentRef.current!) < -50 && this.props.scrolled - this.state.lockPosition <= this.state.timeLineLength) {
                this.lockCurrentElementPosition();
            } else if (this.props.scrolled <= this.state.lockPosition) {
                // goes up unlock
                this.unlockCurrentElementPosition();
            }

            if (this.checkCurrentElementLocked()) {
                this.scrollTimeLine(this.state.lockPosition - this.props.scrolled);
            }

            if (this.checkCurrentElementLocked() && this.props.scrolled - this.state.lockPosition > this.state.timeLineLength) {
                // goes down unlock
                this.unlockCurrentElementPosition();
            }
        }
    }

    cardEffect(e: any) {
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
                        <div ref={this.experienceSectionContentRef} className="experience-section-content-container">
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
