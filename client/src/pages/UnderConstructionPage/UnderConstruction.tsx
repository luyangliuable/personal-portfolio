import { Component } from 'react';
import "./UnderConstruction.css";

class UnderConstruction extends Component<{}, {}> {
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
                    <h1>Under Construction</h1>
                    <p>Sorry, this page is under construction. I have to work and study so need a bit more time for this kinds of fun.</p>
                </div>
            </div>
        );
    }
}

export default UnderConstruction;
