interface INavbarProps {
    name?: string;
    current?: string;
    scrollStatus: {
        scrolled: number | null;
        scrolling: boolean | null;
    };
}

export default INavbarProps;
