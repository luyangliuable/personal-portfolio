import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";

interface IBlogPageState {
    content: BlogPostResponse[],
    allTags: Set<string>,
    currentSelectTags: string[],
    topPickedPosts: BlogPostResponse[],
    render?: () => React.ReactElement<any, any>,
}

export { IBlogPageState }
