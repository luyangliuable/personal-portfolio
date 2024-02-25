import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import IButtonProps, { IButtonPropsWithTo, IButtonPropsWithOnClick } from "../../Button/Interface/IButtonProps";
import './InlineLink.css';

class InlineLink extends Component<IButtonProps, {}> {
    constructor(props: IButtonProps) {
        super(props);
    }

    renderButton() {
        return (
            <span style={this.props.style} className="inline-link__text no-select flex items-center box-border">{this.props.children}</span>
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
                <NavLink target={this.props.target} to={this.props.to} className={this.props.className}>
                    {this.renderButton()}
                </NavLink>
            );
        } else if (this.isButtonProps(this.props)) {
            return (
                <div onClick={this.props.onClick} className={this.props.className}>
                    {this.renderButton()}
                </div>
            );
        }

        return null;
    }
}

export default InlineLink;
