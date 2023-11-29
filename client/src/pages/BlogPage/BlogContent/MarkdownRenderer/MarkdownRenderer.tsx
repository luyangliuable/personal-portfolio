import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

type MarkdownRendererProps = {
    markdown: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
    const renderer = new marked.Renderer();

    renderer.heading = (text, level) => {
        const className = `header-${level}`;
        return `<h${level} class="${className}">${text}</h${level}>`;
    };

    renderer.blockquote = (quote) => {
        return `<blockquote class="blockquote">${quote}</blockquote>`;
    };

    renderer.code = (code, language) => {
        const classAttr = language ? ` class="code-block language-${language}"` : ' class="code-block"';
        return `<pre${classAttr}><code>${code}</code></pre>`;
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

    return (<div dangerouslySetInnerHTML={ { __html: html } } />);
};


export default MarkdownRenderer;
