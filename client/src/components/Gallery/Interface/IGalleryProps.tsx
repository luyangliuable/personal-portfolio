type GalleryItem = {
    name: string,
    description: string,
    image: string,
    link?: string,
    isLogo?: boolean,
    tags?: string[]
}

interface IGalleryProps {
    content: GalleryItem[];
    heading: string
}


export { GalleryItem, IGalleryProps }
