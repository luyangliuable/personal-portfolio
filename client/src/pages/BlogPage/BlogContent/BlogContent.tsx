import { Component } from "react";
import ReactMarkdown from "react-markdown"
import PostRepository from "../../../repositories/PostRepository";
import IBlogContentState from "./Interface/IBlogContentState";
import IBlogContentProps from "./Interface/IBlogContentProps";
import remarkGfm from "remark-gfm";
import JsonToMarkdown from "./Utilities/JsonToMarkdown";
import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";
import { isoDateFormatToString } from "../../../components/Utility/StringUtility";
import "./BlogContent.css";

class BlogContent extends Component<IBlogContentProps, IBlogContentState> {
    jsonToMarkdown: JsonToMarkdown;
    defaultAuthorImage: string = "http://llcode.tech/api/image/65194be0f9b642fb30be59af";

    constructor(props: IBlogContentProps) {
        super(props);
        this.state = {
            content: {
                heading: null,
                body: null,
                author: null
            }
        }

        this.jsonToMarkdown = new JsonToMarkdown();
    }

    updateContentToDisplay(content: BlogPostResponse): void {
        this.setState({
            ...this.state,
            content: content
        });
    }

    getBlogIdFromQuery() {
        const searchParams: any = new URLSearchParams(window.location.search);

        const queryObj: any = {};

        for (let [key, value] of searchParams.entries()) {
            queryObj[key] = value;
        }

        PostRepository.getPost(queryObj.id).then((response: BlogPostResponse) => {
            console.log(response);
            this.updateContentToDisplay(response);
        })
    }

    componentDidMount() {
        this.getBlogIdFromQuery();
    }

    render() {
        const displayDateCreated = isoDateFormatToString(new Date(this.state.content.date_created));
        const authorName = this.state.content.author;
        const image = this.state.content.image && (<img className="blog-content__image" src={`http://llcode.tech/api/image/${this.state.content.image.$oid}`} />);
        const blogContentBody = this.state.content.body;

        return (
            <div className="page-container">
                <div className="blog-content__container card">
                    <div className="blog-content__header">
                        <h1>{this.state.content.heading}</h1>
                        <div className="card-image--author-info">
                            <img className="blog-content--author-image" src={this.defaultAuthorImage} />
                            <div className="flex-vertical">
                                <span>{authorName}</span>
                                <span>{displayDateCreated}</span>
                            </div>
                        </div>
                    </div>
                    {image}
                    <div className="blog-content">
                        <ReactMarkdown children={blogContentBody} remarkPlugins={[remarkGfm]} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogContent;
