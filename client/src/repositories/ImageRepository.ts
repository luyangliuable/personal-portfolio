class ImageRepository {
    private static instance: ImageRepository | null = null;
    private cache = new Map<string, string>();
    private static BASE_URL: string = "http://llcode.tech/api/image/";

    private constructor() {}

    static getInstance(): ImageRepository {
        if (!ImageRepository.instance) {
            ImageRepository.instance = new ImageRepository();
        }
        return ImageRepository.instance;
    }

    async getImageById(idOrUrl: string | null): Promise<string> {
        if (idOrUrl === null) console.error("no image id provided");

        let url = idOrUrl;

        if (!idOrUrl.startsWith('http://') && !idOrUrl.startsWith('https://')) {
            url = `${ImageRepository.BASE_URL}${idOrUrl}`;
        }

        // Check if the URL is already cached
        if (this.cache.has(url)) {
            console.log(`Image URL is cached`);
            return this.cache.get(url)!;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const imageURL = URL.createObjectURL(blob);

            // Cache using the URL
            this.cache.set(url, imageURL);
            return imageURL;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }
}

export default ImageRepository;
