import React, { Component} from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";
import PostRepository from "../../../repositories/PostRepository";
import { IoMdArrowBack } from "react-icons/io";
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
import OpenGraphWrapper from "../../../wrappers/OpenGraphWrapper/OpenGraphWrapper";
import "./BlogContent.css";

class BlogContent extends Component<IBlogContentProps, IBlogContentState> {
    jsonToMarkdown: JsonToMarkdown;
    defaultAuthorImage: string =
        "http://llcode.tech/api/image/65817ae96c73ceb16ba51731";
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
                fetchedAuthorImageUrl: "",
            }
        };
    }

    updateContentToDisplay(content: BlogPostResponse): void {
        this.setState({
            ...this.state,
            content: content,
        });
    }

    updateBlogContentHeadings() {
        const renderer = new marked.Renderer();
        const originalHeadingRenderer = renderer.heading.bind(renderer);

        let headings: { title: string; level: number }[] = [];

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

        this.postRepository
            .getPost(queryObj.id)
            .then((response: BlogPostResponse) => {
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
            const { body, tags} = this.state.content;

            if (body !== prevState.content?.body) {
                this.updateBlogContentHeadings();
            } else if (tags !== prevState.content?.tags) {
                this.updatedRelatedPosts();
            }
        }
    }

    async updatedRelatedPosts(): Promise<void> {
        if (this.state.content === undefined) {
            return;
        }

        const { tags, _id } = this.state.content;

        this.setState({
            relatedPosts: await this.postRepository.getRelatedPosts(tags, _id.$oid, 3)
        });

    }

    renderTableOfContents(): React.ReactNode {
        function getTextColor(level: number): string {
            const lightness = level * 20;
            return `hsl(0, 0%, ${lightness}%)`;
        }

        const subheadings = this.state.headings?.filter(
            ({ title, level }) => level !== 0
        );

        return subheadings?.map(({ title, level }, idx: number) => {
            const indentation = `${level * 20}px`;
            const marginBottom = `${12 - 4.5 * level}px`;
            const color = getTextColor(level);

            return (
                <span
                    key={idx}
                    style={{
                        color: color,
                        marginLeft: indentation,
                        marginBottom: marginBottom,
                    }}
                >
                    {title}
                </span>
            );
        });
    }

    renderBlogContent(): React.ReactNode {
        if (this.state.content === undefined) {
            return (<SkeletonBlogContent />);
        }

        const { heading, date_created, tags, image, body, author } = this.state.content;
        const displayDateCreated = isoDateFormatToString(new Date(date_created));
        const imageId = image?.$oid;

        return (
            <div className="blog-content box-shadow">
                <div className="blog-content__header">
                    <h1>{heading}</h1>
                    <div className="flex">
                        <Image
                            className="user-image blog-content--author-image"
                            src={this.defaultAuthorImage}
                        />
                        <div className="flex-vertical">
                            <span>{author}</span>
                            <span>{displayDateCreated}</span>
                        </div>
                    </div>
                </div>
                <Image className="blog-content__image" src={imageId} />
                <div className="w-full flex-col justify-center items-center translucent-white table-of-content--small-screen">
                    <TableOfContent className="w-80" headings={this.state.headings} />
                </div>
                <div className="blog-content-body">
                    <MarkdownRenderer markdown={body} />
                </div>
            </div>
        );
    }

    renderAuthorDetails(): React.ReactNode {
        if (this.state.content === undefined) {
            return (<SkeletonBlogContent />);
        }

        const { date_created, author } = this.state.content!;
        const displayDateCreated = isoDateFormatToString(new Date(date_created));

        return (
            <>
                <h3>Posted by</h3>
                <div className="flex">
                    <Image
                        className="user-image blog-content--author-image"
                        src={this.defaultAuthorImage}
                    />
                    <div className="flex-vertical">
                        <b>{author}</b>
                        <span>{displayDateCreated}</span>
                    </div>
                </div>
            </>
        )
    }

    renderRelatedPosts(): React.ReactNode {
        if (this.state.relatedPosts === undefined) {
            return <SkeletonBlogContent />;
        }

        try {
            const relatedPosts = this.state.relatedPosts;

            return (
                <div>
                    <h3>Related Posts</h3>
                    {
                        relatedPosts.map((post: BlogPostResponse, idx: number) => {
                            const { heading, author } = post;
                            return (
                                <Link className="w-80" to={null} key={idx}>
                                    <h4 className="mb-0">{heading}</h4>
                                    <p className="m-0">{author}</p>
                                </Link>
                            )
                        })}
                </div>
            );
        } catch (error) {
            console.error('Error fetching related posts:', error);
            return <p>Error loading related posts.</p>;
        }
    }

    renderBlogTags(): React.ReactNode {
        if (this.state.content === undefined) {
            return (<SkeletonBlogContent />);
        }

        const { tags } = this.state.content;

        return (
            <div>
                <h3>Tags</h3>
                <TagCloud tags={tags} />
            </div>
        );
    }

    render() {
        return (
            <OpenGraphWrapper
                heading="Luyang's Blogs"
                body="Blog posts for documenting useful code, mark memorable moments in my life and help my journey of endless self-improvement."
                imageUrl="https://w.wallhaven.cc/full/o5/wallhaven-o5wlp9.png"
            >
                <div className="page-container">
                    <div className="blog-content__wrapper">
                        <div className="blog-content__side-components flex flex-col items-start mt-10">
                            <br />
                            <hr />
                            {this.renderAuthorDetails()}
                            <br />
                            <hr />
                            {this.renderRelatedPosts()}
                            <br />
                            <hr />
                            <div className="w-80">{this.renderBlogTags()}</div>
                            <br />
                            <hr />
                            <a href="https://ko-fi.com/D1D1PFTTH" target="_blank" rel="noopener noreferrer">
                                <img height="36" style={{ border: "0px", height: "36px" }} src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Buy Me a Coffee at ko-fi.com" />
                            </a>
                        </div>
                        <div></div>
                        {this.renderBlogContent()}
                        <div className="blog-content__side-components position-sticky  mt-20vh">
                            <div>
                                <Link to="/digital_chronicles/blogs" className="flex items-center"><IoMdArrowBack /> Back to Blogs</Link>
                            </div>
                            <TableOfContent headings={this.state.headings} />
                        </div>
                    </div>
                </div>
            </OpenGraphWrapper>
        );
    }
}

export default BlogContent;
