const isCenterAlignedWithViewport = (div: HTMLDivElement): number => {
    const rect = div.getBoundingClientRect();
    const divCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;

    return divCenterY - viewportCenterY;
}

export { isCenterAlignedWithViewport }
