import React from 'react';

export interface IButtonPropsWithTo {
    children: React.ReactNode;
    style?: React.CSSProperties;
    showButtonLine?: boolean;
    to: string;
}

export interface IButtonPropsWithOnClick {
    children: React.ReactNode;
    style?: React.CSSProperties;
    showButtonLine?: boolean;
    onClick: () => void;
}

type IButtonProps = IButtonPropsWithTo | IButtonPropsWithOnClick;

export default IButtonProps;
