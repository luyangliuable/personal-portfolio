export default interface AbcState {
    navBarHeight: number,
    render: () => React.ReactElement<any, any>,
    componentDidUpdate: () => void,
    componentDidMount: () => void,
    /* state: {scrolled: any} */ // TODO fix
};
