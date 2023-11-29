import { Component } from "react";
import { marked } from 'marked';
import PostRepository from "../../../repositories/PostRepository";
import { IBlogContentState } from "./Interface/IBlogContentState";
import { isoDateFormatToString } from "../../../components/Utility/StringUtility";
import MarkdownRenderer from "./MarkdownRenderer/MarkdownRenderer";
import SkeletonBlogContent from "./SkeletonBlogContent/SkeletonBlogContent";
import IBlogContentProps from "./Interface/IBlogContentProps";
import JsonToMarkdown from "./Utilities/JsonToMarkdown";
import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";
import ImageRepository from "../../../repositories/ImageRepository";
import TableOfContent from "./TableOfContents/TableOfContents";
import "./BlogContent.css";

class BlogContent extends Component<IBlogContentProps, IBlogContentState> {
    jsonToMarkdown: JsonToMarkdown;
    defaultAuthorImage: string = "http://llcode.tech/api/image/65194be0f9b642fb30be59af";
    defaultAuthorImageId: string = "65194be0f9b642fb30be59af";
    postRepository: PostRepository;
    imageRepository: ImageRepository;


    constructor(props: IBlogContentProps) {
        super(props);
        this.jsonToMarkdown = new JsonToMarkdown();
        this.postRepository = PostRepository.getInstance();
        this.imageRepository = ImageRepository.getInstance();
        this.state = {
            headings: [],
            cache: {
                fetchedImageUrl: "",
                fetchedAuthorImageUrl: ""
            },
            content: null
        }
    }

    async updateImage() {
        try {
            const imageId = this.state.content.image?.$oid ?? "";
            const authorImageId = this.defaultAuthorImageId;


            const [imageUrl, authorImageUrl] = await Promise.all([
                this.imageRepository.getImageById(imageId),
                this.imageRepository.getImageById(authorImageId)
            ]);


            this.setState({
                cache: {
                    fetchedImageUrl: imageUrl,
                    fetchedAuthorImageUrl: authorImageUrl
                }
            });

        } catch (error) {
            console.error("Error fetching images:", error);
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

            if (this.state.content.image !== prevState.content?.image) {
                this.updateImage();
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
        const displayDateCreated = isoDateFormatToString(new Date(this.state.content.date_created));
        const authorName = this.state.content.author;
        const blogContentBody = this.state.content.body;
        const image = this.state.content.image && (<img className="blog-content__image" src={this.state.cache.fetchedImageUrl} />);

        return (
            <div className="blog-content">
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
                    <MarkdownRenderer markdown={blogContentBody} />
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
                </div>
            </div>
        )
    }
}

export default BlogContent;
