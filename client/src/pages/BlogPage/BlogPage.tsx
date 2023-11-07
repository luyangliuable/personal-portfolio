import { Component } from "react";
import "./BlogPage.css";
import PostRepository from "../../repositories/PostRepository";
import { IBlogPageState } from "./Interface/IBlogPageState";
import BlogPostResponse from "../../repositories/Response/BlogPostResponse";
import IBlogPageProps from "./Interface/IBlogPageProps";
import Card from "../../components/Card/Card";
import GalleryItem from "../../components/Gallery/GalleryItem/GalleryItem";

class BlogPage extends Component<IBlogPageProps, IBlogPageState> {

    constructor(props: IBlogPageProps) {
        super(props);
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
        if (prevState.content != this.state.content) {
            this.updateAllUniqueTags();
            this.updateTopPickedPosts();
        }
    }

    async fetchPostList() {
        const response = await PostRepository.getPostList();
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

    getContrastTextColor(hexColor: string): string {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        return luminance > 0.5 ? '#000' : '#FFF';
    }

    sortPostsByDate(posts: any[]): any[] {
        return posts.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    }

    stringToColour = (str: string) => {
        const seed = "ramen, noodles, sushi, pizza, gym";

        let hash = 0;
        str = str + seed;

        str.split('').forEach(char => {
            hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })
        let colour = '#'
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff
            colour += value.toString(16).padStart(2, '0')
        }
        return colour
    }

    renderPostsSortedByDateDescending = (): React.ReactNode => {
        return this.sortPostsByDate(this.state.content).map((content, idx) => (
            <Card
                key={content._id.$oid}
                heading={content.heading}
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
                                    link={`/digital_chronicles/blog?id=${post._id.$oid}`}
                                    image={imageURL} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }


    renderTags = (): React.ReactNode | null => {
        return [...this.state.allTags].map((tagName) => {
            const bgColor = this.stringToColour(`#${tagName}`);
            const textColor = this.getContrastTextColor(bgColor);
            const boxShadow = `1px 1px 4px ${bgColor}`;
            return (
                <span key={tagName} className="blog__tag" style={{ background: bgColor, color: textColor, boxShadow: boxShadow }}>#{tagName}</span>
            );
        })
    };


    render() {
        return (
            <div className="blog-container cursor-pointer">
                <div className="blog-list">
                    <div className="blog__tag-container">
                        {this.renderTags()}
                    </div>
                    {this.renderPostsSortedByDateDescending()}
                </div>

                {this.renderTopPickedBlogPost()}
            </div>
        );
    }
}

export default BlogPage;
