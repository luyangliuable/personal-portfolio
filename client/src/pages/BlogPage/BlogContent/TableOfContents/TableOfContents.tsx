import React from "react";
import ItableOfContentsProps from "./Interface/ItableOfContentsProps"
import { useEffect, useState } from "react";
import { stringToHash } from "../../../../components/Utility/StringUtility";
import "./TableOfContents.css";

const TableOfContents: React.FC<ItableOfContentsProps> = (props) => {
    const [tocEntries, setTocEntries] = useState<React.ReactElement[] | null>(null);
    const [listenTocItems, setlistenTocItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        renderTableOfContents();
    }, [props.headings]);

    useEffect(() => {
        listenSections();
    }, [tocEntries, props.emitter]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
        const allBlogSections = Array.from(document.querySelectorAll(".blog-section"));
        const targetElement = allBlogSections.find((section) => section.id === id);

        if (targetElement) {
            targetElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    };

    const renderTableOfContents = (): void => {
        const getTextColor = (level: number): string => {
            const lightness = level * 20;
            return `hsl(0, 0%, ${lightness}%)`;
        };
        const subheadings = props.headings?.filter(({ level }) => level !== 0);
        const renderedSubHeadings = subheadings?.map(({ title, level }, idx: number) => {
            const indentation = `${Math.max((level - 1), 0) * 20}px`;

            const marginBottom = `${(22 - 4.5 * level) / 2}px`;
            const color = getTextColor(level);
            const id = stringToHash(title);

            return (
                <div key={idx} id={id.toString()} className="section-toc-entry" style={{ color, margin: `${marginBottom} ${indentation}` }} onClick={(e) => handleClick(e, id.toString())}>
                    {title}
                </div>
            );
        })
        setTocEntries(renderedSubHeadings);
    }

    function listenSections(): void {
        if (tocEntries === null || props.emitter === undefined) return;
        if (listenTocItems.has('intersectingSectionsListener')) return;
        props.emitter.on('intersectingSections', (intersectingIds) => {
            setTocEntries((prev) => {
                return prev.map((tocEntry) => {
                    if (intersectingIds.includes(tocEntry.props.id)) {
                        return React.cloneElement(tocEntry, { className: "section-toc-entry toc-entry--active" });
                    }
                    return React.cloneElement(tocEntry, { className: "section-toc-entry" });
                });
            });
        });
        setlistenTocItems(prev => new Set(prev).add('intersectingSectionsListener'));
    }

    const className = ["table-of-contents", props.className].join(" ");

    return (
        <div className={className}>
            <h2>Table of Contents:</h2>
            {tocEntries}
        </div>
    )
}

export default TableOfContents;
