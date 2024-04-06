import { useEffect } from "react";

const isCenterAlignedWithViewport = (div: Element | null): number => {
    if (div === null) return Number.MAX_SAFE_INTEGER;
    const rect = div.getBoundingClientRect();
    const divCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;
    return divCenterY - viewportCenterY;
}

const getHTMLElementCenterYPosition = (element: any, offset: number = 0): number => {
    const rect = element.getBoundingClientRect();
    const divCenterY = rect.top;
    return divCenterY;
}

function isCloseToAnotherElement(element: Element, detectStrategy: "top" | "bottom" | "both", proxmityToSenseAt: number = 100, includeClasses: string[] = []): Element[]{
    const rect = element.getBoundingClientRect();
    const yAbove = rect.top - proxmityToSenseAt;
    const yBelow = rect.bottom + proxmityToSenseAt;
    const xPos = rect.left + (rect.width / 2);  // Roughly the horizontal center of the element
    const defaultExcludes = [document.body, document.documentElement, element];
    const foundElements: Element[] = [];
    function findElements(x: number, y: number) {
        const el = document.elementFromPoint(x, y) as HTMLElement;
        if (el && !defaultExcludes.includes(el)) {
            const prevVisibility = el.style.visibility;
            el.style.visibility = 'hidden';
            findElements(x, y);
            el.style.visibility = prevVisibility;
            foundElements.push(el);
        }
    }
    if (detectStrategy === "top" || detectStrategy === "both") findElements(xPos, yAbove);
    if (detectStrategy === "bottom" || detectStrategy === "both") findElements(xPos, yBelow);
    const filteredElements = foundElements.filter(el => {
        for (let className of includeClasses) {
            if (el.classList.contains(className)) return true;
            const parentWithClass = el.closest('.' + className); // checks if there's a parent with the desired class
            if (parentWithClass) return true;
        }
        return false;
    });
    return filteredElements;
}

const adjustElementPositionAbsoluteY = (element: HTMLElement, y: number = 0): void => {
    // Set the element's position to 'absolute'
    element.style.position = 'absolute';

    // Center the element in the viewport taking the scroll position into account
    /* element.style.top = `calc(50% + ${scrollTop}px)`; */
    if (y !== 0)
        element.style.top = `calc(${y}px)`;
    element.style.transform = 'translate(-50%, -50%)';
}

const resetElementPosition = (element: HTMLElement): void => {
    element.style.position = '';
    element.style.top = '';
    element.style.left = '';
    element.style.transform = '';
}

function useScrollToTopOnLoad() {
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0
            });
        };

        scrollToTop();

        return () => {
            scrollToTop();
        };
    }, []);
}

export { useScrollToTopOnLoad, resetElementPosition, adjustElementPositionAbsoluteY as centerElementInParent, isCenterAlignedWithViewport, getHTMLElementCenterYPosition, isCloseToAnotherElement }
