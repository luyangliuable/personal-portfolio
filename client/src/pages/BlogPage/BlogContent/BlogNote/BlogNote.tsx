import React from "react";
import "./BlogNote.css";
import { IoIosInformationCircle } from "react-icons/io";


const BlogNote: React.FC<{ children: string }> = ({ children }) => {
    return (
        <div className="blog-note position-relative">
            <h4 className="position-absolute">
                <IoIosInformationCircle />
            </h4>
            {children}
        </div>
    )
}

export default BlogNote;
