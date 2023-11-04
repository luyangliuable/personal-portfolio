import { CSSProperties } from 'react';

export default interface IGalleryItemProps {
    name?: string;
    subheading?: string;
    image?: string;
    description?: string;
    link?: string;
    key?: number | string;
    style?: CSSProperties
}
