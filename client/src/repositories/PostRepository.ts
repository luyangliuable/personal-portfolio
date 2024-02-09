import BlogPostResponse from "./Response/BlogPostResponse";
import Repository from "./Repository";

class PostRepository extends Repository {
    private static instance: PostRepository;
    private static postListCache: any[] | null = null;
    static BASE_URL: string = `${process.env.REACT_APP_SERVER_BASE_URI}/api/posts/` || "https://llcode.tech/api/posts";

    private constructor() { super(); }

    static getInstance(): PostRepository {
        if (!PostRepository.instance) PostRepository.instance = new PostRepository();
        return PostRepository.instance;
    }

    sortPostsByDate(posts: BlogPostResponse[], type?: "asc" | "desc"): BlogPostResponse[] {
        return [...posts].sort((a, b) => {
            const dateA = new Date(a.date_created).getTime();
            const dateB = new Date(b.date_created).getTime();
            return type === "asc" ? dateA - dateB : dateB - dateA;
        });
    }

    async getFeaturedPostList(): Promise<BlogPostResponse[]> {
        const postList = await this.getPostList();
        const featuredPosts = postList.filter((post: BlogPostResponse) => post.is_featured);
        return this.sortPostsByDate(featuredPosts);
    }

    async getRelatedPosts(tags: string[], currentPostId: string, numberOfResults: number = 3): Promise<BlogPostResponse[]> {
        try {
            const allPosts = await this.getPostList();
            const postsWithCommonTags = allPosts.map((post: BlogPostResponse) => ({
                post,
                commonTags: post.tags.filter((tag: string) => tags.includes(tag)).length,
            }));
            postsWithCommonTags.sort((a: any, b: any) => b.commonTags - a.commonTags);
            return postsWithCommonTags.slice(0, numberOfResults + 1).map((item: any) => item.post).filter((post: BlogPostResponse) => post._id.$oid !== currentPostId);
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getPostList(): Promise<BlogPostResponse[]> {
        if (PostRepository.postListCache) return Promise.resolve(PostRepository.postListCache);
        const url = PostRepository.BASE_URL;
        const options = PostRepository.options("GET");
        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                PostRepository.postListCache = this.sortPostsByDate(data);
                return PostRepository.postListCache;
            })
            .catch(error => {
                console.error('Error:', error)
                return [];
            });
    }

    async getPost(id: string): Promise < BlogPostResponse > {
    const url = `${PostRepository.BASE_URL}/${id}`;
    const options = PostRepository.options("GET");
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}
}

export default PostRepository;
