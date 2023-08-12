import React, { Component } from 'react';
import './Blogs.css'
import BlogRepository from '../../repositories/BlogRepository';

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
            content: []
        }
    }

    componentDidMount() {
        BlogRepository.getBlogList().then((response) => {
            this.setState({
                content: response
            })
        })
    }

    truncateTextBody(text: string) {
        return text && text.length > 200
            ? text.substring(0, 200) + "..."
            : text;
    }

    cardEffect(e: any) {
        console.log(e);
        const rect = e.target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        console.log(x, y);
        e.target.style.setProperty("--mouse-x", `${x}px`);
        e.target.style.setProperty("--mouse-y", `${y}px`);
    }

    render() {
        return (
            <div className="blog-container">
                {
                    this.state.content?.map((content, idx) => {
                        return (
                            <div onMouseMove={this.cardEffect} className="blog-content card" key={idx}>
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
