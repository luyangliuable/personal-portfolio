import { Component, createRef } from "react";
import IFeaturedContentSectionState from "./Interface/IFeaturedContentSectionState";
import IFeaturedContentSectionProps from "./Interface/IFeaturedContentSectionProps";
import "./FeaturedContentSection.css";
import { isCenterAlignedWithViewport } from "../Utility/ScrollUtility";
import GalleryItem from "../Gallery/GalleryItem/GalleryItem";
import LandingPageCard from "../LandingPageCard/LandingPageCard";
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
                    $oid: "64f2f5d0481c4558176ca3b2"
                },
                body: "",
                heading: "Why I Will Treat Ikigai as My Soulful Quest for Purpose and Passion",
                author: "Luyang Liu",
                date_created: "2023-07-30T12:34:56Z",
                url: "",
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
            <LandingPageCard heading="Featured Content" landingPageCardType="fitContent" blendWithBackground={true}>
                <div ref={this.currentComponentRef} className="featured-content-section">
                    <div className="featured-section-content">
                        <GalleryItem
                            image="https://barbarabray.net/wp-content/uploads/2017/11/ikigai-1024x968.jpg"
                            name={this.getFeaturedPostHeading()}
                            subheading="⭐ 5 min read | 3 weeks ago"
                            description={truncateTextBody(this.state.featuredPost.body, 50)}
                            link={`/digital_chronicles/blog?id=${this.state.featuredPost._id.$oid}`} />
                        <GalleryItem
                            name={this.getFeaturedToolHeading()}
                            image="http://llcode.tech/api/image/651942aaf9b642fb30be59ae"
                            description={truncateTextBody(this.state.featuredTool.description)}
                            link={this.state.featuredTool.link} />

                        {/* <Card
                            heading={}
                            body={}
                            author={this.state.featuredPost.author}
                            date_created={this.state.featuredPost.date_created}
                            image=""
                        />

                        <Card
                            heading={this.getFeaturedToolHeading()}
                            body={truncateTextBody(this.state.featuredTool.description)}
                            link={this.state.featuredTool.link}
                /> */}
                    </div>
                    <TwinCandle ref={this.twinCandleComponentRef} />
                </div>
            </LandingPageCard>
        );
    }
}

export default FeaturedContentSection;
