import UserNameResponse from "../repositories/Response/UserNameResponse";
import Repository from "./Repository";

class UserRepository extends Repository {
    static BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "https://llcode.tech/api";

    private constructor() { super(); }


    static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [category: string]: any }): any {
        return {
            method: method,
            cache: "no-cache",
            credentials: 'include',
            headers: {},
            body: JSON.stringify(body)
        }
    };

    static async getUserName(): Promise<UserNameResponse> {
        const url = `${UserRepository.BASE_URL}/user`;
        const options = UserRepository.options("GET");
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw Error(error) });
    }

    static async login(logindetails: any): Promise<any> {
        const url = `${UserRepository.BASE_URL}/login`;
        const options = UserRepository.options("POST", logindetails);
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw error(error) });
    }

    static async register(registerdetails: any): Promise<any> {
        const url = `${UserRepository.BASE_URL}/register`;
        const options = UserRepository.options("POST", registerdetails);
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => { throw error(error) });
    }

    static async logout(): Promise<any> {
        const url = `${UserRepository.BASE_URL}/logout`;
        const options = UserRepository.options("POST");
        return fetch(url, options)
    }

}

export default UserRepository;
