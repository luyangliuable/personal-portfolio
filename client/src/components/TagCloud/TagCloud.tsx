import React from 'react';
import ITagCloudProps from "./Interface/ITagCloudProps";
import "./TagCloud.css";

const TagCloud: React.FC<ITagCloudProps> = ({ tags }) => {
    return (
        <aside className="card-item__tags">
            { tags && tags.map(item => <span key={item}>#{ item }</span>) }
        </aside>
    );
}

export default TagCloud;
