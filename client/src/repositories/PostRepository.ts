import BlogPostResponse from "./Response/BlogPostResponse";

class PostRepository {
    private static instance: PostRepository;
    private static postListCache: any[] | null = null;

    static BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://llcode.tech/api/posts";

    private constructor() {}

    static getInstance(): PostRepository {
        if (!PostRepository.instance) {
            PostRepository.instance = new PostRepository();
        }
        return PostRepository.instance;
    }

    private static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [category: string]: any }): any {
        return {
            method: method,
            cache: "no-cache",
            credentials: "same-origin",
            body: JSON.stringify(body)
        }
    }


    async getFeaturedPostList(): Promise<any> {
        const postList = await this.getPostList();
    }

    async getPostList(): Promise<any> {
        if (PostRepository.postListCache) {
            return Promise.resolve(PostRepository.postListCache);
        }

        const url = PostRepository.BASE_URL;
        const options = PostRepository.options("GET");

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                PostRepository.postListCache = data;
                return data;
            })
            .catch(error => console.error('Error:', error));
    }

    async getPost(id: string): Promise<BlogPostResponse> {
        const url = `${PostRepository.BASE_URL}/${id}`;
        const options = PostRepository.options("GET");

        return fetch(url, options)
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
    }
}

export default PostRepository;
