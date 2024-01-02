import React from 'react';

export interface IButtonPropsWithTo {
    children: React.ReactNode;
    to: string;
}

export interface IButtonPropsWithOnClick {
    children: React.ReactNode;
    onClick: () => void;
}

type IButtonProps = IButtonPropsWithTo | IButtonPropsWithOnClick;

export default IButtonProps;
