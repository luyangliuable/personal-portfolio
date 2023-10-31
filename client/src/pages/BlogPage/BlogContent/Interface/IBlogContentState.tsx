import BlogPostResponse from "../../../../repositories/Response/BlogPostResponse";

interface IBlogContentState {
    content: BlogPostResponse,
    render?: () => React.ReactElement<any, any>
}

export default IBlogContentState;
