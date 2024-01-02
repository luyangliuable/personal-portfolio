import React, { Component } from 'react';
import ITagCloudProps from "./Interface/ITagCloudProps";
import "./TagCloud.css";

class TagCloud extends Component<ITagCloudProps, {}> {
    constructor(props: ITagCloudProps) {
        super(props);
    }

    render() {
        return (
            <div className="card-item__tags">
                { this.props.tags && this.props.tags.map(item => <span key={item}>#{ item }</span>) }
            </div>
        );
    }
}

export default TagCloud;
