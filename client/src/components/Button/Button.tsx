import { Component} from 'react';
import { NavLink } from "react-router-dom";
import './Button.css';
import IButtonProps from "./Interface/IButtonProps";

import {cardGradientEffect} from "../Utility/MouseUtility";


class HeroSection extends Component<IButtonProps, {}> {
    contentInterval: any;

    constructor(props: IButtonProps) {
        super(props);
        this.state = {}
    }

    render(): any {
        return (
            <NavLink to={this.props.to}>
                <div className="t-button button no-select" onMouseMove={(e) => cardGradientEffect(e, false, 1, 38, 20)}>
                    <span>{this.props.children}</span>
                </div>
            </NavLink>
        );
    }
}


export default HeroSection;
