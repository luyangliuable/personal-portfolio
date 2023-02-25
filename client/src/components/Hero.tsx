import React, {Component, useRef} from 'react';

type iProps = {
    name?: string,
    current?: string,
    [category: string]: any
}

type iState = {
    mainContent: {
        heading: string,
        items: string[]
    }
}

/* interface AbcState {}; */


class Hero extends Component<iProps, iState> {

    constructor(props: iProps) {
        super(props);
        this.state = {
            mainContent: {
                heading: "Hi There 👋",
                items: [
                    "🔭 I’m currently working on a personal profile website.",
                    "🌱 I’m currently learning mlops and cybersecurity out of interest.",
                    "👯 I’m looking to collaborate on building a start up.",
                    "🤔 I’m looking for people to talk to about programming."
                ]
            }
        }
    }


    componentDidMount() : void {
        window.addEventListener("scroll", () => {
            console.log("scrolled");
        });
}

    render(): any {
        return (
            <div className="landing-page-content">
                <div className="home-container">
                    {/* <div className="hero-accordion-button hero-accordion-left" /> */}
                    <div style={{textAlign: "left"}}>
                        <ul>
                            <h1>
                                {(this.state && this.state.mainContent ) ? this.state.mainContent.heading: ""}
                            </h1>
                        </ul>

                        {
                            this.state.mainContent.items.map((item: string, index: number) => {
                                return (
                                    <ul key={index}>
                                        <p className="light-black-text">{item}</p>
                                    </ul>
                                )
                            })
                        }
                    </div>
                    {/* <div className="hero-accordion-button hero-accordion-right"  /> */}
                </div>

                <div className="home-container blogs">
                    <div style={{textAlign: "left"}}>
                        <h1>Blogs</h1>
                    </div>
                </div>

                <div className="home-container Experience">
                    <div style={{textAlign: "left"}}>
                        <h1>My Experiences</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hero;
