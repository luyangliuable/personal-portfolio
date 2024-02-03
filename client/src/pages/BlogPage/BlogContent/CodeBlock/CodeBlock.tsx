import React, { useEffect, useMemo, useRef } from 'react';
import "./CodeBlock.css"
import { FaRegCopy } from "react-icons/fa";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-lisp';


interface CodeBlockProps {
    lang?: string;
    filename?: string;
    children?: string
}


const CodeBlock: React.FC<CodeBlockProps> = ({ lang, children, filename }) => {

    const codeBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (filename !== undefined && codeBlockRef.current !== null) codeBlockRef
            .current!
            .style
            .setProperty("margin-top", "50px");
    }, [codeBlockRef.current, filename]);

    useEffect(() => {
        Prism.highlightAll();
    }, [children]);

    const language = useMemo(() => {
        if (lang === "sh") {
            return "bash";
        } else if (lang === "rs") {
            return "rust";
        } else if (lang === "js") {
            return "javascript";
        } else if (lang === "py") {
            return "python";
        }
    }, [children]);

    const cleanedChildren = children ? children.replace(/^\n/, ""): "";

    const copyToClipboard = () => {
        if (cleanedChildren) navigator.clipboard.writeText(cleanedChildren);
    };

    const langClass = lang ? `language-${language}` : "language-js";

    return (
        <div ref={codeBlockRef} className="code-block--native__container">
            {
                filename &&
                <div className="code-block--file-name w-full font-bold position-absolute">{filename}</div>
            }
            <div className="code-block--copy-button position-absolute cursor-pointer" onClick={() => copyToClipboard()}><FaRegCopy /></div>
            <pre className="code-block--native">
                <code className={langClass}>
                    {cleanedChildren}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
