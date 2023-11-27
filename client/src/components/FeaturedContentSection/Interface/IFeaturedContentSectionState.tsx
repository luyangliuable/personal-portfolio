import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";

interface IFeaturedContentSectionState {
    featuredPosts?: BlogPostResponse[];
    numOfElementsToShow: number,
    featuredTool?: {
        name: string,
        description: string,
        link: string
    }
}

export default IFeaturedContentSectionState;
