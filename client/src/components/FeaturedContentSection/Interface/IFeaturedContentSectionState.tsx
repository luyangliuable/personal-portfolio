import { blogContent } from "../../../pages/BlogPage/Interface/IBlogPageState";

interface IFeaturedContentSectionState {
    featuredPost?: blogContent;
    featuredTool?: {
        name: string,
        description: string,
        link: string
    }
}

export default IFeaturedContentSectionState;
