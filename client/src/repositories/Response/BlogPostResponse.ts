export default interface BlogPostResponse {
    _id?: {
        $oid: string
    };
    author: string;
    body: string;
    date_created?: string;
    file_name?: string;
    url?: string;
    heading: string;
    image?: {
        $oid: string
    }
    is_featured?: boolean;
    month?: number;
    post_type?: string;
    reading_time_minutes?: number;
    tags?: string[];
    year?: number
}
