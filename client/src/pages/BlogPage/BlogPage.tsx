import React, { Component } from "react";
import "./BlogPage.css"
import BlogRepository from "../../repositories/BlogRepository";
import IBlogPageState from "./Interface/IBlogPageState";
import IBlogPageProps from "./Interface/IBlogPageProps";
import { useNavigate, NavigateFunction } from 'react-router-dom';


class BlogPage extends Component<IBlogPageProps, IBlogPageState> {
    /* navigate: NavigateFunction; */

    constructor(props: IBlogPageProps) {
        super(props);

        this.state = {
            content: []
        }

        /* this.navigate = useNavigate(); */
    }

    componentDidMount() {
        BlogRepository.getBlogList().then((response) => {
            this.setState({
                content: response
            })
        })
    }

    truncateTextBody(text: string) {
        return text && text.length > 400
            ? text.substring(0, 400) + "..."
            : text;
    }

    cardEffect(e: any) {
        const rect = e.target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        e.target.style.setProperty("--mouse-x", `${x}px`);
        e.target.style.setProperty("--mouse-y", `${y}px`);
    }

    render() {
        return (
            <div className="blog-container cursor-pointer">
                {
                    this.state.content?.map((content, idx) => {
                        return (
                            <div
                                onClick={(e) => {
                                    {/* this.navigate(`/blog/${content._id.$oid}`) */ }
                                    window.location.href = `/blog?id=${content._id.$oid}`
                                }}
                                key={idx}
                                onMouseMove={this.cardEffect}
                                className="blog-content card">
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

export default BlogPage;
