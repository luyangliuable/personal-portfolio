import React from "react";
import ItableOfContentsProps from "./Interface/ItableOfContentsProps"
import { useEffect, useState, useRef, RefObject } from "react";
import { stringToHash } from "../../../../components/Utility/StringUtility";
import "./TableOfContents.css";

const TableOfContents: React.FC<ItableOfContentsProps> = (props) => {
    const [tocEntries, setTocEntries] = useState<JSX.Element[] | null>(null);
    const [tocEntryRef, setTocEntryRef] = useState<RefObject<HTMLElement>[]>([]);
    const [listenTocItems, setlistenTocItems] = useState<Set<string>>(new Set());
    const tocMarkerPathRef: RefObject<SVGPathElement> = useRef(null);

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
        if (renderedSubHeadings) {
            setTocEntries(renderedSubHeadings);
            setTocEntryRef(renderedSubHeadings.map(() => React.createRef<any>()));
        }
    }


    const drawPath = () => {
        var tocPath = tocMarkerPathRef.current;
        var path = [];
        let height = 0;
        let startHeight = 70;
        let startIdx = -1;

        tocEntries!.forEach((entry, idx) => {
            if (entry.props.className.includes('active')) {
                if (startIdx === -1) startIdx = idx;
                const computedStyle = window.getComputedStyle(tocEntryRef[idx].current!);
                height += parseInt(computedStyle.height) + 15;
            }
        });


        tocEntries!.forEach((entry, idx) => {
            if (idx < startIdx) {
                const computedStyle = window.getComputedStyle(tocEntryRef[idx].current!);
                startHeight += parseInt(computedStyle.height) + 15;
            }
        });

        if (startIdx === -1) {
            startHeight = 0;
            height = 0;
        }

        path.push('M', 40, startHeight, 'L', 40, startHeight + height);
        tocPath!.setAttribute('d', path.join(' '));
    }

    useEffect(() => {
        if (tocEntries === null) return;
        drawPath();
    }, [tocEntries]);

    function listenSections(): void {
        if (tocEntries === null || props.emitter === undefined) return;
        if (listenTocItems.has('intersectingSectionsListener')) return;
        props.emitter.on('intersectingSections', (intersectingIds) => {
            setTocEntries((prev) => {
                return prev!.map((tocEntry) => {
                    if (intersectingIds.includes(tocEntry.props.id)) {
                        return React.cloneElement(tocEntry, { className: "section-toc-entry active" });
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
            {
                tocEntries &&
                tocEntries.map((entry, index) => {
                    return React.cloneElement(entry, {
                        ref: tocEntryRef[index],
                        key: index
                    })
                })
            }
            <svg className="toc-marker" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <path
                    ref={tocMarkerPathRef}
                    stroke="#444"
                    strokeWidth="3"
                    fill="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-0.5, -0.5)"
                />
            </svg>
        </div>
    )
}

export default TableOfContents;
