import React, { Component, createRef, RefObject } from 'react';
import "./TwinCandle.css";
import "./TwinCandleKeyframeAnimations.css";
import ITwinCandleState from "./Interface/ITwinCandleState";
import ITwinCandleProps from "./Interface/ITwinCandleProps";

class TwinCandles extends Component<ITwinCandleProps, ITwinCandleState> {
    candleOneRef: React.RefObject<HTMLDivElement>;
    candleOneEyesOneRef: React.RefObject<HTMLDivElement>;
    candleOneEyesTwoRef: React.RefObject<HTMLDivElement>;
    candleOneMouthRef: React.RefObject<HTMLDivElement>;
    candleOneSmokeOneRef: React.RefObject<HTMLDivElement>;
    candleOneSmokeTwoRef: React.RefObject<HTMLDivElement>;
    candleOneLightWaveRef: React.RefObject<HTMLDivElement>;

    candleTwoRef: React.RefObject<HTMLDivElement>;
    candleTwoEyesOneRef: React.RefObject<HTMLDivElement>;
    candleTwoEyesTwoRef: React.RefObject<HTMLDivElement>;
    candleTwoFireRef: React.RefObject<HTMLDivElement>;

    constructor(props: ITwinCandleProps) {
        super(props);

        this.candleOneRef = createRef();
        this.candleOneEyesOneRef = createRef();
        this.candleOneEyesTwoRef = createRef();
        this.candleOneMouthRef = createRef();
        this.candleOneSmokeOneRef = createRef();
        this.candleOneSmokeTwoRef = createRef();

        this.candleTwoRef = createRef();
        this.candleTwoEyesOneRef = createRef();
        this.candleTwoEyesTwoRef = createRef();
        this.candleTwoFireRef = createRef();
        this.candleOneLightWaveRef = createRef();


        this.state = {
            animatedTimeIntervalMiliseconds: 1000,
            currentCandleState: "Off",
            fireOnState: {
                candleOne: {
                    reference: this.candleOneRef,
                    className: ["candle1"]
                },
                candleOneEyesOne: {
                    reference: this.candleOneEyesOneRef,
                    className: ["candle1__eyes-one"]
                },
                candleOneEyesTwo: {
                    reference: this.candleOneEyesTwoRef,
                    className: ["candle1__eyes-two"]
                },
                candleOneMouth: {
                    reference: this.candleOneMouthRef,
                    className: ["candle1__mouth"]
                },
                candleTwo: {
                    reference: this.candleTwoRef,
                    className: ["candle2"]
                },
                candleTwoEyesOne: {
                    reference: this.candleTwoEyesOneRef,
                    className: ["candle2__eyes-one"]
                },
                candleTwoEyesTwo: {
                    reference: this.candleTwoEyesTwoRef,
                    className: ["candle2__eyes-two"]
                },
                candleTwoFire: {
                    reference: this.candleTwoFireRef,
                    className: [
                        "candle2__fire",
                        "candle2__fire-animated"
                    ]
                },
                candleOneSmokeOne: {
                    reference: this.candleOneSmokeOneRef,
                    className: []
                },
                candleOneSmokeTwo: {
                    reference: this.candleOneSmokeTwoRef,
                    className: []
                },
                candleOneLightWave: {
                    reference: this.candleOneLightWaveRef,
                    className: ["light__wave"]
                }
            },
            fireOffState: {
                candleOne: {
                    reference: this.candleOneRef,
                    className: ["candle1"]
                },
                candleOneEyesOne: {
                    reference: this.candleOneEyesOneRef,
                    className: ["candle1__eyes-one"]
                },
                candleOneEyesTwo: {
                    reference: this.candleOneEyesTwoRef,
                    className: ["candle1__eyes-two"]
                },
                candleOneMouth: {
                    reference: this.candleOneMouthRef,
                    className: ["candle1__mouth"]
                },
                candleTwo: {
                    reference: this.candleTwoRef,
                    className: ["candle2"]
                },
                candleTwoEyesOne: {
                    reference: this.candleTwoEyesOneRef,
                    className: ["candle2__eyes-one"]
                },
                candleTwoEyesTwo: {
                    reference: this.candleTwoEyesTwoRef,
                    className: ["candle2__eyes-two"]
                },
                candleTwoFire: {
                    reference: this.candleTwoFireRef,
                    className: ["candle2__fire"]  // The comment "This is optional" was here; adjust as needed
                },
                candleOneSmokeOne: {
                    reference: this.candleOneSmokeOneRef,
                    className: []
                },
                candleOneSmokeTwo: {
                    reference: this.candleOneSmokeTwoRef,
                    className: []
                },
                candleOneLightWave: {
                    reference: this.candleOneLightWaveRef,
                    className: []
                }
            },
            fireOffTransitionState: {
                candleOne: {
                    reference: this.candleOneRef,
                    className: ["candle1", "candle1-animated"]
                },
                candleOneEyesOne: {
                    reference: this.candleOneEyesOneRef,
                    className: [
                        "candle1__eyes-one",
                        "candle1__eyes-one-animated",
                    ]
                },
                candleOneEyesTwo: {
                    reference: this.candleOneEyesTwoRef,
                    className: [
                        "candle1__eyes-two",
                        "candle1__eyes-two-animated"
                    ]
                },
                candleOneMouth: {
                    reference: this.candleOneMouthRef,
                    className: [
                        "candle1__mouth",
                        "candle1__mouth-animated"
                    ]
                },
                candleTwo: {
                    reference: this.candleTwoRef,
                    className: ["candle2"]
                },
                candleTwoEyesOne: {
                    reference: this.candleTwoEyesOneRef,
                    className: ["candle2__eyes-one"]
                },
                candleTwoEyesTwo: {
                    reference: this.candleTwoEyesTwoRef,
                    className: ["candle2__eyes-two"]
                },
                candleTwoFire: {
                    reference: this.candleTwoFireRef,
                    className: [
                        "candle2__fire",
                        "candle2__fire-transition__off"
                    ]
                },
                candleOneSmokeOne: {
                    reference: this.candleOneSmokeOneRef,
                    className: ["candle__smoke-one"]
                },
                candleOneSmokeTwo: {
                    reference: this.candleOneSmokeTwoRef,
                    className: ["candle__smoke-two"]
                }
            },
            fireOnTransitionState: {
                candleOne: {
                    reference: this.candleOneRef,
                    className: ["candle1"]
                },
                candleOneEyesOne: {
                    reference: this.candleOneEyesOneRef,
                    className: ["candle1__eyes-one",]
                },
                candleOneEyesTwo: {
                    reference: this.candleOneEyesTwoRef,
                    className: ["candle1__eyes-two",]
                },
                candleOneMouth: {
                    reference: this.candleOneMouthRef,
                    className: ["candle1__mouth",]
                },
                candleTwo: {
                    reference: this.candleTwoRef,
                    className: [
                        "candle2",
                        "candle2-transition__on"
                    ]
                },
                candleTwoEyesOne: {
                    reference: this.candleTwoEyesOneRef,
                    className: ["candle2__eyes-one", "candle2__eyes-one-animated"]
                },
                candleTwoEyesTwo: {
                    reference: this.candleTwoEyesTwoRef,
                    className: ["candle2__eyes-two", "candle2__eyes-two-animated"]
                },
                candleTwoFire: {
                    reference: this.candleTwoFireRef,
                    className: [
                        "candle2__fire",
                        "candle2__fire-transition__on"
                    ]
                },
                candleOneSmokeOne: {
                    reference: this.candleOneSmokeOneRef,
                    className: []
                },
                candleOneSmokeTwo: {
                    reference: this.candleOneSmokeTwoRef,
                    className: []
                },
                candleOneLightWave: {
                    reference: this.candleOneLightWaveRef,
                    className: ["light__wave"]
                }
            }
        }
    }

    componentDidMount() {
        this.turnCandleLightOff();
    }


    public transitionCandleFireToOff = () => {
        if (this.state.currentCandleState === "On") {
            this.updateCandleState("Transitioning");

            Object.entries(this.state.fireOffTransitionState).forEach(([key, value]) => {
                this.changeRefClassName(value.reference, value.className);
            });


            window.setTimeout(() => {
                this.turnCandleLightOff();
            }, this.state.animatedTimeIntervalMiliseconds);
        }
    }

    public turnCandleLightOn = () => {

        Object.entries(this.state.fireOnState).forEach(([key, value]) => {
            this.changeRefClassName(value.reference, value.className);
        });

        this.updateCandleState("On");
    }

    public transitionCandleFireToOn = () => {
        if (this.state.currentCandleState === "Off") {
            this.updateCandleState("Transitioning");

            Object.entries(this.state.fireOnTransitionState).forEach(([key, value]) => {
                this.changeRefClassName(value.reference, value.className);
            });

            // TODO temporary solution because I am tired start
            var element: HTMLElement = document.querySelector(".featured-section-content");

            // Check if the element exists and set its "darkness"
            if (element) {
                element.classList.remove('featured-section-content-in-dark-room');
            }
            // temporary solution because I am tired end

            window.setTimeout(() => {
                this.turnCandleLightOn();
            }, this.state.animatedTimeIntervalMiliseconds);
        }
    }

    public turnCandleLightOff = () => {
        // TODO temporary solution because I am tired start
        var element: HTMLElement = document.querySelector(".featured-section-content");

        // Check if the element exists and set its display to "none"
        if (element) {
            element.classList.add('featured-section-content-in-dark-room');
        }

        // temporary solution because I am tired end
        Object.entries(this.state.fireOffState).forEach(([_, value]) => {
            this.changeRefClassName(value.reference, value.className);
        });

        this.updateCandleState("Off");
    }

    private updateCandleState(newCandleState: "On" | "Off" | "Transitioning") {
        this.setState({
            currentCandleState: newCandleState
        });
    }

    private changeRefClassName = (element: RefObject<HTMLElement>, newClassNameList: string[]) => {
        // Assuming that the ref must contain only one classname at a time.
        element.current?.classList.remove(...element.current?.classList);

        for (const newClassName of newClassNameList) {
            element.current?.classList.add(newClassName);
        }
    }

    render() {
        return (
            <div className="wrapper" onClick={() => this.transitionCandleFireToOff()} style={this.props.style}>
                <div className="candles">
                    <div ref={this.candleOneLightWaveRef} className="light__wave"></div>
                    <div className="candle1" ref={this.candleOneRef}>
                        <div className="candle1__body">
                            <div className="candle1__eyes">
                                <span className="candle1__eyes-one" ref={this.candleOneEyesOneRef}></span>
                                <span className="candle1__eyes-two" ref={this.candleOneEyesTwoRef}></span>
                            </div>
                            <div className="candle1__mouth" ref={this.candleOneMouthRef}></div>
                        </div>
                        <div className="candle1__stick"></div>
                    </div>

                    <div ref={this.candleTwoRef} className="candle2">
                        <div className="candle2__body">
                            <div className="candle2__eyes">
                                <div ref={this.candleTwoEyesOneRef} className="candle2__eyes-one"></div>
                                <div ref={this.candleTwoEyesTwoRef} className="candle2__eyes-two"></div>
                            </div>
                        </div>
                        <div className="candle2__stick"></div>
                    </div>
                    <div ref={this.candleTwoFireRef} className="candle2__fire"></div>
                    {/* <div className="sparkles-one"></div> */}
                    {/* <div className="sparkles-two"></div> */}
                    <div ref={this.candleOneSmokeOneRef} className="candle__smoke-one"></div>
                    <div ref={this.candleOneSmokeTwoRef} className="candle__smoke-two"></div>
                </div>
                <div className="floor">
                </div>
            </div>
        );
    }
}

export default TwinCandles;
