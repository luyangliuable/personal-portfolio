import React, { useState, useRef, useEffect, RefObject } from "react";
import "./SequentialRiseSpan.css";

interface ISequentialRiseSpanProps {
    children: string;
    className?: string;
    elementType?: keyof JSX.IntrinsicElements;
    numberOfLettersPerLine?: number,
    calculationAdjustment?: number,
    minNumberOfLettersPerLine?: number,
    maxNumberOfLettersPerLine?: number
}

const SequentialRiseSpan: React.FC<ISequentialRiseSpanProps> = ({ calculationAdjustment, children, elementType, className, numberOfLettersPerLine, minNumberOfLettersPerLine, maxNumberOfLettersPerLine }) => {
    const spanItemRef = useRef<HTMLDivElement>(null);
    const [wrappedLines, setWrappedLines] = useState([]);
    const [lineRefs, setLineRefs] = useState<RefObject<any>[]>([]);
    const [measuredLettersPerLine, setMeasuredLettersPerLine] = useState<number>(numberOfLettersPerLine ?? 0);

    const calculateLettersPerLine = () => {
        const element = spanItemRef.current;
        if (measuredLettersPerLine > 0 || element === undefined) return;
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.textContent = 's';
        document.body.appendChild(tempSpan);
        const charWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        if (element) {
            const elementStyle = window.getComputedStyle(element);
            const elementPadding = parseFloat(elementStyle.paddingLeft) + parseFloat(elementStyle.paddingRight);
            const elementWidth = element.offsetWidth - elementPadding;
            calculationAdjustment = calculationAdjustment ?? 1.12;
            setMeasuredLettersPerLine(Math.floor(elementWidth * calculationAdjustment / charWidth));
        }
    }

    const slideUp = (target: Element, observer: any): void => {
        target.classList.add('slide-up');
        observer.unobserve(target);
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) slideUp(entry.target, observer)
            });
        }, { threshold: [0.1, 0.5, 1] });
        lineRefs.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        return () => observer.disconnect();
    }, [lineRefs]);


    useEffect(() => {
        if (measuredLettersPerLine === 0) calculateLettersPerLine();
        window.addEventListener('resize', calculateLettersPerLine);
        return () => {
            window.removeEventListener('resize', calculateLettersPerLine);
        }
    }, []);

    useEffect(() => {
        let currentLine = '';
        let lines: string[] = [];
        const finalNumberOfLettersPerLine = numberOfLettersPerLine ?? Math.min(Math.max(measuredLettersPerLine, (minNumberOfLettersPerLine ?? 0)), (maxNumberOfLettersPerLine ?? Number.MAX_SAFE_INTEGER))
        String(children).split(' ').forEach((word) => {
            if ((currentLine + (currentLine ? ' ' : '') + word).length > finalNumberOfLettersPerLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine += (currentLine.length > 0 ? ' ' : '') + word;
            }
        });
        lines.push(currentLine);
        setLineRefs(lines.map(() => React.createRef<any>()));
        const linesElements = lines.map((line, index) => {
            const LineElement = React.createElement(
                elementType || 'p',
                {
                    key: index,
                    className: ["visible-hidden", className].join(" ")
                },
                line
            );
            return LineElement;
        });
        setWrappedLines(linesElements);
    }, [children, elementType, className, measuredLettersPerLine, minNumberOfLettersPerLine]);

    return (
        <div className="sequential-rise-span" ref={spanItemRef}>
            {
                measuredLettersPerLine !== 0 &&
                wrappedLines.map((line, index) => {
                    const lineElement = React.cloneElement(line, {
                        style: { animationDelay: `${index * 100}ms` },
                        ref: lineRefs[index]
                    })
                    return (<div key={index} className="w-full break-words">{lineElement}</div>)
                })
            }
        </div>
    );
}
export default SequentialRiseSpan;
