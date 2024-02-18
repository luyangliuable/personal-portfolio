import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './Button.css';
import IButtonProps, { IButtonPropsWithTo, IButtonPropsWithOnClick } from "./Interface/IButtonProps";

import { cardGradientEffect } from "../Utility/MouseUtility";

class HeroSection extends Component<IButtonProps, {}> {
    contentInterval: any;

    constructor(props: IButtonProps) {
        super(props);
        this.state = {}
    }

    renderButton() {
        return (
            <>
                <div style={this.props.style} className="t-button button no-select" onMouseMove={(e) => cardGradientEffect(e, false, 1, 38, 20)}>
                    <span>{this.props.children}</span>
                </div>
                {
                    this.props.showButtonLine && (<div className="button-line"></div>)
                }
            </>
        );
    }

    isLinkProps(props: IButtonProps): props is IButtonPropsWithTo {
        return (props as IButtonPropsWithTo).to !== undefined;
    }

    isButtonProps(props: IButtonProps): props is IButtonPropsWithOnClick {
        return (props as IButtonPropsWithOnClick).onClick !== undefined;
    }

    render(): React.ReactNode {
        if (this.isLinkProps(this.props)) {
            return (
                <NavLink to={this.props.to}>
                    {this.renderButton()}
                </NavLink>
            );
        } else if (this.isButtonProps(this.props)) {
            return (
                <div onClick={this.props.onClick}>
                    {this.renderButton()}
                </div>
            );
        }

        return null;
    }
}

export default HeroSection;
