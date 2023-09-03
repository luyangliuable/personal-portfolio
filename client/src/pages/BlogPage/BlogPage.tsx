import { Component } from "react";
import "./BlogPage.css";
import PostRepository from "../../repositories/PostRepository";
import { IBlogPageState } from "./Interface/IBlogPageState";
import IBlogPageProps from "./Interface/IBlogPageProps";
import Card from "../../components/Card/Card";

class BlogPage extends Component<IBlogPageProps, IBlogPageState> {
    
    constructor(props: IBlogPageProps) {
        super(props);
        this.state = {
            content: []
        };
    }

    /**
     * Fetch the post list once the component mounts.
     */
    componentDidMount() {
        this.fetchPostList();
    }

    /**
     * Fetch the post list from the repository and update the state.
     */
    async fetchPostList() {
        const response = await PostRepository.getPostList();
        this.setState({
            content: response
        });
    }

    /**
     * Sort the posts in descending order by date created.
     * @param posts The array of posts to sort.
     */
    sortPostsByDate(posts: any[]): any[] {
        return posts.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    }

    render() {
        return (
            <div className="blog-container cursor-pointer">
                {this.sortPostsByDate(this.state.content).map((content, idx) => (
                    <Card
                        key={content._id.$oid}
                        heading={content.heading}
                        author={content.author}
                        date_created={content.date_created}
                        body={content.body}
                        link={`/digital_chronicles/blog?id=${content._id.$oid}`}
                    />
                ))}
            </div>
        );
    }
}

export default BlogPage;
