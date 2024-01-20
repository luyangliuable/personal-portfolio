import BlogPostResponse from "./Response/BlogPostResponse";

class PostRepository {
  private static instance: PostRepository;
  private static postListCache: any[] | null = null;

  static BASE_URL: string = `${process.env.REACT_APP_SERVER_BASE_URI}/api/posts/` || "http://llcode.tech/api/posts";

  private constructor() {}

  static getInstance(): PostRepository {
    if (!PostRepository.instance) {
      PostRepository.instance = new PostRepository();
    }
    return PostRepository.instance;
  }

  private static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [key: string]: any }): any {
    return {
      method: method,
      // headers: {
      //     'Content-Type': 'application/json',
      // }, //TODO
      cache: 'no-cache',
      credentials: 'same-origin',
      body: body ? JSON.stringify(body) : null
    };
  }

  sortPostsByDate(posts: any[], type?: "asc" | "desc"): any[] {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date_created).getTime();
      const dateB = new Date(b.date_created).getTime();

      return type === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  async getFeaturedPostList(): Promise<any> {
    const postList = await this.getPostList();
    return this.sortPostsByDate(postList);
  }

  async getRelatedPosts(tags: string[], currentPostId: string, numberOfResults: number = 3): Promise<BlogPostResponse[]> {
    try {
      const allPosts = await this.getPostList();

      const postsWithCommonTags = allPosts.map((post: BlogPostResponse) => ({
        post,
        commonTags: post.tags.filter((tag: string) => tags.includes(tag)).length,
      }));

      postsWithCommonTags.sort((a: any, b: any) => b.commonTags - a.commonTags);

      // +1 because excluded self
      return postsWithCommonTags.slice(0, numberOfResults + 1).map((item: any) => item.post).filter((post: BlogPostResponse) => post._id.$oid !== currentPostId);
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
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

