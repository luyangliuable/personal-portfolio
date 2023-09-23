class PostRepository {
    static BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://llcode.tech/api";
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

    static async getUserDetails(userId: string): Promise<any> {
        const url = `${PostRepository.BASE_URL}/login`;
        const options = PostRepository.options("POST");
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw Error(error) });
    }

    static async login(loginDetails: any): Promise<any> {
        const url = `${PostRepository.BASE_URL}/login`;
        const options = PostRepository.options("POST", loginDetails);
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw Error(error) });
    }

}

export default PostRepository;
