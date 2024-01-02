export default interface ICardProps {
    heading: string;
    author?: string;
    authorImage?: string;
    minuteRead?: number;
    date_created?: string;
    date_updated?: string;
    link?: string;
    in_progress?: boolean;
    image?: string;
    body: string;
    tags?: string[]
}
