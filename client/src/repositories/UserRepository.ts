import UserNameResponse from "../repositories/Response/UserNameResponse";

// TODO remove all anys
class PostRepository {
    // static BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "https://localhost:8000/api";
    static BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "https://llcode.tech/api";

    static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [category: string]: any }): any {
        return {
            method: method,
            cache: "no-cache",
            credentials: 'include',
            headers: {
                // 'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    };

    static async getUserName(): Promise<UserNameResponse> {
        const url = `${PostRepository.BASE_URL}/user`;
        const options = PostRepository.options("GET");
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw Error(error) });
    }

    static async login(logindetails: any): Promise<any> {
        const url = `${PostRepository.BASE_URL}/login`;
        const options = PostRepository.options("POST", logindetails);
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw error(error) });
    }

    static async register(registerdetails: any): Promise<any> {
        const url = `${PostRepository.BASE_URL}/register`;
        const options = PostRepository.options("POST", registerdetails);
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw error(error) });
    }

    static async logout(): Promise<any> {
        const url = `${PostRepository.BASE_URL}/logout`;
        const options = PostRepository.options("POST");
        return fetch(url, options)
    }

}

export default PostRepository;
