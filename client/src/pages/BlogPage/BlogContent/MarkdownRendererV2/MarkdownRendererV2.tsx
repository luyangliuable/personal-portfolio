import React, { useEffect, useState } from 'react';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import html from 'remark-html';
import Prism from "prismjs";
import { getFirstTagName, extractAttributesFromHtmlElement } from "./utils/utils";
import sectionise from "./sectionisePlugin";
import reactComponentWhiteList from "./reactComponentWhiteList";

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-lisp';

import BlogPostGraphics from "../../../../components/BlogPostGraphics/BlogPostGraphics";

import "../MarkdownRenderer/MarkdownRenderer.css";

type MarkdownRendererProps = {
    markdown: string;
};


function customCodeBlockPlugin() {
    return (tree: any) => {
        visit(tree, 'inlineCode', (node) => {
            node.type = 'html';
            node.value = `<kbd style="background: #DDD; font-weight: 500; border: .2px solid #CCC; padding: 2px; font-size: .75rem; margin-bottom: 3px; border-radius: 4px; color: #1e90ff">${node.value}</kbd>`;
        });


        visit(tree, 'code', (node) => {
            let language = node.lang || 'unknown';
            const escapedCode = node.value.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            if (language === "sh") {
                language = "bash";
            } else if (language === "rs") {
                language = "rust";
            } else if (language === "js") {
                language = "javascript";
            } else if (language === "py") {
                language = "python";
            }

            node.type = 'html';
            node.value = `<div class="code-block--native__container"><pre class="code-block--native"><code class="language-${language}">${escapedCode}</code></pre></div>`;
        });
    };
}


const convertHtmlToReact = (htmlString: string): JSX.Element => {
    // All react component elements are to be wrapped in a div
    const container = document.createElement('div');
    container.innerHTML = htmlString;

    const processNodes = (node: any): any => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'div') {
            // Only convert one element inside the div to react component...
            const firstTag = getFirstTagName(node.innerHTML);
            if (firstTag && Object.keys(reactComponentWhiteList).includes(firstTag)) {
                const Component = reactComponentWhiteList[firstTag];
                const attributes = extractAttributesFromHtmlElement(node.innerHTML);
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

const MarkdownRendererV2: React.FC<MarkdownRendererProps> = ({ markdown }) => {
    const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(null);

    const processCallback = (err: any, file: any): undefined => {
        if (err) {
            console.error(err);
        } else {
            setRenderedContent(convertHtmlToReact(String(file)));
        }
        return;
    };

    useEffect(() => {
        remark()
            .use(customCodeBlockPlugin)
            .use(sectionise)
            .use(html, { sanitize: false })
            .process(markdown, processCallback)
    }, [markdown]);


    useEffect(() => {
        Prism.highlightAll();
    }, [renderedContent]);

    return (
        <>{renderedContent}</>
    );
};

export default MarkdownRendererV2;
