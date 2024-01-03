interface INavbarProps {
    name?: string;
    current?: string;
    scrollStatus: {
        scrolled: number | null;
        deltaScrolled: number | null;
    }
}

export default INavbarProps;
