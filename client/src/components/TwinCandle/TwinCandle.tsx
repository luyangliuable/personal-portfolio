import React, { Component, createRef, RefObject } from 'react';
import "./TwinCandle.css";
import "./TwinCandleKeyframeAnimations.css";

class TwinCandles extends Component<{}, {}> {
    candleOneRef: React.RefObject<HTMLDivElement>;
    candleOneEyesOneRef: React.RefObject<HTMLDivElement>;
    candleOneEyesTwoRef: React.RefObject<HTMLDivElement>;
    candleOneMouthRef: React.RefObject<HTMLDivElement>;

    candleTwoRef: React.RefObject<HTMLDivElement>;
    candleTwoEyesOneRef: React.RefObject<HTMLDivElement>;
    candleTwoEyesTwoRef: React.RefObject<HTMLDivElement>;
    candleTwoFireRef: React.RefObject<HTMLDivElement>;


    constructor(props: {}) {
        super(props);

        this.candleOneRef = createRef();
        this.candleOneEyesOneRef = createRef();
        this.candleOneEyesTwoRef = createRef();
        this.candleOneMouthRef = createRef();

        this.candleTwoRef = createRef();
        this.candleTwoEyesOneRef = createRef();
        this.candleTwoEyesTwoRef = createRef();
        this.candleTwoFireRef = createRef();
    }

    public turnCandleLightOff = () => {
        this.changeRefClassName(this.candleOneRef, "candle1");
        this.changeRefClassName(this.candleOneEyesOneRef, "candle1__eyes-one");
        this.changeRefClassName(this.candleOneEyesTwoRef, "candle1__eyes-two");
        this.changeRefClassName(this.candleOneMouthRef, "candle1__mouth");
    }

    private changeRefClassName = (element: RefObject<HTMLElement>, newClassName: string) => {
        // Assuming that the ref must contain only one classname at a time.

        element.current?.classList.remove(...this.candleOneRef.current?.classList);
        element.current?.classList.add("candle1");
    }

    public turnCandleLightOn = () => {

    }

    render() {
        return (
            <div className="wrapper">
                <div className="candles">
                    <div className="light__wave"></div>
                    <div className="candle1" ref={this.candleOneRef}>
                        <div className="candle1__body">
                            <div className="candle1__eyes">
                                <span className="candle1__eyes-one" ref={this.candleOneEyesOneRef}></span>
                                <span className="candle1__eyes-two" ></span>
                            </div>
                            <div className="candle1__mouth"></div>
                        </div>
                        <div className="candle1__stick"></div>
                    </div>

                    <div className="candle2">
                        <div className="candle2__body">
                            <div className="candle2__eyes">
                                <div className="candle2__eyes-one"></div>
                                <div className="candle2__eyes-two"></div>
                            </div>
                        </div>
                        <div className="candle2__stick"></div>
                    </div>
                    <div className="candle2__fire"></div>
                    <div className="sparkles-one"></div>
                    <div className="sparkles-two"></div>
                    <div className="candle__smoke-one">

                    </div>
                    <div className="candle__smoke-two">

                    </div>
                </div>
                <div className="floor">
                </div>
            </div>
        );
    }
}

export default TwinCandles;
