class BlogRepository {
  static BASE_URL: string = "http://170.64.250.107/api/blogs";

  // constructor(locationData: any, enums: any) {
  //     // this.BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://127.0.0.1:8000/weather_api"
  // }

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
