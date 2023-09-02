import { Component } from "react";
import "./BlogPage.css"
import PostRepository from "../../repositories/PostRepository";
import { IBlogPageState } from "./Interface/IBlogPageState";
import IBlogPageProps from "./Interface/IBlogPageProps";
import { truncateTextBody, stripAwayHashSymbols, isoDateFormatToString } from "../../components/Utility/StringUtility";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import Card from "../../components/Card/Card";


class BlogPage extends Component<IBlogPageProps, IBlogPageState> {
    constructor(props: IBlogPageProps) {
        super(props);

        this.state = {
            content: []
        }
    }

    componentDidMount() {
        PostRepository.getPostList().then((response) => {
            this.setState({
                content: response
            })
        })
    }

    render() {
        return (
            <div className="blog-container cursor-pointer">
                {
                    this.state.content?.map((content, idx) => {
                        return (
                          <Card
                            heading={content.heading}
                            author={content.author}
                            date_created={content.date_created}
                            body={content.body} 
                            link = {`/blog?id=${content._id.$oid}`}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default BlogPage;
