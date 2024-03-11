import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { IBlogPageState } from "./Interface/IBlogPageState";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import PostRepository from "../../repositories/PostRepository";
import BlogPostResponse from "../../repositories/Response/BlogPostResponse";
import IBlogPageProps from "./Interface/IBlogPageProps";
import Card from "../../components/Card/Card";
import GalleryItem from "../../components/Gallery/GalleryItem/GalleryItem";
import BlogPostGraphics from "../../components/BlogPostGraphics/BlogPostGraphics";
import SmallCard from "../../components/Atoms/SmallCard/SmallCard";
import "./BlogPage.css";

const BlogPage: React.FC<IBlogPageProps> = (props) => {

    const postRepository = PostRepository.getInstance();

    const heroHeaderContent = Object.freeze({
        heading: "Blog Posts",
        description: "Blog posts for documenting useful code, mark memorable moments in my life and help my journey of endless self-improvement.",
    }); // as const

    const [state, setState] = useState<IBlogPageState>({
        content: [],
        currentlyShowingContent: [],
        allTags: new Set(),
        currentSelectTags: [],
        topPickedPosts: []
    });

    const isSubset = (array1: string[], array2: string[]): boolean => {return array1.every(item => array2.includes(item))};

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        fetchPostList();
        setState(prev => ({ ...prev, currentSelectTags: getCurrentSelectedTagsFromUrl() }));
    }, []);

    useEffect(() => {
        updateAllUniqueTags();
        updateTopPickedPosts();
    }, [state.content]);

    useEffect(() => {
        const selectedTags = getCurrentSelectedTagsFromUrl();
        const groupedPosts = groupPostsByYear(sortPostsByDate(state.content).filter(({ tags }) => isSubset(selectedTags, tags) || !selectedTags));
        setState(prev => ({ ...prev, currentlyShowingContent: groupedPosts }));
    }, [state.content, state.currentSelectTags]);

    const renderPostsSortedByDateDescending = (): React.ReactNode => {
        const authorImage = "https://llcode.tech/api/image/65817ae96c73ceb16ba51731";
        return Object.keys(state.currentlyShowingContent).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
            <React.Fragment key={year}>
                <div className="blog__year position-relative"><span>{year}</span></div>
                {
                    (state.currentlyShowingContent[parseInt(year)] as unknown as BlogPostResponse[]).map((content: BlogPostResponse) => {
                        const { _id, in_progress, heading, author, date_created, date_last_modified, body, reading_time_minutes, tags, image } = content;
                        const link = `/digital_chronicles/blog?id=${_id.$oid}`;
                        return (
                            <Card
                                key={_id.$oid}
                                heading={heading}
                                authorImage={authorImage}
                                author={author}
                                date_created={date_created}
                                date_updated={date_last_modified}
                                body={body}
                                minuteRead={reading_time_minutes}
                                in_progress={in_progress}
                                tags={tags}
                                image={image && image.$oid}
                                link={link} />
                        )
                    })
                }
            </React.Fragment>
        ));
    }

    async function fetchPostList() {
        const response = await postRepository.getPostList();
        setState(prev => ({ ...prev, content: response }));
    }

    async function updateAllUniqueTags() {
        const allPosts = state.content;
        const uniqueTags: Set<string> = new Set();
        allPosts.forEach(eachPost => {
            if (eachPost.tags) {
                eachPost.tags.forEach(tagItem => {
                    uniqueTags.add(tagItem);
                });
            }
        })
        setState(prev => ({ ...prev, allTags: uniqueTags }));
    }

    async function updateTopPickedPosts() {
        const allPosts = state.content;
        const topPickedPosts: BlogPostResponse[] = [];
        allPosts.forEach(eachPost => {
            if (eachPost.is_featured) {
                topPickedPosts.push(eachPost);
            }
        });
        setState(prev => ({ ...prev, topPickedPosts: topPickedPosts }));
    }

    const sortPostsByDate = (posts: any[]): any[] => {
        return posts.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    }

    const groupPostsByYear = (posts: any): any => {
        return posts.reduce((groupedPosts: any, post: any) => {
            const year = new Date(post.date_created).getFullYear().toString();
            if (!groupedPosts[year]) {
                groupedPosts[year] = [];
            }
            groupedPosts[year].push(post);
            return groupedPosts;
        }, {});
    }

    const renderTopPickedBlogPost = (): React.ReactNode | null => {
        const authorImage = "https://llcode.tech/api/image/65817ae96c73ceb16ba51731";
        return props.showTopPicks && (
            <div className="w-half flex-col items-start pl-3vw blog__featured">
                <h3>Top Picks</h3>
                {
                    state.topPickedPosts.map((post) => {
                        const link = `/digital_chronicles/blog?id=${post._id.$oid}`;
                        return (
                            <SmallCard
                                authorImage={authorImage}
                                author={post.author}
                                link={link}
                                heading={post.heading}
                                image={post.image.$oid}
                                body=""
                            />
                        )
                    })
                }
            </div>
        );
    }

    const getCurrentSelectedTagsFromUrl = (): string[] => {
        const currentSearch = window.location.search;
        const queryParams = new URLSearchParams(currentSearch);
        const tag = queryParams.get('tag');
        const tagsIntoArr = tag ? tag.split(",") : [];
        return tagsIntoArr;
    }

    const renderUnSelectedTags = (): React.ReactNode | null => {
        const baseUrlLink = "/digital_chronicles/blogs";
        const selectedTags = getCurrentSelectedTagsFromUrl();

        return [...state.allTags]
            .map((tagName) => {
                let selectedTagsString: string[] = [];
                selectedTagsString = selectedTags.concat(tagName);
                let to = `${baseUrlLink}?tag=${encodeURIComponent(selectedTagsString.join(","))}`;

                if (state.currentSelectTags.includes(tagName)) {
                    selectedTagsString = selectedTags.filter(tag => tag !== tagName);
                    to = `${baseUrlLink}?tag=${encodeURIComponent(selectedTagsString.join(","))}`;
                    return (<Link onClick={() => {
                        const newTags = state.currentSelectTags.filter((tag) => tag !== tagName);
                        setState(prev => ({ ...prev, currentSelectTags: newTags }));
                    }} to={to} key={tagName} className="blog__tag noselect blog__tag--selected">#{tagName}</Link>);
                }

                if (state.content.filter(({ tags }) => isSubset([...selectedTags, tagName], tags) || ![...selectedTags, tagName]).length === 0) {
                    selectedTagsString = getCurrentSelectedTagsFromUrl();
                    to = `${baseUrlLink}?tag=${encodeURIComponent(selectedTagsString.join(","))}`;
                    return (<Link to={to} key={tagName} className="blog__tag noselect blog__tag--disabled">#{tagName}</Link>);
                }

                return (<Link onClick={() => {
                    const newTags = state.currentSelectTags.concat(tagName);
                    setState(prev => ({ ...prev, currentSelectTags: newTags }));
                }} to={to} key={tagName} className="blog__tag flex items-center justify-center noselect cursor-pointer">#{tagName}</Link>);
            });
    };

    const heroHeading = heroHeaderContent.heading;
    const heroDescription = heroHeaderContent.description;

    return (
        <main>
            <HeroHeader heading={heroHeading} description={heroDescription} graphics={<BlogPostGraphics />} />
            <article className="blog-container flex w-full cursor-pointer">
                <section className="blog-list flex flex-col w-full items-center">
                    <ul className="blog__tag-container w-full flex justify-center flex-wrap">{renderUnSelectedTags()}</ul>
                    <div className="w-full flex flex-col items-center">{renderPostsSortedByDateDescending()}</div>
                </section>
                {renderTopPickedBlogPost()}
            </article>
        </main>
    );
}

export default React.memo(BlogPage);
