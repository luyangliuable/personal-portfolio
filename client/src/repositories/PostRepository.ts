class PostRepository {
  //"http://170.64.250.107/api/posts";
  static BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://localhost:8000/api/posts";

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


  static async getPostList(): Promise<any> {
    const url = PostRepository.BASE_URL;

    const options = PostRepository.options("GET");

    return fetch(url, options)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }

  static async getPost(id: string): Promise<any> {
    const url = `${PostRepository.BASE_URL}/${id}`;

    const options = PostRepository.options("GET");

    return fetch(url, options)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }

}

export default PostRepository;
