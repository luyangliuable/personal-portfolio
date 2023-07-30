import React, { Component, useRef } from 'react';
import './Blogs.css'
import BlogRepository from '../../repositories/BlogRepository';

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
    body: string[],
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
        BlogRepository.getBlogList().then((response) => {
            console.log(response);
            this.setState({
                content: response
            })
        })
    }

    truncateTextBody(text: string) {
        return text && text.length > 100
            ? text.substring(0, 100) + "..."
            : text;
    }

    render() {
        return (
            <div className="blog-container">
                {
                    this.state.content.map((content, idx) => {
                        return (
                            <div className="blog-content" key={idx}>
                                <h3>{content.heading}</h3>
                                <p>
                                    {this.truncateTextBody(content.body[1])}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Blogs;
