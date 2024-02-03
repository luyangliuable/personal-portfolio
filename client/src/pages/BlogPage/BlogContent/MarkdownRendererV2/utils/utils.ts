export type Attributes = { [key: string]: string };

export const getFirstTagName = (html: string): string | null => {
    const matches = html.match(/<([a-z0-9]+)(\s|>)/i);
    return matches ? matches[1].toLowerCase() : null;
};

export function extractAttributesFromHtmlElement(node: Element): { [key: string]: any } {
    const attributes: { [key: string]: any } = {};
    const attributeNameMap: { [key: string]: string } = {
        "class": "className"
    };
    Array.from(node.attributes).forEach(attr => {
        const attrName = attributeNameMap[attr.name] || attr.name;
        if (attr.name === 'style') {
            attributes[attrName] = styleStringToObject(attr.value);
        } else {
            attributes[attrName] = attr.value;
        }
    });
    return attributes;
}

function styleStringToObject(styleString: string): { [key: string]: string } {
    const styleObject: { [key: string]: string } = {};
    styleString.split(';').forEach(styleProperty => {
        const [key, value] = styleProperty.split(':');
        if (key && value) {
            const formattedKey = key.trim().replace(/-(.)/g, (match, group) => group.toUpperCase());
            styleObject[formattedKey] = value.trim();
        }
    });
    return styleObject;
}
