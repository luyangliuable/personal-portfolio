import React, { useState, useRef, RefObject, useEffect } from "react";
import DynamicLoadQueue from "../../../stores/DynamicLoadQueue/DynamicLoadQueue";
import "./SequentialRiseSpan.css";

interface ISequentialRiseSpanProps {
    children: string;
    className?: string;
    elementType?: keyof JSX.IntrinsicElements;
    numberOfLettersPerLine?: number,
    minNumberOfLettersPerLine?: number
}

const SequentialRiseSpan: React.FC<ISequentialRiseSpanProps> = ({ children, elementType, className, numberOfLettersPerLine, minNumberOfLettersPerLine }) => {
    const spanItemRef = useRef<HTMLDivElement>(null);
    const dynamicLoadQueue: DynamicLoadQueue = DynamicLoadQueue.getInstance();
    const [wrappedLines, setWrappedLines] = useState([]);
    const [measuredLettersPerLine, setMeasuredLettersPerLine] = useState<number>(numberOfLettersPerLine ?? 0);

    useEffect(() => {
        const element = spanItemRef.current;
        if (measuredLettersPerLine > 0 || element === undefined) return;
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.textContent = 'A'; // Use a common character for measurement
        document.body.appendChild(tempSpan);
        const charWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        if (element) {
            const elementStyle = window.getComputedStyle(element);
            const elementPadding = parseFloat(elementStyle.paddingLeft) + parseFloat(elementStyle.paddingRight);
            const elementWidth = element.offsetWidth - elementPadding;
            setMeasuredLettersPerLine(Math.floor(elementWidth / charWidth));
        }
    }, []);

    useEffect(() => {
        let currentLine = '';
        let lines: string[] = [];
        const finalNumberOfLettersPerLine = numberOfLettersPerLine ?? Math.max(measuredLettersPerLine, (minNumberOfLettersPerLine ?? 0))
        String(children).split(' ').forEach((word) => {
            if ((currentLine + (currentLine ? ' ' : '') + word).length > finalNumberOfLettersPerLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine += (currentLine.length > 0 ? ' ' : '') + word;
            }
        });
        lines.push(currentLine);
        setWrappedLines(lines.map((line, index) =>
            <div key={index}>
                {
                    React.createElement(
                        elementType || 'p',
                        {
                            style: { animationDelay: `${index * 100}ms` },
                            className: ["slide-up", className].filter(Boolean).join(' '),
                        },
                        line
                    )
                }
            </div>
        ));
    }, [children, elementType, className, measuredLettersPerLine, minNumberOfLettersPerLine]);

    useEffect(() => {
        if (spanItemRef.current) dynamicLoadQueue.addToQueue(spanItemRef.current);
    }, []);

    return (
        <div className="sequential-rise-span" ref={spanItemRef}>
            {
                wrappedLines.map((line, index) => (
                    <>
                        {line}
                    </>
                ))
            }
        </div>
    );
}
export default SequentialRiseSpan;

