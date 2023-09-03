import { Component, createRef } from 'react';
import "./UnderConstruction.css";

class UnderConstruction extends Component<{}, {}> {
    gearsRef = createRef<HTMLDivElement>();

    cardEffect(e: any) {
        console.log(e);
        const rect = e.target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        console.log(x, y);
        e.target.style.setProperty("--mouse-x", `${x}px`);
        e.target.style.setProperty("--mouse-y", `${y}px`);
    }


    render() {
        return (
            <div className="page-container">
                <div onMouseMove={this.cardEffect} className="card under-contruction-card">
                    <h1>Coming Soon</h1>
                </div>
            </div>
        );
    }
}

export default UnderConstruction;
