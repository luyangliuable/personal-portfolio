type GalleryItem = {
    name: string,
    description: string,
    image: string,
    link?: string,
    isLogo?: boolean
}

interface IGalleryProps {
    content: GalleryItem[];
    heading: string
}


export { GalleryItem, IGalleryProps }
