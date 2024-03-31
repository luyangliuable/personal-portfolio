import React from "react";
import ItableOfContentsProps from "./Interface/ItableOfContentsProps"
import { useEffect, useState, useRef, RefObject } from "react";
import { stringToHash } from "../../../../components/Utility/StringUtility";
import "./TableOfContents.css";

const TableOfContents: React.FC<ItableOfContentsProps> = (props) => {
    const [tocEntries, setTocEntries] = useState<JSX.Element[] | null>(null);
    const [tocEntryRef, setTocEntryRef] = useState<RefObject<HTMLElement>[]>([]);
    const [listenTocItems, setlistenTocItems] = useState<Set<string>>(new Set());
    const [lastPathInfo, setLastPathInfo] = useState<{lastPathStart: number, lastPathEnd: number}>({
        lastPathStart: 0,
        lastPathEnd: 0
    });
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
            if (level === 1) title = "";
            const indentation = `${Math.max((level - 1), 0) * 20}px`;
            const marginBottom = `${(22 - 4.5 * level) / 2}px`;
            const color = getTextColor(level);
            const id = stringToHash(title);
            const className = `level-${level - 2} section-toc-entry flex items-center`;
            return (
                <div key={idx} id={id.toString()} className={className} style={{ color, margin: `${marginBottom} ${indentation}` }} onClick={(e) => handleClick(e, id.toString())}>
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
        const tocPath = tocMarkerPathRef.current,
            path: any[] = [];

        let height = 0,
            indent = 40,
            startHeight = 90,
            startIdx = -1,
            endIdx = -1,
            pathStart = 0,
            pathEnd = 0;

        tocEntries!.forEach((entry, idx) => {
            if (entry.props.className.includes('active')) {
                if (startIdx === -1) startIdx = idx;
                endIdx = idx;
            }
        });

        path.push("M", indent, startHeight);
        height = startHeight;

        tocEntries!.forEach((entry, idx) => {
            const computedStyle = window.getComputedStyle(tocEntryRef[idx].current!);
            const extra = parseFloat(computedStyle.height) + parseFloat(computedStyle.marginBottom) * 2;

            if (idx < startIdx) pathStart += extra;

            if (indent == 40 && entry.props.className.includes('level-1')) {
                path.push("L", 60, height);
                indent = 60;
                if (idx <= endIdx) pathEnd += 20;
                if (idx < startIdx) pathStart += 20;
            } else if (indent == 60 && entry.props.className.includes('level-0')) {
                path.push("L", 40, height);
                indent = 40;
                if (idx <= endIdx) pathEnd += 20;
                if (idx < startIdx) pathStart += 20;
            }

            if (idx <= endIdx) pathEnd += extra;
            path.push("L", indent, height + extra);
            height += extra;
        });
        const { lastPathStart, lastPathEnd } = lastPathInfo;

        if (pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
            if (startIdx === -1) tocPath!.setAttribute('opacity', '0');
            const pathString = path.join(' ');
            const pathLength = tocPath!.getTotalLength();
            tocPath!.setAttribute('d', pathString);
            tocPath!.setAttribute('stroke-dashoffset', '1');
            tocPath!.setAttribute('stroke-dasharray', `0, ${pathStart}, ${pathEnd - pathStart}, ${pathLength === 0 ? 1000 : pathLength}`);
            tocPath!.setAttribute('opacity', '1');
            setLastPathInfo({
                lastPathStart: pathStart,
                lastPathEnd: pathEnd
            });
        }
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
                    const prevClassName = tocEntry.props.className.replace('active', '');
                    if (intersectingIds.includes(tocEntry.props.id)) {
                        return React.cloneElement(tocEntry, { className: `${prevClassName} active` });
                    }
                    return React.cloneElement(tocEntry, { className: prevClassName });
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
                    fill="transparent"
                    strokeLinecap="round"
                    troke-dasharray="0, 0, 0, 1000"
                    strokeLinejoin="round"
                    transform="translate(-0.5, -0.5)"
                />
            </svg>
        </div>
    )
}

export default TableOfContents;

