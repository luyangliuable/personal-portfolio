import { Component } from "react";
import "./ChristmasHat.css";

class ChristmasHat extends Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="christmas_hat">
                <div className="christmas_hat__ball"></div>
                <div className="christmas_hat__circle"></div>
                <div className="christmas_hat__body"></div>
                <div className="christmas_hat__base">.</div>
            </div>
        )
    }
}

export default ChristmasHat;
