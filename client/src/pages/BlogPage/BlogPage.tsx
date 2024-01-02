import { Component } from "react";
import "./BlogPage.css";
import PostRepository from "../../repositories/PostRepository";
import { IBlogPageState } from "./Interface/IBlogPageState";
import BlogPostResponse from "../../repositories/Response/BlogPostResponse";
import IBlogPageProps from "./Interface/IBlogPageProps";
import Card from "../../components/Card/Card";
import GalleryItem from "../../components/Gallery/GalleryItem/GalleryItem";
import { Link } from 'react-router-dom';

class BlogPage extends Component<IBlogPageProps | any, IBlogPageState> {
    // Put any for props because for some reaosn i can't import `RouteComponentProps` for location

    postRepository: PostRepository;

    constructor(props: IBlogPageProps | any) {
        super(props);

        this.postRepository = PostRepository.getInstance();

        this.state = {
            content: [],
            allTags: new Set(),
            currentSelectTags: [],
            topPickedPosts: []
        };
    }

    componentDidMount() {
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

    renderPostsSortedByDateDescending = (): React.ReactNode => {
        const selectedTags = this.currentSelectedTags;

        const isSubset = (array1: string[], array2: string[]) => {
            return array1.every(item => array2.includes(item));
        }

        // TODO: Backend send user image id and card gets it
        const authorImage = "http://llcode.tech/api/image/65817ae96c73ceb16ba51731";

        return this.sortPostsByDate(this.state.content).filter(({ tags }) => isSubset(selectedTags, tags) || !selectedTags).map((content, _) => (
            <Card
                key={content._id.$oid}
                heading={content.heading}
                authorImage={authorImage}
                author={content.author}
                date_created={content.date_created}
                body={content.body}
                minuteRead={content.reading_time_minutes}
                tags={content.tags}
                image={content.image && content.image.$oid}
                link={`/digital_chronicles/blog?id=${content._id.$oid}`}
            />
        ));
    }

    renderTopPickedBlogPost = (): React.ReactNode | null => {
        return this.props.showTopPicks && (
            <div className="blog__featured">
                <h3>Top Picks</h3>
                {
                    this.state.topPickedPosts.map((post) => {
                        const imageURL = `http://llcode.tech/api/image/${post.image.$oid}`
                        return (
                            <div key={post._id.$oid}>
                                <GalleryItem
                                    name={post.heading}
                                    tags={post.tags}
                                    type="blog"
                                    dateCreated={post.date_created}
                                    minuteRead={post.reading_time_minutes}
                                    link={`/digital_chronicles/blog?id=${post._id.$oid}`}
                                    image={imageURL} />
                            </div>
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
            .filter(tagName => {
                const tagAlreadySelected = this.currentSelectedTags.includes(tagName);
                return !tagAlreadySelected;
            })
            .map((tagName) => {
                let selectedTagsString: string[] = [];
                selectedTagsString = this.currentSelectedTags.concat(tagName);
                const tagClassName = ['blog__tag', 'noselect'].join(" ");
                const to = `${baseUrlLink}?tag=${encodeURIComponent(selectedTagsString.join(","))}`;
                return (
                    <Link to={to} key={tagName} className={tagClassName}>#{tagName}</Link>
                );
            });
    };


    render() {
        return (
            <div className="blog-container cursor-pointer">
                <div className="blog-list">
                {this.currentSelectedTags.length > 0 && (<div className="grid-background--dot blog__tag-container--selected">{this.renderSelectedTags()}</div>)}
                <div className="blog__tag-container"> {this.renderUnSelectedTags()}</div>
                <div className="blog__year">
                <span>2023</span>
                </div>
                <div className="blog-list__content flex-column-centered-centered">
                {this.renderPostsSortedByDateDescending()}
            </div>
                </div>

                {this.renderTopPickedBlogPost()}
            </div>
        );
    }
}

export default BlogPage;
