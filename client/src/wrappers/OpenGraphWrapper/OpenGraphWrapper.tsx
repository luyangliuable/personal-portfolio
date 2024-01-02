import React from "react";
import { Helmet } from "react-helmet";

interface IOpenGraphWrapperProps {
    heading: string;
    body: string;
    imageUrl?: string;
    children: React.ReactNode
}

const OpenGraphWrapper: React.FC<IOpenGraphWrapperProps> = ({heading, body, children, imageUrl}) => {
    return (
        <>
            <Helmet>
            <meta property="og:title" content={heading} />
            <meta property="og:description" content={body} />
            <meta property="og:image" content={imageUrl} />
            </Helmet>
            {children}
        </>
    )
};

export default OpenGraphWrapper;
