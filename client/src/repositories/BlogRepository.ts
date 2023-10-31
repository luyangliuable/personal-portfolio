class BlogRepository {
    // static BASE_URL: string = "http://localhost:8000/api/blogs";
    static BASE_URL: string = "http://170.64.250.107/api/blogs";

    static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [category: string]: any }): any {
        return {
            method: method,
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                // 'Content-Type': 'application/json',
            },
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
