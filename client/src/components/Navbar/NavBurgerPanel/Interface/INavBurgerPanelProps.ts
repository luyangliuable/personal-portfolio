import { RefObject } from "react";

interface INavBurgerPanelProps {
    links: {
        name: string,
        to: string
    }[],
    burgerPanel: RefObject<HTMLDivElement>;
}

export default INavBurgerPanelProps;
