import React from "react";
import Image from "../../../../components/Image/Image";
import BlogPostResponse from "../../../../repositories/Response/BlogPostResponse";
import { isoDateFormatToString } from "../../../../components/Utility/StringUtility";

const AuthorDetails: React.FC<{ content?: BlogPostResponse }> = ({ content }) => {
    const defaultAuthorImage: string = "https://llcode.tech/api/image/65817ae96c73ceb16ba51731";

    if (content === undefined)
        return (<></>)

    const { author, date_created } = content;

    const displayDateCreated = isoDateFormatToString(new Date(date_created));

    return (
        <section>
            <div className="flex">
                <Image
                    className="user-image blog-content--author-image"
                    src={defaultAuthorImage}
                />
                <div className="flex-vertical">
                    <b>{author}</b>
                    <br />
                    <span>{displayDateCreated}</span>
                </div>
            </div>
        </section>
    )
}

export default AuthorDetails;
