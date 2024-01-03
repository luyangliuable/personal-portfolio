const isCenterAlignedWithViewport = (div: HTMLDivElement): number => {
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

    // Points to check just above and below the element by 10px
    // Conascence of value proxmityToSenseAt depends on the margin between cards unfortunately
    const yAbove = rect.top - proxmityToSenseAt;
    const yBelow = rect.bottom + proxmityToSenseAt;
    const xPos = rect.left + (rect.width / 2);  // Roughly the horizontal center of the element

    // Default elements to exclude
    const defaultExcludes = [document.body, document.documentElement, element];

    // Store the elements we find
    const foundElements: Element[] = [];

    // Function to recursively find elements at a given point
    function findElements(x: number, y: number) {
        const el = document.elementFromPoint(x, y) as HTMLElement;

        // If we found an element, and it's not one of the default excluded ones
        if (el && !defaultExcludes.includes(el)) {
            // Temporarily hide the element
            const prevVisibility = el.style.visibility;
            el.style.visibility = 'hidden';

            // Recursively search for more elements at the same point
            findElements(x, y);

            // Restore the original visibility
            el.style.visibility = prevVisibility;

            foundElements.push(el);
        }
    }

    if (detectStrategy === "top" || detectStrategy === "both") {
        findElements(xPos, yAbove);
    }

    if (detectStrategy === "bottom" || detectStrategy === "both") {
        findElements(xPos, yBelow);
    }

    // Filter the elements based on the include classes and their descendants
    const filteredElements = foundElements.filter(el => {
        for (let className of includeClasses) {
            if (el.classList.contains(className)) {
                return true;
            }

            const parentWithClass = el.closest('.' + className); // checks if there's a parent with the desired class

            if (parentWithClass) {
                return true;
            }
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



export { resetElementPosition, adjustElementPositionAbsoluteY as centerElementInParent, isCenterAlignedWithViewport, getHTMLElementCenterYPosition, isCloseToAnotherElement }
