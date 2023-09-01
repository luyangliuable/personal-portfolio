interface IBlogPageState {
    content: blogContent[],
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    _id: {
        $oid: string
    }
    body: string,
    heading: string,
    author: string,
    date_created: string,
    url: string,
}

export default IBlogPageState;
