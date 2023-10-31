import BlogPostResponse from "../../../repositories/Response/BlogPostResponse";

interface IFeaturedContentSectionState {
    featuredPost?: BlogPostResponse;
    featuredTool?: {
        name: string,
        description: string,
        link: string
    }
}

export default IFeaturedContentSectionState;
