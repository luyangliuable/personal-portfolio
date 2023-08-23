interface IBlogContentState {
    content: blogContent,
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    heading: string | null,
    body: string | null,
}

export default IBlogContentState;
