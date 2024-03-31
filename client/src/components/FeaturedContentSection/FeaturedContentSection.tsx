import React, { Component, createRef, RefObject } from 'react';
import { isCenterAlignedWithViewport } from "../Utility/ScrollUtility";
import { FaAngleDown } from "react-icons/fa";
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
        const candleLightUpMargin = 150;
        const checkCandleStatus = (): void => {
            if (isCenterAlignedWithViewport(this.currentComponentRef?.current) < 0) {
                this.twinCandleComponentRef?.current?.transitionCandleFireToOn();
            } else if (isCenterAlignedWithViewport(this.currentComponentRef?.current) > candleLightUpMargin) {
                this.twinCandleComponentRef?.current?.transitionCandleFireToOff();
            }
        }
        setInterval(checkCandleStatus, 200);
    }

    calculateElementsToShow = () => {
        const windowWidth = window.innerWidth;
        const elementWidth = 400;
        const wrapperWidth = 1900; // Connascence of value with FeaturedContentSection.css:10
        let numOfElementsToShow = Math.floor(Math.min(windowWidth, wrapperWidth) / elementWidth);
        this.setState({ numOfElementsToShow: Math.max(numOfElementsToShow, 1) });
    }


    showAllElements = () => {
        const featuredPostsLength = this.state.featuredPosts?.length ?? 0;
        this.setState({ numOfElementsToShow: featuredPostsLength + 2 });
        if (this.showMoreButtonRef.current) this.showMoreButtonRef.current.style.display = 'none';
    }

    renderTopPickedPostsSortedByDateDescending = (): React.ReactNode => {
        const sliceEnd = this.state.numOfElementsToShow - 1;
        return this.state.featuredPosts?.slice(0, sliceEnd).map((content) => {
            return (
                <div key={content._id.$oid}>
                    <GalleryItem
                        name={content.heading}
                        tags={content.tags}
                        type="blog"
                        dateCreated={content.date_created}
                        minuteRead={content.reading_time_minutes}
                        className="my-2.5"
                        link={`/digital_chronicles/blog?id=${content._id.$oid}`}
                        image={content.image.$oid} />
                </div>
            )
        });
    }

    async fetchPostList() {
        const response = await this.postRepository.getFeaturedPostList();
        this.setState({
            featuredPosts: response
        });
    }


    getFeaturedToolHeading() {
        return "Featured Tool: " + this.state.featuredTool?.name;
    }


    render() {
        return (
            <LandingPageCard heading="Featured Content" landingPageCardType="fitContent" blendWithBackground={true}>
                <section ref={this.currentComponentRef} className="flex flex-col items-center">
                    <div className="featured-section w-full flex flex-row justify-center items-start">
                        <GalleryItem
                            name={this.getFeaturedToolHeading()}
                            type="tool"
                            className="my-2.5"
                            image="65596ad4ad7cc31ee9263e32"
                            description={truncateTextBody(this.state.featuredTool?.description)}
                            link={this.state.featuredTool?.link} />
                        {this.renderTopPickedPostsSortedByDateDescending()}
                    </div>
                    <div className="show-more-button-wrapper" ref={this.showMoreButtonRef}>
                        <Button
                            style={{ "--border-radius": "20px", zIndex: 10, border: "2px solid #F3F3F3" } as React.CSSProperties}
                            onClick={this.showAllElements}
                            showButtonLine>
                            Show More <FaAngleDown />
                        </Button>
                    </div>
                    <div className="divider h-28"></div>
                    <TwinCandle ref={this.twinCandleComponentRef} />
                </section>
            </LandingPageCard>
        );
    }
}

export default FeaturedContentSection;
