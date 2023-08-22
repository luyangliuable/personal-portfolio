import React, { Component } from "react";
import "./BlogPage.css"
import BlogRepository from "../../repositories/BlogRepository";
import IBlogPageState from "./Interface/IBlogPageState";
import IBlogPageProps from "./Interface/IBlogPageProps";


class BlogPage extends Component<IBlogPageProps, IBlogPageState> {
    constructor(props: IBlogPageProps) {
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
                                <div
                                  onClick={ (e) => {
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
