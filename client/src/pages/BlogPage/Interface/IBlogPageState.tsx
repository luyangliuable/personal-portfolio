interface IBlogPageState {
    content: blogContent[],
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    _id: {
        $oid: string
    }
    body: string[],
    heading: string,
    url: string,
}

export default IBlogPageState;
