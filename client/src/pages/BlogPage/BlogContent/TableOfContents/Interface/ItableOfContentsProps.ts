import { IBlogHeading } from "../../Interface/IBlogContentState";
 
export default interface ItableOfContentsProps {
    headings?: IBlogHeading[];
    activeSectionIds?: string[];
    className?: string
}
