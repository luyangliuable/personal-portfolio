export default interface AbcState {
    render: () => React.ReactElement<any, any>,
    componentDidUpdate: () => void,
    componentDidMount: () => void,
};
