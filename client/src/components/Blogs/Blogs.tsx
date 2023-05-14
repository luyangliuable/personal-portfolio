import React, { Component, useRef } from 'react';
import './Blogs.css'

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


class Blogs extends Component<{}, AbcState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            content: [
            ]
        }
    }

    componentDidMount() {
        fetch("./Blogs.json")
            .then(response => response.)
            .then(data => {
                console.log(JSON.stringify( data ));
                return data;
            });

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
                        )
                    })
                }
            </div>
        )
    }
}

export default Blogs;
