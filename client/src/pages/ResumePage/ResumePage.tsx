import React from 'react';
import IResumePageProps from "./Interface/IResumePageProps";
import "./ResumePage.css";

const ResumePage: React.FC<IResumePageProps> = (props) => {
    return (
        <div className="resume-page-content">
            <iframe className="browser" src="http://llcode.tech/api/image/6599eebc58701a6b8fe5908a" title="Resume">
            </iframe>
        </div>
    )
}

export default ResumePage;
