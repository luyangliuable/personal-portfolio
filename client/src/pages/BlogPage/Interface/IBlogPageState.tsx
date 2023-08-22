interface IBlogPageState {
    content: blogContent[],
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    body: string[],
    heading: string,
    url: string,
}
 
export default IBlogPageState;
