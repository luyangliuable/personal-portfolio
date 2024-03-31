import Repository from "./Repository";

class ImageRepository extends Repository {
    private static instance: ImageRepository | null = null;
    private cache = new Map<string, string>();
    private ongoingRequests = new Map<string, Promise<string>>();
    private static BASE_URL: string = `${process.env.REACT_APP_SERVER_BASE_URI}/api/image/` || "https://llcode.tech/api/image/";

    private constructor() { super(); }

    static getInstance(): ImageRepository {
        if (!ImageRepository.instance) ImageRepository.instance = new ImageRepository();
        return ImageRepository.instance;
    }

    async getImageById(idOrUrl: string): Promise<string> {
        if (idOrUrl === null) console.error("no image id provided");
        let url: string = idOrUrl;
        if (!idOrUrl.startsWith('http://') && !idOrUrl.startsWith('https://') && !idOrUrl.startsWith('/static')) url = `${ImageRepository.BASE_URL}${idOrUrl}`;
        if (this.cache.has(url)) return this.cache.get(url)!;
        if (this.ongoingRequests.has(url)) return this.ongoingRequests.get(url)!;
        const fetchImage = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                this.cache.set(url, imageURL);
                this.ongoingRequests.delete(url);
                return imageURL;
            } catch (error) {
                console.error('Error fetching image:', error, url);
                this.ongoingRequests.delete(url);
                throw error;
            }
        };
        const fetchPromise = fetchImage();
        this.ongoingRequests.set(url, fetchPromise);
        return fetchPromise;
    } catch(error: Error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}

export default ImageRepository;
