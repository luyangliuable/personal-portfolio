class Repository {
    static options(method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: { [key: string]: any }): any {
        return {
            method: method,
            cache: 'no-cache',
            credentials: 'same-origin',
            body: body
        };
    }
}

export default Repository;
