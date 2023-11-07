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
        this.jsonToMarkdown = new JsonToMarkdown();
        this.state = {
            headings: [],
            content: {
                heading: null,
                body: null,
                author: null
            }
        }
    }

    updateContentToDisplay(content: BlogPostResponse): void {
        this.setState({
            ...this.state,
            content: content
        });
    }

    updateBlogContentHeadings(): void {
        const regexReplaceCode = /(```.+?```)/gms
        const regexRemoveLinks = /\[(.*?)\]\(.*?\)/g
        const regXHeader = /#{1,6}.+/g

        const markdownWithoutLinks = this.state.content.body?.replace(regexRemoveLinks, "")
        const markdownWithoutCodeBlocks = markdownWithoutLinks.replace(regexReplaceCode, "")
        const headingsList = markdownWithoutCodeBlocks.match(regXHeader)

        const headings = headingsList.map(heading => {
            const level = heading.lastIndexOf('#') - heading.indexOf('#');
            return {
                title: heading.replace(/^#+\s/, ''),
                level: level
            };
        });

        this.setState({headings : headings});
    }

    async getBlogContentFromQuery(): Promise<void> {
        const searchParams: any = new URLSearchParams(window.location.search);
        const queryObj: any = {};
        for (let [key, value] of searchParams.entries()) {
            queryObj[key] = value;
        }

        PostRepository.getPost(queryObj.id).then((response: BlogPostResponse) => {
            this.updateContentToDisplay(response);
        });
    }

    componentDidMount() {
        this.getBlogContentFromQuery();
    }

    componentDidUpdate(
        prevProps: Readonly<IBlogContentProps>,
        prevState: Readonly<IBlogContentState>,
        snapshot?: any
    ): void {
        if (this.state.content.body !== prevState.content.body) {
            this.updateBlogContentHeadings();
        }
    }

    renderTableOfContents(): React.ReactNode {
        function getTextColor(level: number): string {
            const lightness = level * 20;
            return `hsl(0, 0%, ${lightness}%)`;
        }

        const subheadings = this.state.headings?.filter(({ title, level }) => level !== 0);

        return subheadings?.map(({ title, level }, idx: number) => {
            const indentation = `${level * 20}px`;
            const marginBottom = `${12 - 4.5 * (level)}px`;
            const color = getTextColor(level);

            return (
                <span key={idx} style={{ color: color, marginRight: indentation, marginBottom: marginBottom }}>{title}</span>
            )
        });
    }

    render() {
        const displayDateCreated = isoDateFormatToString(new Date(this.state.content.date_created));
        const authorName = this.state.content.author;
        const image = this.state.content.image && (<img className="blog-content__image" src={`http://llcode.tech/api/image/${this.state.content.image.$oid}`} />);
        const blogContentBody = this.state.content.body;

        return (
            <div className="page-container">
                <div className="blog-content__wrapper">
                    <div className="blog-content__table-of-contents">{this.renderTableOfContents()}</div>
                    <div className="blog-content card">
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
                        <div className="blog-content-body">
                            <ReactMarkdown children={blogContentBody} remarkPlugins={[remarkGfm]} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogContent;
