import { Component } from "react";
import { marked } from 'marked';
import PostRepository from "../../../repositories/PostRepository";
import { IBlogContentState } from "./Interface/IBlogContentState";
import { isoDateFormatToString } from "../../../components/Utility/StringUtility";
import MarkdownRenderer from "./MarkdownRenderer/MarkdownRenderer";
import SkeletonBlogContent from "./SkeletonBlogContent/SkeletonBlogContent";
import TagCloud from "../../../components/TagCloud/TagCloud";
import IBlogContentProps from "./Interface/IBlogContentProps";
import JsonToMarkdown from "./Utilities/JsonToMarkdown";
import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";
import ImageRepository from "../../../repositories/ImageRepository";
import TableOfContent from "./TableOfContents/TableOfContents";
import Image from "../../../components/Image/Image";
import "./BlogContent.css";

class BlogContent extends Component<IBlogContentProps, IBlogContentState> {
    jsonToMarkdown: JsonToMarkdown;
    defaultAuthorImage: string = "http://llcode.tech/api/image/65194be0f9b642fb30be59af";
    postRepository: PostRepository;
    imageRepository: ImageRepository;


    constructor(props: IBlogContentProps) {
        super(props);
        this.jsonToMarkdown = new JsonToMarkdown();
        this.postRepository = PostRepository.getInstance();
        this.imageRepository = ImageRepository.getInstance();
        this.state = {
            headings: [],
            activeSection: [],
            cache: {
                fetchedImageUrl: "",
                fetchedAuthorImageUrl: ""
            },
            content: null
        }
    }

    updateContentToDisplay(content: BlogPostResponse): void {
        this.setState({
            ...this.state,
            content: content
        });
    }

    updateBlogContentHeadings() {
        const renderer = new marked.Renderer();
        const originalHeadingRenderer = renderer.heading.bind(renderer);

        let headings: {title: string, level: number}[] = [];

        renderer.heading = (text, level) => {
            headings.push({ title: text, level: level });
            return originalHeadingRenderer(text, level);
        };

        marked(this.state.content?.body, { renderer });

        this.setState({ headings: headings });
    }

    async getBlogContentFromQuery(): Promise<void> {
        const searchParams: any = new URLSearchParams(window.location.search);
        const queryObj: any = {};
        for (let [key, value] of searchParams.entries()) {
            queryObj[key] = value;
        }

        this.postRepository.getPost(queryObj.id).then((response: BlogPostResponse) => {
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
        if (this.state.content && this.state.content !== prevState.content) {
            if (this.state.content.body !== prevState.content?.body) {
                this.updateBlogContentHeadings();
            }
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


    renderBlogContent(): React.ReactNode {
        const { date_created, tags, image , body, author } = this.state.content;
        const displayDateCreated = isoDateFormatToString(new Date(date_created));
        const imageId = image?.$oid;

        return (
            <div className="blog-content">
                <div className="blog-content__header">
                    <h1>{this.state.content.heading}</h1>
                    <div className="card-image--author-info">
                        <img className="blog-content--author-image" src={this.defaultAuthorImage} />
                        <div className="flex-vertical">
                            <span>{author}</span>
                            <span>{displayDateCreated}</span>
                        </div>
                    </div>
                    <TagCloud tags={tags} />
                </div>
                <Image className="blog-content__image" src={imageId} />
                <div className="blog-content-body">
                    <MarkdownRenderer markdown={body} />
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="page-container">
                <div className="blog-content__wrapper">
                    <TableOfContent headings={this.state.headings} />
                    {this.state.content ? this.renderBlogContent() : <SkeletonBlogContent />}
                    <div className="blog-content__side-components"></div>
                </div>
            </div>
        )
    }
}

export default BlogContent;
