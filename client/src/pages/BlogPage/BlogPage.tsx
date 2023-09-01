import React, { Component } from "react";
import "./BlogPage.css"
import PostRepository from "../../repositories/PostRepository";
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
        PostRepository.getPostList().then((response) => {
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

    stripAwayHashSymbols(text: string) {
        return text.replace(/#/g, "");
    }

    isoDateFormatToString(date: Date): string {
        const padWithZero = (number: number) => {
            return number < 10 ? '0' + number : number;
        }

        const formattedDate = padWithZero(date.getDate()) + "-" + padWithZero(date.getMonth() + 1) + "-" + date.getFullYear();
        return formattedDate;
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
                                <p>{content.author} | {this.isoDateFormatToString(new Date(content.date_created))}</p>
                                <p>
                                    {this.stripAwayHashSymbols(this.truncateTextBody(content.body))}
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
