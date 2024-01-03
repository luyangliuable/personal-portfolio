import React, { Component } from 'react';
import IResumePageState from "./Interface/IResumePageState";
import IResumePageProps from "./Interface/IResumePageProps";
import "./ResumePage.css";

class ResumePage extends Component<IResumePageProps, IResumePageState> {
    constructor(props: IResumePageProps) {
        super(props);
        this.state = {};
    }


    componentDidUpdate(): void {
    }

    componentDidMount(): void {
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="resume-page-content">
                <iframe className="browser" src="http://docs.google.com/document/d/18WT-J7ZP5dcEJreXIvldSm1VySQhC0DQB0GzBXGyJEQ/edit" title="Resume">
                </iframe>
            </div>
        )
    }
}

export default ResumePage;
