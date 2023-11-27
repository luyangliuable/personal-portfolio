import React, { Component } from "react";
import ItableOfContentsProps from "./Interface/ItableOfContentsProps"
import ITableOfContentsState from "./Interface/ITableOfContentsState"
import "./TableOfContents.css";

class TableOfContents extends Component<ItableOfContentsProps, ITableOfContentsState> {
    constructor(props: ItableOfContentsProps) {
        super(props);
    }


    renderTableOfContents(): React.ReactNode {
        function getTextColor(level: number): string {
            const lightness = level * 20;
            return `hsl(0, 0%, ${lightness}%)`;
        }

        const subheadings = this.props.headings?.filter(({ title, level }) => level !== 0);

        return subheadings?.map(({ title, level }, idx: number) => {
            const indentation = `${level * 20}px`;
            const marginBottom = `${22 - 4.5 * (level)}px`;
            const color = getTextColor(level);

            return (
                <span key={idx} style={{ color: color, marginRight: indentation, marginBottom: marginBottom }}>{title}</span>
            )
        });
    }

    render() {
        return (
            <div className="blog-content__table-of-contents">{this.renderTableOfContents()}</div>
        )
    }
}

export default TableOfContents;
