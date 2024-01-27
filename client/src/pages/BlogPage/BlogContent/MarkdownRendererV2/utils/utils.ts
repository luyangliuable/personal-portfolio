export type Attributes = { [key: string]: string };

export const getFirstTagName = (html: string): string | null => {
    const matches = html.match(/<([a-z0-9]+)(\s|>)/i);
    return matches ? matches[1].toLowerCase() : null;
};

export const extractAttributesFromHtmlElement = (html: string): Attributes => {
    const element = (new DOMParser()).parseFromString(html, "text/html").body.firstChild as HTMLElement | null;
    const attrs: Attributes = {};
    const attributeNameMap: { [key: string]: string } = {
        "class": "className"
    };

    if (element && element.attributes) {
        Array.from(element.attributes).forEach((attribute) => {
            const attributeName = attributeNameMap[attribute.name] || attribute.name;
            attrs[attributeName] = attribute.value;
        });
    }

    return attrs;
};

