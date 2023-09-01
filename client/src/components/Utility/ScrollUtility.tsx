const isCenterAlignedWithViewport = (div: HTMLDivElement): number => {
    const rect = div.getBoundingClientRect();
    const divCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;

    return divCenterY - viewportCenterY;
}

const getOffset = (element: any) => {
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        _x += element.offsetLeft - element.scrollLeft;
        _y += element.offsetTop - element.scrollTop;
        element = element.offsetParent;
    }

    return { top: _y, left: _x };
}

const getHTMLElementCenterYPosition = (element: any, offset: number = 0): number => {
    const rect = element.getBoundingClientRect();

    const divCenterY = rect.top + rect.height / 2 + window.scrollY - offset;

    return divCenterY;
}

function isCloseToAnotherElement(element: Element, includeClasses: string[] = []): Element[] {
    const rect = element.getBoundingClientRect();

    // Points to check just above and below the element by 10px
    // Conascence of value proxmityToSenseAt depends on the margin between cards unfortunately
    const proxmityToSenseAt = 100;
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

    findElements(xPos, yAbove);
    findElements(xPos, yBelow);

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

export { isCenterAlignedWithViewport, getHTMLElementCenterYPosition, isCloseToAnotherElement }
