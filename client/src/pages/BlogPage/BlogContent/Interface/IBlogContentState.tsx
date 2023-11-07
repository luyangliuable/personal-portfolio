import BlogPostResponse from "../../../../repositories/Response/BlogPostResponse";

interface IBlogContentState {
    content: BlogPostResponse,
    headings: {
        title: string,
        level: number
    }[],
    render?: () => React.ReactElement<any, any>
}

export default IBlogContentState;
