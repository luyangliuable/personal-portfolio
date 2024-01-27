import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Prism from "prismjs";

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
/* import rehypeSanitize from 'rehype-sanitize'
* import rehypeStringify from 'rehype-stringify' */

import Image from "../../../../components/Image/Image"

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-lisp';

import BlogPostGraphics from "../../../../components/BlogPostGraphics/BlogPostGraphics";

import "./MarkdownRenderer.css";

type MarkdownRendererProps = {
    markdown: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
    const [content, setContent] = useState<JSX.Element | null>(null);

    const renderer = new marked.Renderer();

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
        return `<kbd style="background: #DDD; font-weight: 500; border: .2px solid #CCC; padding: 2px; font-size: .75rem; margin-bottom: 3px; border-radius: 4px; color: #1e90ff">${code}</kbd>`;
    };

    renderer.blockquote = (quote) => {
        return `<blockquote class="blockquote">${quote}</blockquote>`;
    };

    renderer.code = (code, language) => {
        const escapedCode = code.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        if (language === "sh") {
            language = "bash";
        } else if (language === "rs") {
            language = "rust";
        } else if (language === "js") {
            language = "javascript";
        } else if (language === "py") {
            language = "python";
        }

        return `<div class="code-block--native__container"><pre class="code-block--native"><code class="language-${language}">${escapedCode}</code></pre></div>`;
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

    renderer.paragraph = (text) => {
        return `<section>${text}</section>`;
    }

    renderer.list = (body, ordered) => {
        const type = ordered ? 'ol' : 'ul';
        const className = ordered ? 'ordered-list' : 'unordered-list';
        return `<${type} class="${className}">${body}</${type}>`;
    };

    renderer.listitem = (text) => {
        return `<li class="list-item">${text}</li>`;
    };

    type Attributes = { [key: string]: string };

    const extractAttributes = (html: string): Attributes => {
        const element = (new DOMParser()).parseFromString(html, "text/html").body.firstChild as HTMLElement | null;
        const attrs: Attributes = {};
        const attributeNameMap: { [key: string]: string } = {
            "class": "className"
        };

        if (element && element.attributes) {
            Array.from(element.attributes).forEach((attribute) => {
                const attributeName = attributeNameMap[attribute.name] || attribute.name;
                attrs[attributeName] = attribute.value;
            });
        }

        return attrs;
    };

    const allowedPlaceholders: { [key: string]: any } = {
        'blogpostgraphics': BlogPostGraphics,
        'img': Image,
    };

    const getFirstTagName = (html: string): string | null => {
        const matches = html.match(/<([a-z0-9]+)(\s|>)/i);
        return matches ? matches[1].toLowerCase() : null;
    };

    const convertHtmlToReact = (htmlString: string): JSX.Element => {
        const container = document.createElement('div');
        container.innerHTML = htmlString;

        const processNodes = (node: HTMLElement): any => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }

            if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'div') {
                const firstTag = getFirstTagName(node.innerHTML);
                if (firstTag && Object.keys(allowedPlaceholders).includes(firstTag)) {
                    const Component = allowedPlaceholders[firstTag];
                    const attributes = extractAttributes(node.innerHTML);
                    return React.createElement(Component, attributes);
                }
            }

            return node.outerHTML;
        };

        const elements = Array.from(container.childNodes).map(processNodes);

        return (
            <>
                {
                    elements.map((el, index) => {
                        const key = typeof el + index;
                        return typeof el === 'string'
                            ? React.createElement('div', { dangerouslySetInnerHTML: { __html: el }, key: key })
                            : React.cloneElement(el, { key: key });
                    })
                }
            </>
        );
    };

    useEffect(() => {
        try {
            let renderedHtml: string = marked.parse(markdown, { renderer });
            renderedHtml = DOMPurify.sanitize(renderedHtml);
            setContent(convertHtmlToReact(renderedHtml));
        } catch (error) {
            console.error('Error parsing markdown:', error);
        }
    }, []);

    useEffect(() => {
        Prism.highlightAll();
    }, [content]);

    return <div>{content}</div>;
};


export default MarkdownRenderer;
