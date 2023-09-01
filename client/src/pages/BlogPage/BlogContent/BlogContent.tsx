import { Component } from "react";
import ReactMarkdown from "react-markdown"
import BlogRepository from "../../../repositories/BlogRepository";
import PostRepository from "../../../repositories/PostRepository";
import IBlogContentState from "./Interface/IBlogContentState";
import IBlogContentProps from "./Interface/IBlogContentProps";
import remarkGfm from "remark-gfm";
import JsonToMarkdown from "./Utilities/JsonToMarkdown";
import "./BlogContent.css";

const initialState = "";

const blogManager = (state: string | undefined = initialState, action: blogManagerActionType) => {
    switch (action.type) {
        case "get":
            return action.payload;
        case "comment":
            return action.payload;
        default:
            return "";
    }
};


type blogManagerActionType = {
    type: string,
    payload: string
}

class BlogContent extends Component<IBlogContentProps, IBlogContentState> {
    jsonToMarkdown: JsonToMarkdown;

    constructor(props: IBlogContentProps) {
        super(props);
        this.state = {
            content: {
                heading: null,
                body: null
            }
        }

        this.jsonToMarkdown = new JsonToMarkdown();
    }

    updateContentToDisplay(content: string): void {
        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                body: content
            }
        });
    }

    getBlogIdFromQuery() {
        const searchParams: any = new URLSearchParams(window.location.search);

        const queryObj: any = {};

        for (let [key, value] of searchParams.entries()) {
            queryObj[key] = value;
        }

        PostRepository.getPost(queryObj.id).then((response: any) => {
            /* const content = this.jsonToMarkdown.convert(response); */
            this.updateContentToDisplay(response.body);
        })
    }

    componentDidMount() {
        this.getBlogIdFromQuery();
    }

    render() {
        return (
            <div className="page-container">
                <div className="blog-content card">
                    <ReactMarkdown children={this.state.content.body} remarkPlugins={[remarkGfm]} />
                </div>
            </div>
        )
    }
}

export default BlogContent;
