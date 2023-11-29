import React, { Component } from "react";
import "./SkeletonBlogContent.css";

class SkeletonBlogContent extends Component {
    constructor(props: {}) {
        super(props);
    }

    render(): React.ReactNode {
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
        )
    }
}

export default SkeletonBlogContent;
