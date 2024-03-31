import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";

interface IBlogPageState {
    content: BlogPostResponse[],
    currentlyShowingContent: {[category: number]: BlogPostResponse[]}[],
    allTags: Set<string>,
    currentSelectTags: string[],
    topPickedPosts: BlogPostResponse[],
    render?: () => React.ReactElement<any, any>,
}

export { IBlogPageState }
