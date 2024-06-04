import React, { useState, useEffect } from 'react';
import "./BlogPostGraphics.css";

const BlogPostGraphics: React.FC<{}> = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) {
        return null; // Or a loading spinner, or a placeholder
    }

    return (
        <div className="blog-graphics">
            <div className="blog-graphics__paper">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="paper -two"></div>
        </div>
    );
}

export default BlogPostGraphics;
