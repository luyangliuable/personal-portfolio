import BlogPostResponse from "../../../../repositories/Response/BlogPostResponse";

export type IBlogHeading = {
    title: string,
    level: number
}

export interface IBlogContentState {
    content: BlogPostResponse,
    headings: IBlogHeading[],
    activeSection: string[],
    cache: {
        fetchedImageUrl?: string,
        fetchedAuthorImageUrl?: string
    },
    render?: () => React.ReactElement<any, any>
}
