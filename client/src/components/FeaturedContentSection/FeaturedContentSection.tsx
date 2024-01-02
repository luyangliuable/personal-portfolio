import React, { Component, createRef, RefObject } from 'react';
import { isCenterAlignedWithViewport } from "../Utility/ScrollUtility";
import { truncateTextBody } from "../Utility/StringUtility";
import IFeaturedContentSectionState from "./Interface/IFeaturedContentSectionState";
import IFeaturedContentSectionProps from "./Interface/IFeaturedContentSectionProps";
import Button from "../Button/Button";
import GalleryItem from "../Gallery/GalleryItem/GalleryItem";
import LandingPageCard from "../LandingPageCard/LandingPageCard";
import PostRepository from "../../repositories/PostRepository";
import TwinCandle from "../TwinCandle/TwinCandle";

import "./FeaturedContentSection.css";

class FeaturedContentSection extends Component<IFeaturedContentSectionProps, IFeaturedContentSectionState> {
    private currentComponentRef: RefObject<HTMLDivElement>;
    private twinCandleComponentRef: RefObject<TwinCandle>;
    private postRepository: PostRepository;
    showMoreButtonRef: RefObject<HTMLDivElement>;

    constructor(props: IFeaturedContentSectionProps) {
        super(props);
        this.postRepository = PostRepository.getInstance();
        this.showMoreButtonRef = createRef<HTMLDivElement>();
        this.currentComponentRef = createRef<HTMLDivElement>();
        this.twinCandleComponentRef = createRef<TwinCandle>();

        this.state = {
            featuredPosts: [],
            numOfElementsToShow: 0,
            featuredTool: {
                name: "Coming Soon",
                description: "Coming Soon",
                link: "Coming Soon"
            }
        }
    }

    componentDidMount() {
        this.calculateElementsToShow();
        this.fetchPostList();
    }

    calculateElementsToShow = () => {
        const windowWidth = window.innerWidth;
        const elementWidth = 400;
        const wrapperWidth = 1900; // Connascence of value with FeaturedContentSection.css:10

        let numOfElementsToShow = Math.floor(Math.min(windowWidth, wrapperWidth) / elementWidth);
        this.setState({ numOfElementsToShow: Math.max(numOfElementsToShow, 2) });
    }


    showAllElements = () => {
        this.setState({ numOfElementsToShow: this.state.featuredPosts.length + 2 });
        this.showMoreButtonRef.current.style.display = 'none';
    }

    renderTopPickedPostsSortedByDateDescending = (): React.ReactNode => {
        const sliceEnd = this.state.numOfElementsToShow - 2;
        return this.state.featuredPosts.slice(0, sliceEnd).map((content, idx) => {

            const imageURL = `http://llcode.tech/api/image/${content.image.$oid}`

            return (
                <div key={content._id.$oid}>
                    <GalleryItem
                        name={content.heading}
                        tags={content.tags}
                        type="blog"
                        dateCreated={content.date_created}
                        minuteRead={content.reading_time_minutes}
                        style={{ margin: "2px 20px" }}
                        link={`/digital_chronicles/blog?id=${content._id.$oid}`}
                        image={imageURL} />
                </div>
            )
        });
    }

    async fetchPostList() {
        const response = await this.postRepository.getPostList();
        this.setState({
            featuredPosts: response
        });
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

    getFeaturedToolHeading() {
        return "Featured Tool: " + this.state.featuredTool.name;
    }

    render() {
        return (
            <LandingPageCard heading="Featured Content" landingPageCardType="fitContent" blendWithBackground={true}>
                <div ref={this.currentComponentRef} className="featured-content__wrapper">
                    <div className="featured-section w-full">
                        <GalleryItem
                            name={this.getFeaturedToolHeading()}
                            type="tool"
                            style={{ margin: "5px 20px" }}
                            image="http://llcode.tech/api/image/65596ad4ad7cc31ee9263e32"
                            description={truncateTextBody(this.state.featuredTool.description)}
                            link={this.state.featuredTool.link} />
                        {this.renderTopPickedPostsSortedByDateDescending()}
                        <div ref={this.showMoreButtonRef}><Button onClick={this.showAllElements}>Show More...</Button></div>
                    </div>
                    <TwinCandle ref={this.twinCandleComponentRef} />
                </div>
            </LandingPageCard>
        );
    }
}

export default FeaturedContentSection;
