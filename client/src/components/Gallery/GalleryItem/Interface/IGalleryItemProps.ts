import { CSSProperties } from 'react';

export default interface IGalleryItemProps {
  name?: string;
  subheading?: string;
  className?: string
  image?: string;
  description?: string;
  dateCreated?: string;
  minuteRead?: number;
  link?: string;
  type?: "blog" | "project" | "tool" | "url";
  key?: number | string;
  style?: CSSProperties;
  tags?: string[]
}
