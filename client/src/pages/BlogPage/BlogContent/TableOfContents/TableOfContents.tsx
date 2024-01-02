import React, { Component } from "react";
import ItableOfContentsProps from "./Interface/ItableOfContentsProps"
import ITableOfContentsState from "./Interface/ITableOfContentsState"
import "./TableOfContents.css";

class TableOfContents extends Component<ItableOfContentsProps, ITableOfContentsState> {
    constructor(props: ItableOfContentsProps) {
        super(props);
    }

    getIdFromHeading(str: string): number {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {

        const targetElement = document.getElementById(id);

        document.documentElement.style.scrollBehavior = "smooth";

        if (targetElement) {
            targetElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    };

    renderTableOfContents(): React.ReactNode {
        const getTextColor = (level: number): string => {
            const lightness = level * 20;
            return `hsl(0, 0%, ${lightness}%)`;
        };

        const subheadings = this.props.headings?.filter(({ level }) => level !== 0);
        return subheadings?.map(({ title, level }, idx: number) => {
            const indentation = `${Math.max((level - 1), 0) * 20}px`;

            const marginBottom = `${(22 - 4.5 * level) / 2}px`;
            const color = getTextColor(level);
            const id = this.getIdFromHeading(title);

            return (
                <div key={idx} style={{ color, margin: `${marginBottom} ${indentation}` }} onClick={(e) => this.handleClick(e, id.toString())}>
                    {title}
                </div>
            );
        });
    }

    render() {
	const className = ["table-of-contents", this.props.className].join(" ");

        return (
            <div className={className}>
		<h2>Table of Contents:</h2>
		{this.renderTableOfContents()}
	    </div>
        )
    }
}

export default TableOfContents;
