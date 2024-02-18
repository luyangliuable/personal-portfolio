import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";
import { useLocation } from 'react-router-dom';
import { isCenterAlignedWithViewport } from "../../../components/Utility/ScrollUtility";
import { IoMdArrowBack } from "react-icons/io";
import { IBlogContentState } from "./Interface/IBlogContentState";
import { EventEmitter } from 'events';
import PostRepository from "../../../repositories/PostRepository";
import MarkdownRendererV2 from "./MarkdownRendererV2/MarkdownRendererV2";
import SkeletonBlogContent from "./SkeletonBlogContent/SkeletonBlogContent";
import IBlogContentProps from "./Interface/IBlogContentProps";
import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";
import TableOfContent from "./TableOfContents/TableOfContents";
import Image from "../../../components/Image/Image";
import OpenGraphWrapper from "../../../wrappers/OpenGraphWrapper/OpenGraphWrapper";
import PostDetailsPanel from "./PostDetailsPanel/PostDetailsPanel";
import AuthorDetails from "./AuthorDetails/AuthorDetails";
import "./BlogContent.css";
import "./CodeBlock/CodeBlock.css";

const BlogContent: React.FC<IBlogContentProps> = ({ scrolled }) => {
    const postRepository = useMemo(() => PostRepository.getInstance(), []);
    const emitter = useMemo(() => new EventEmitter(), []);
    let location = useLocation();
    const [state, setState] = useState<IBlogContentState>({
        headings: [],
        cache: {
            fetchedImageUrl: "",
            fetchedAuthorImageUrl: "",
        }
    });

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setState((prev) => ({
            ...prev,
            content: undefined
        }));
        getBlogContentFromQuery();
    }, [location]);


    useEffect(() => {
        updatedRelatedPosts();
        updateBlogContentHeadings();
    }, [state.content]);


    useEffect(() => {
        observeSections();
    }, [scrolled]);


    function observeSections(): void {
        const sections = Array.from(document.querySelectorAll('.blog-section'));

        const intersectingSections = sections.filter(section => {
            const offset = isCenterAlignedWithViewport(section);
            return offset <= window.innerHeight && offset >= -window.innerHeight;
        }).map(section => section.id);

        if (intersectingSections.length > 0) {
            emitter.emit('intersectingSections', intersectingSections);
        }
    }


    const updateContentToDisplay = (content: BlogPostResponse): void => {
        setState((prev) => ({ ...prev, content: content }));
    }


    const updateBlogContentHeadings = (): void => {
        if (state.content !== undefined) {
            const renderer = new marked.Renderer();
            const originalHeadingRenderer = renderer.heading.bind(renderer);
            let headings: { title: string; level: number }[] = [];
            renderer.heading = (text, level) => {
                headings.push({ title: text, level: level });
                return originalHeadingRenderer(text, level);
            };
            marked(state.content?.body, { renderer });
            if (!headings) return;
            setState((prev) => ({ ...prev, headings: headings }));
        }
    }

    async function getBlogContentFromQuery(): Promise<void> {
        const searchParams: any = new URLSearchParams(window.location.search);

        const queryObj: any = {};
        for (let [key, value] of searchParams.entries()) {
            queryObj[key] = value;
        }

        postRepository
            .getPost(queryObj.id)
            .then((response: BlogPostResponse) => {
                updateContentToDisplay(response);
            });
    }


    async function updatedRelatedPosts(): Promise<void> {
        if (state.content === undefined) return;
        const { tags, _id } = state.content!;
        const relatedPosts = await postRepository.getRelatedPosts(tags, _id.$oid, 3);
        setState(prev => ({ ...prev, relatedPosts }));
    }


    function renderBlogContent(): React.ReactNode {
        if (state.content === undefined) return (<SkeletonBlogContent />);
        const { heading, image, body, _id } = state.content;
        const imageId = image?.$oid;

        return (
            <article className="blog-content box-shadow">
                <header className="blog-content__header">
                    <h1>{heading}</h1>
                    <AuthorDetails content={state.content} />
                </header>
                <Image className="blog-content__image" src={imageId} />
                <section className="w-full flex-col justify-center items-center translucent-white table-of-content--small-screen">
                    <TableOfContent className="w-80" headings={state.headings} />
                </section>
                <section className="blog-content-body">
                    <MarkdownRendererV2 key={_id.$oid} markdown={body} />
                </section>
            </article>
        );
    }


    const { relatedPosts, headings, content } = state;


    return (
        <OpenGraphWrapper
            heading="Luyang's Blogs"
            body="Blog posts for documenting useful code, mark memorable moments in my life and help my journey of endless self-improvement."
            imageUrl="https://w.wallhaven.cc/full/o5/wallhaven-o5wlp9.png"
        >
            <main className="page-container">
                <section className="blog-content__wrapper">
                    <PostDetailsPanel content={content} relatedPosts={relatedPosts} />
                    {renderBlogContent()}
                    <aside className="blog-content__side-components position-sticky mt-20vh">
                        <Link to="/digital_chronicles/blogs" className="flex items-center"><IoMdArrowBack />Back to Blogs</Link>
                        <TableOfContent emitter={emitter} headings={headings} />
                    </aside>
                </section>
            </main>
        </OpenGraphWrapper>
    );
}

export default BlogContent;
