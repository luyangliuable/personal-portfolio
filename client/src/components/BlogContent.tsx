import React, { Component, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { createStore } from 'redux';

const initialState = '';

const blogManager = (state: string | undefined = initialState, action: blogManagerActionType) => {
    switch (action.type) {
        case 'get':
            return action.payload;
        case 'comment':
            return action.payload;
        default:
            return '';
    }
};

type blogManagerActionType = {
    type: string,
    payload: string
}

type AbcState = {
    content: blogContent,
    render?: () => React.ReactElement<any, any>,
}

type blogContent = {
    heading: string,
    body: string[],
}


class BlogContent extends Component<{}, AbcState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            content: {
                heading: blogManager(undefined, {type: 'get', payload: 'Why should modern developers pick up machine learning and cybersecurity as a skill?'}),
                // TODO Store on database and api
                body: ["Why Should Modern Developers Pick Up Machine Learning and Cybersecurity as a Skill?",
                       "As technology continues to evolve and become more integrated into our daily lives, it's increasingly important for developers to have a broad range of skills beyond just programming languages and frameworks. Two areas that are becoming increasingly important in the modern tech landscape are machine learning and cybersecurity. In this blog post, we'll explore why developers should consider picking up these skills and how they can benefit from them.",
                       "Machine learning is a subfield of artificial intelligence that allows systems to automatically learn and improve from experience without being explicitly programmed. This technology has become increasingly popular in recent years, as it can be used for a wide range of applications, from image and speech recognition to recommendation engines and fraud detection.",
                       "For developers, learning machine learning can be extremely beneficial, as it can help them build more intelligent and efficient systems. By leveraging machine learning algorithms and models, developers can create systems that can learn and adapt to user behavior, automatically detect patterns and anomalies, and make predictions based on data. This can be particularly useful in industries like finance, healthcare, and e-commerce, where large amounts of data are generated and analyzed on a daily basis.",
                       "In addition, learning machine learning can open up new career opportunities for developers. With the growing demand for machine learning experts, developers with these skills are in high demand and can command high salaries. Even if you don't want to specialize in machine learning, having a basic understanding of the technology can make you a more valuable and versatile developer.",
                       "Cybersecurity is another area that's becoming increasingly important in the tech industry. With more data and sensitive information being stored online, the need for secure systems and applications has never been greater. Cybersecurity involves protecting computer systems, networks, and data from unauthorized access, theft, and damage.",
                       "Developers who are well-versed in cybersecurity can help ensure that the applications and systems they build are secure and protected from cyber attacks. By understanding common vulnerabilities and implementing best practices for secure coding and development, developers can help prevent data breaches and other security incidents.",
                       "In addition, having cybersecurity skills can be a valuable asset for developers who work in regulated industries, such as healthcare or finance. These industries often have strict compliance requirements that developers must adhere to, and having a strong understanding of cybersecurity can help ensure that the systems they build are compliant and secure.",
                       "In conclusion, learning machine learning and cybersecurity can be extremely beneficial for modern developers. These skills can help developers build more intelligent and secure systems, open up new career opportunities, and make them more valuable and versatile in the job market. With the growing demand for these skills, there's never been a better time to start learning. By staying ahead of the curve and picking up these skills, developers can position themselves for success in the ever-evolving tech industry."]
            }
        }
    }

    render() {
        return (
            <div className="blog-content">
                <h1>{this.state.content.heading}</h1>
                {this.state.content.body.map((item, index) => {
                    return <p key={index} style={{textAlign: 'left', marginBottom: '7vh'}}>{item}</p>
                })}
            </div>
        )
    }
}

export default BlogContent;
