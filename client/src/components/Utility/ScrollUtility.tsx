const isCenterAlignedWithViewport = (div: HTMLDivElement): number => {
    const rect = div.getBoundingClientRect();
    const divCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;

    return divCenterY - viewportCenterY;
}

function getOffset(element: any) {
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        _x += element.offsetLeft - element.scrollLeft;
        _y += element.offsetTop - element.scrollTop;
        element = element.offsetParent;
    }

    return { top: _y, left: _x };
}

var x = getOffset(document.getElementById('yourElId')).left;

function getHTMLElementCenterYPosition(element: any, offset: number = 0): number {
    const rect = element.getBoundingClientRect();

    const divCenterY = rect.top + rect.height / 2 + window.scrollY - offset;

    return divCenterY;
}


export { isCenterAlignedWithViewport, getHTMLElementCenterYPosition }
