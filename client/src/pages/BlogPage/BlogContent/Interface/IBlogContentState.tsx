import BlogPostResponse from "../../../../repositories/Response/BlogPostResponse";

export type IBlogHeading = {
    title: string,
    level: number
}

export interface IBlogContentState {
    content: BlogPostResponse,
    headings: IBlogHeading[],
    render?: () => React.ReactElement<any, any>
}
