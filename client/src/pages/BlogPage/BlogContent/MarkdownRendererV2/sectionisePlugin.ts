import { findAfter } from 'unist-util-find-after';
import { visit } from 'unist-util-visit';
import { stringToHash } from "../../../../components/Utility/StringUtility";

const MAX_HEADING_DEPTH = 6;

function plugin() {
    return transform;
}

function transform(tree: any) {
    for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
        visit(
            tree,
            (node: any) => node.type === 'heading' && node.depth === depth,
            sectionise
        );
    }
}

function sectionise(node: any, index: any, parent: any) {
    const start = node;
    const startIndex = index;
    const depth = start.depth;

    const isEnd = (node: any) => node.type === 'heading' && node.depth <= depth || node.type === 'export';
    const end = findAfter(parent, start, isEnd);
    const endIndex = parent.children.indexOf(end);

    const between = parent.children.slice(
        startIndex,
        endIndex > 0 ? endIndex : undefined
    );

    const headingContent = node.children
        .filter((child: typeof node) => child.type === 'text')
        .map((textNode: typeof node) => textNode.value)
        .join('');

    const slug = stringToHash(headingContent).toString();

    const section = {
        type: 'section',
        depth: depth,
        children: between,
        data: {
            hName: 'section',
            hProperties: {
                id: slug,
                className: index === 0 ? "blog-section--root" : "blog-section"
            }
        },
    };

    parent.children.splice(startIndex, section.children.length, section);
}

export default plugin;
