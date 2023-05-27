import React, { Component, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { createStore } from 'redux';

const initialState = '';

const blogManager = (state: string | undefined = initialState, action: blogManagerActionType) => {
    switch (action.type) {
        case 'get':
            return action.payload;
        case 'comment':
            return action.payload;
        default:
            return '';
    }
};

type blogManagerActionType = {
    type: string,
    payload: string
}

type AbcState = {
    content: blogContent,
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    heading: string,
    body: string[],
}


class BlogContent extends Component<{}, AbcState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            content: {
                heading: blogManager(undefined, {type: 'get', payload: 'Why should modern developers pick up machine learning and cybersecurity as a skill?'}), // TODO Store on database and api
                body: []
            }
        }
    }

    render() {
        return (
            <div className="blog-content">
                <h1>{this.state.content.heading}</h1>
                {this.state.content.body.map((item, index) => {
                    return <p key={index} style={{textAlign: 'left', marginBottom: '7vh'}}>{item}</p>
                })}
            </div>
        )
    }
}

export default BlogContent;
