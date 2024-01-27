import { IBlogHeading } from "../../Interface/IBlogContentState";
import { EventEmitter } from 'events';
 
export default interface ItableOfContentsProps {
    headings?: IBlogHeading[];
    emitter?: EventEmitter,
    activeSectionIds?: string[];
    className?: string
}
