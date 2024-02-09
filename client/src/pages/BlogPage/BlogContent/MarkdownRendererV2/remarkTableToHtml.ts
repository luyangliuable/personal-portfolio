import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';
import { Parent } from 'mdast';

interface HtmlNode extends Node {
    type: 'html';
    value: string;
}

const remarkTableToHtml: Plugin = () => {
    return transformer;

};

function transformer(tree: Node): void {
    visit(tree, 'text', (node: any, index: number, parent: Parent | undefined) => {
        if (parent && isTable(node.value.toString())) {
            const htmlTable: string = markdownTableToHtml(node.value.toString());
            const htmlNode: HtmlNode = {
                type: 'html',
                value: htmlTable,
            };
            parent.children.splice(index, 1, htmlNode);
        }
    });
}

function isTable(text: string): boolean {
    return text.trim().split('\n').every(line => line.trim().startsWith('|') && line.includes('|', 1));
}

function markdownTableToHtml(markdown: string): string {
    const lines = markdown.trim().split('\n').map(line => line.trim());
    const headers = lines[0].split('|').filter(cell => cell.trim());
    let alignments: string[] = [];
    if (lines.length > 1 && lines[1].split('|').some(cell => cell.trim().match(/:-+:?|--:|:--/))) {
        alignments = lines[1].split('|').slice(1, -1).map(cell => {
            const trimmedCell = cell.trim();
            if (trimmedCell.startsWith(':') && trimmedCell.endsWith(':')) return ' style="text-align:center;"';
            else if (trimmedCell.endsWith(':')) return ' style="text-align:right;"';
            else return ' style="text-align:left;"'; // Default and also for left alignment
        });
    }
    let bodyRows = lines.slice(2);
    let html = '<div class="table-wrapper"><table>\n<thead>\n<tr>';
    headers.forEach((header, index) => {
        const alignmentStyle = alignments.length > index ? alignments[index] : ' style="text-align:left;"';
        html += `<th${alignmentStyle}>${header.trim()}</th>`;
    });
    html += '</tr>\n</thead>\n<tbody>';
    bodyRows.forEach(row => {
        let cells = row.split('|').filter(cell => cell.trim());
        html += '\n<tr>';
        cells.forEach((cell, index) => {
            const alignmentStyle = alignments.length > index ? alignments[index] : ' style="text-align:left;"';
            html += `<td${alignmentStyle}>${cell.trim()}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html.replace(/\n/g, '').replace(/>\s+</g, '><');
}

export default remarkTableToHtml;
