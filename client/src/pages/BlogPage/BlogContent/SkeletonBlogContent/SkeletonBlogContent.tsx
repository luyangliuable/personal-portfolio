import React from "react";
import "./SkeletonBlogContent.css";

const SkeletonBlogContent: React.FC = () => {
    return (
        <div className="skeleton-blog-content">
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
            <div className="skeleton-blog-content__square skeleton-blog-content__item"></div>
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
            <br /><br />
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
            <div className="skeleton-blog-content__line skeleton-blog-content__item"></div>
        </div>
    );
}

export default SkeletonBlogContent;
