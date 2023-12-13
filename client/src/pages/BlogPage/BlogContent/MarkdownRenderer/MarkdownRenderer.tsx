import React, { useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Prism from "prismjs";

// import "prismjs/themes/prism-okaidia.css";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-toml';

import "./MarkdownRenderer.css";

type MarkdownRendererProps = {
    markdown: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
    const renderer = new marked.Renderer();

    useEffect(() => {
        Prism.highlightAll();
    }, [])

    function getIdFromHeading(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    renderer.heading = (text, level): string => {
        const className = `header-${level}`;
        const id = `${getIdFromHeading(text)}`;

        if (level !== 1)
            return `<h${level} id=${id} class="${className}">${text}</h${level}>`;
        else return "";
    };

    renderer.codespan = (code) => {
        return `<kbd style="background: #DDD; font-weight: 500; border: .2px solid #CCC; padding: 3px; font-size: 15px; margin-bottom: 3px; border-radius: 4px; color: #1e90ff">${code}</kbd>`;
    };

    renderer.blockquote = (quote) => {
        return `<blockquote class="blockquote">${quote}</blockquote>`;
    };

    // Override the code method to return a React component
    renderer.code = (code, language) => {
        if (language === "sh") {
            language = "bash";
        } else if (language === "rs") {
            language = "rust";
        } else if (language === "js") {
            language = "javascript";
        } else if (language === "py") {
            language = "python";
        }

        return `<div class="code-block--native__container"><pre class="code-block--native"><code class="language-${language}">${code}</code></pre></div>`;
    };

    renderer.strong = (text) => {
        return `<strong class="bold-text">${text}</strong>`;
    };

    renderer.em = (text) => {
        return `<em class="italic-text">${text}</em>`;
    };

    renderer.link = (href, title, text) => {
        const titleAttr = title ? ` title="${title}"` : '';
        return `<a href="${href}" class="markdown-link"${titleAttr}>${text}</a>`;
    };

    renderer.list = (body, ordered) => {
        const type = ordered ? 'ol' : 'ul';
        const className = ordered ? 'ordered-list' : 'unordered-list';
        return `<${type} class="${className}">${body}</${type}>`;
    };

    renderer.listitem = (text) => {
        return `<li class="list-item">${text}</li>`;
    };

    let html: string;

    try {
        html = DOMPurify.sanitize(marked.parse(markdown, { renderer }));
    } catch (error) {
        console.error('Error parsing markdown:', error);
        return null;
    }

    return (<div dangerouslySetInnerHTML={{ __html: html }} />);
};


export default MarkdownRenderer;
