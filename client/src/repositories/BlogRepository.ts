class BlogRepository {
    static BASE_URL: string = "https://llcode.tech/api/blogs";

    static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [category: string]: any }): any {
        return {
            method: method,
            cache: "no-cache",
            credentials: "same-origin",
            headers: {},
            body: JSON.stringify(body)
        }
    };


    static async getBlogList(): Promise<any> {
        const url = BlogRepository.BASE_URL;

        const options = BlogRepository.options("GET");
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
    }

    static async getBlog(id: string): Promise<any> {
        const url = `${BlogRepository.BASE_URL}/${id}`;

        const options = BlogRepository.options("GET");

        return fetch(url, options)
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
    }

}

export default BlogRepository;
