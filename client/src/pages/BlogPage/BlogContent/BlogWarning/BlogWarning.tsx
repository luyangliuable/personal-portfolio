import React from "react";
import "./BlogWarning.css";
import { IoWarning } from "react-icons/io5";


const BlogWarning: React.FC<{ children: string }> = ({ children }) => {
    return (
        <div className="blog-warning position-relative">
            <h4 className="position-absolute">
                <IoWarning />
            </h4>
            {children}
        </div>
    )
}

export default BlogWarning;
