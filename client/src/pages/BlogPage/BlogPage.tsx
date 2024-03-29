import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { IBlogPageState } from "./Interface/IBlogPageState";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import PostRepository from "../../repositories/PostRepository";
import IHeroHeaderProps from "../../components/HeroHeader/Interface/IHeroHeaderProps";
import BlogPostResponse from "../../repositories/Response/BlogPostResponse";
import IBlogPageProps from "./Interface/IBlogPageProps";
import Card from "../../components/Card/Card";
import GalleryItem from "../../components/Gallery/GalleryItem/GalleryItem";
import BlogPostGraphics from "../../components/BlogPostGraphics/BlogPostGraphics";

import "./BlogPage.css";

class BlogPage extends Component<IBlogPageProps | any, IBlogPageState> {
    // Put any for props because for some reaosn i can't import `RouteComponentProps` for location
    postRepository: PostRepository;
    heroHeaderContent: IHeroHeaderProps;

    constructor(props: IBlogPageProps | any) {
        super(props);
        this.postRepository = PostRepository.getInstance();

        this.heroHeaderContent = Object.freeze({
            heading: "Blog Posts",
            description: "Blog posts for documenting useful code, mark memorable moments in my life and help my journey of endless self-improvement.",
        }); // as const

        this.state = {
            content: [],
            allTags: new Set(),
            currentSelectTags: [],
            topPickedPosts: []
        };
    }

    componentDidMount() {
        document.documentElement.scrollTo(0, 0);
        this.fetchPostList();
    }

    componentDidUpdate(prevProps: Readonly<IBlogPageProps>, prevState: Readonly<IBlogPageState>, snapshot?: any): void {
        if (prevState.content !== this.state.content) {
            this.updateAllUniqueTags();
            this.updateTopPickedPosts();
        }
    }

    async fetchPostList() {
        const response = await this.postRepository.getPostList();
        this.setState({
            content: response
        });
    }

    async updateAllUniqueTags() {
        const allPosts = this.state.content;
        const uniqueTags: Set<string> = new Set();

        allPosts.forEach(eachPost => {
            if (eachPost.tags) {
                eachPost.tags.forEach(tagItem => {
                    uniqueTags.add(tagItem);
                });
            }
        })

        this.setState({
            allTags: uniqueTags
        });
    }

    async updateTopPickedPosts() {
        const allPosts = this.state.content;
        const topPickedPosts: BlogPostResponse[] = [];

        allPosts.forEach(eachPost => {
            if (eachPost.is_featured) {
                topPickedPosts.push(eachPost);
            }
        });

        this.setState({
            topPickedPosts: topPickedPosts
        });
    }

    sortPostsByDate(posts: any[]): any[] {
        return posts.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    }

    groupPostsByYear(posts: any): any {
        return posts.reduce((groupedPosts: any, post: any) => {
            const year = new Date(post.date_created).getFullYear().toString();
            if (!groupedPosts[year]) {
                groupedPosts[year] = [];
            }
            groupedPosts[year].push(post);
            return groupedPosts;
        }, {});
    }

    renderPostsSortedByDateDescending = (): React.ReactNode => {
        const selectedTags = this.currentSelectedTags;
        const isSubset = (array1: string[], array2: string[]): boolean => {
            return array1.every(item => array2.includes(item));
        };
        // TODO: Backend send user image id and card gets it
        const authorImage = "https://llcode.tech/api/image/65817ae96c73ceb16ba51731";
        const groupedPosts = this.groupPostsByYear(this.sortPostsByDate(this.state.content).filter(({ tags }) => isSubset(selectedTags, tags) || !selectedTags));

        return Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
            <React.Fragment key={year}>
                <div className="blog__year position-relative"><span>{year}</span></div>
                {
                    groupedPosts[year].map((content: BlogPostResponse) => {
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

    renderTopPickedBlogPost = (): React.ReactNode | null => {
        return this.props.showTopPicks && (
            <div className="w-half flex-col items-start pl-3vw blog__featured">
                <h3>Top Picks</h3>
                {
                    this.state.topPickedPosts.map((post) => {
                        return (
                            <GalleryItem
                                key={post._id.$oid}
                                name={post.heading}
                                tags={post.tags}
                                type="blog"
                                dateCreated={post.date_created}
                                minuteRead={post.reading_time_minutes}
                                link={`/digital_chronicles/blog?id=${post._id.$oid}`}
                                image={post.image.$oid} />
                        )
                    })
                }
            </div>
        );
    }

    get currentSelectedTags(): string[] {
        const currentSearch = window.location.search;
        const queryParams = new URLSearchParams(currentSearch);
        const tag = queryParams.get('tag');
        const tagsIntoArr = tag ? tag.split(",") : [];
        return tagsIntoArr;
    }

    renderSelectedTags = (): React.ReactNode | null => {
        const baseUrlLink = "/digital_chronicles/blogs";
        return [...this.state.allTags]
            .filter(tagName => {
                const tagAlreadySelected = this.currentSelectedTags.includes(tagName);
                return tagAlreadySelected;
            })
            .map((tagName) => {
                let selectedTagsString: string[] = [];
                selectedTagsString = this.currentSelectedTags.filter(tag => tag !== tagName);
                const tagClassName = ['blog__tag', 'noselect', 'blog__tag--selected'].join(" ");
                const to = `${baseUrlLink}?tag=${encodeURIComponent(selectedTagsString.join(","))}`;
                return (
                    <Link to={to} key={tagName} className={tagClassName}>#{tagName}</Link>
                );
            })
    };

    renderUnSelectedTags = (): React.ReactNode | null => {
        const baseUrlLink = "/digital_chronicles/blogs";
        return [...this.state.allTags]
            .filter(tagName => !this.currentSelectedTags.includes(tagName))
            .map((tagName) => {
                let selectedTagsString: string[] = [];
                selectedTagsString = this.currentSelectedTags.concat(tagName);
                const to = `${baseUrlLink}?tag=${encodeURIComponent(selectedTagsString.join(","))}`;
                return (<Link to={to} key={tagName} className="blog__tag flex items-center justify-center noselect cursor-pointer">#{tagName}</Link>);
            });
    };

    render() {
        const heroHeading = this.heroHeaderContent.heading;
        const heroDescription = this.heroHeaderContent.description;
        const tagContainerClasses = [
            'position-sticky',
            'grid-background--dot',
            'flex',
            'flex-wrap',
            'justify-center',
            'blog__tag-container',
            'blog__tag-container--selected',
            "backdrop-blur-md",
            'w-80',
            'transition'
        ].join(' ');

        return (
            <main>
                <HeroHeader heading={heroHeading} description={heroDescription} graphics={<BlogPostGraphics />} />
                <article className="blog-container flex w-full cursor-pointer">
                    <section className="blog-list flex flex-col w-full items-center">
                        {this.currentSelectedTags.length > 0 && (<ul className={tagContainerClasses}>{this.renderSelectedTags()}</ul>)}
                        <ul className="blog__tag-container w-full flex justify-center flex-wrap">{this.renderUnSelectedTags()}</ul>
                        <div className="w-full flex flex-col items-center">{this.renderPostsSortedByDateDescending()}</div>
                    </section>
                    {this.renderTopPickedBlogPost()}
                </article>
            </main>
        );
    }
}

export default BlogPage;
