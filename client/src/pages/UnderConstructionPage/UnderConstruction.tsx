import React, { Component } from 'react';
import "./UnderConstruction.css";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import '../../components/Card/Card.css';


class UnderConstruction extends Component<{}, {}> {
    render() {
        return (
            <div className="page-container">
                <div className="under-contruction-card__container">
                    <div onMouseMove={cardGradientEffect} className="card under-contruction-card">
                        <h1>Coming Soon</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default UnderConstruction;
