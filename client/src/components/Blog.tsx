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
    content: blogContent[],
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    heading: string,
    url: string,
}


class Blog extends Component<{}, AbcState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            content: [
                {
                    heading: "Blog 1",
                    url: "http://www.google.com"
                },
                {
                    heading: "Blog 2",
                    url: "http://www.google.com"
                },
                {
                    heading: "Blog 3",
                    url: "http://www.google.com"
                },
                {
                    heading: "Blog 4",
                    url: "http://www.google.com"
                },
            ]
        }
    }

    render() {
        return (
            <div className="blog-container">
                {
                    this.state.content.map((content) => {
                        return (
                            <a className="blog-content" href={content.url}>
                                    {content.heading}
                            </a>
                    )})
                }
            </div>
        )
    }
}

export default Blog;
