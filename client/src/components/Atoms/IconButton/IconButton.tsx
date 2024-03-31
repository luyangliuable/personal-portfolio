import React, { useMemo } from 'react';
import { NavLink } from "react-router-dom";
import IButtonProps, { IButtonPropsWithTo } from "../../Button/Interface/IButtonProps";
import './IconButton.css';

const IconButton: React.FC<IButtonProps> = (props: IButtonProps) => {

    const imageLink = useMemo(() => {
        const logoMap: { [key: string]: string } = {
            Email: "protonmail" // Assuming "protonmail" is the correct value you want to use
        };
        let logoName = props.logoName;
        if (props.logoName && logoMap[props.logoName]) {
            logoName = logoMap[props.logoName];
        }
        return `https://img.shields.io/badge/-%23FFF.svg?&style=for-the-badge&logo=${logoName}&logoColor=%23000&color=${props.buttonColor}`;
    }, [props.logoName, props.buttonColor]); // Note: props.buttonColor added to

    const renderButton = () => {
        return (
            <span style={props.style} className="inline-link__text no-select flex items-center box-border">
                <img src={imageLink} alt={props.logoName} />
            </span>
        );
    }

    const isLinkProps = (props: IButtonProps): props is IButtonPropsWithTo => {
        return (props as IButtonPropsWithTo).to !== undefined;
    }

    if (isLinkProps(props)) {
        return (
            <NavLink target={props.target} to={props.to} className={props.className}>{renderButton()}</NavLink>
        );
    }

    return (
        <div onClick={props.onClick} className={props.className}>{renderButton()}</div>
    );
}

export default IconButton;
