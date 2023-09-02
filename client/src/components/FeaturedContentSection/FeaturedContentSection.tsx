import { Component, createRef } from 'react';
import IFeaturedContentSectionState from "./Interface/IFeaturedContentSectionState";
import IFeaturedContentSectionProps from "./Interface/IFeaturedContentSectionProps";
import "./FeaturedContentSection.css";
import { isCenterAlignedWithViewport } from "../Utility/ScrollUtility";
import { cardGradientEffect } from "../Utility/MouseUtility";
import Card from "../../components/Card/Card";

import { truncateTextBody, isoDateFormatToString } from "../Utility/StringUtility";

import TwinCandle from "../TwinCandle/TwinCandle";

class FeaturedContentSection extends Component<IFeaturedContentSectionProps, IFeaturedContentSectionState> {
    private currentComponentRef = createRef<HTMLDivElement>();
    private twinCandleComponentRef = createRef<TwinCandle>();

    constructor(props: IFeaturedContentSectionProps) {
        super(props);
        this.state = {
            featuredPost: {
                _id: {
                    $oid: ''
                },
                body: "Pellentesque dapibus suscipit ligula.  Donec posuere augue in quam.  Etiam vel tortor sodales tellus ultricies commodo.  Suspendisse potenti.  Aenean in sem ac leo mollis blandit.  Donec neque quam, dignissim in, mollis nec, sagittis eu, wisi.  Phasellus lacus.  Etiam laoreet quam sed arcu.  Phasellus at dui in ligula mollis ultricies.  Integer placerat tristique nisl.  Praesent augue.  Fusce commodo.  Vestibulum convallis, lorem a tempus semper, dui dui euismod elit, vitae placerat urna tortor vitae lacus.  Nullam libero mauris, consequat quis, varius et, dictum id, arcu.  Mauris mollis tincidunt felis.  Aliquam feugiat tellus ut neque.  Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit. ",
                heading: "Coming Soon",
                author: "Luyang Liu",
                date_created: "2023-07-30T12:34:56Z",
                url: "hello",
            },
            featuredTool: {
                name: "Coming Soon",
                description: "Coming Soon",
                link: "Coming Soon"
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<IFeaturedContentSectionProps>): void {
        if (prevProps.scrolled !== this.props.scrolled) {
            if (Math.abs(isCenterAlignedWithViewport(this.currentComponentRef?.current)) <= 100) {
                this.twinCandleComponentRef?.current?.transitionCandleFireToOn();
            } else if (Math.abs(isCenterAlignedWithViewport(this.currentComponentRef?.current)) > 200) {
                this.twinCandleComponentRef?.current?.transitionCandleFireToOff();
            }
        }
    }

    getFeaturedPostHeading() {
      return "Featured Post: " + this.state.featuredPost.heading;
    }

    getFeaturedToolHeading() {
        return "Featured Tool: " + this.state.featuredTool.name;
    }

    render() {
        return (
            <div ref={this.currentComponentRef} className="featured-content-section">
                {/* <div className="dark-room-filter"></div> */}
                <h1 style={{ textAlign: "left", marginLeft: "2vw" }}>
                    Featured Content
                </h1>
                <div className="featured-section-content featured-section-content-in-dark-room">
                    <Card
                        heading={this.getFeaturedPostHeading()}
                        body={truncateTextBody(this.state.featuredPost.body, 50)}
                        author={this.state.featuredPost.author}
                        date_created={this.state.featuredPost.date_created}
                        link={`/blog?id=${this.state.featuredPost._id.$oid}`}
                    />

                    <Card
                        heading={this.getFeaturedToolHeading()}
                        body={truncateTextBody(this.state.featuredTool.description)}
                        link={this.state.featuredTool.link}
                    />
                </div>
                <TwinCandle ref={this.twinCandleComponentRef} />
            </div>
        );
    }
}

export default FeaturedContentSection;
