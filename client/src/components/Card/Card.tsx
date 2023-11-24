import { Component, createRef, RefObject } from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";
import { cardGradientEffect } from "../../components/Utility/MouseUtility";
import { truncateTextBody, stripAwayHashSymbols, isoDateFormatToString } from "../../components/Utility/StringUtility";
import TagCloud from "../TagCloud/TagCloud";
import SkeletonImage from "../SkeletonComponents/SkeletonImage/SkeletonImage";
import ImageRepository from "../../repositories/ImageRepository";
import ICardProps from "./Interface/ICardProps";
import ICardState from "./Interface/ICardState";
import DynamicLoadQueue from "../../stores/DynamicLoadQueue/DynamicLoadQueue";

class Card extends Component<ICardProps, ICardState> {
    iframePreviewRef = createRef<HTMLIFrameElement>();
    imageRepository: ImageRepository;
    cardItemRef: RefObject<HTMLAnchorElement>;
    dynamicLoadQueue: DynamicLoadQueue;

    static defaultProps = {
        defaultImage: "http://llcode.tech/api/image/651942aaf9b642fb30be59ae",
        defaultImageId: "651942aaf9b642fb30be59ae",
        defaultAuthorImage: "http://llcode.tech/api/image/65194be0f9b642fb30be59af",
        defaultAuthorImageId: "65194be0f9b642fb30be59af"
    };

    constructor(props: ICardProps) {
        super(props);
        this.imageRepository = ImageRepository.getInstance();
        this.cardItemRef = createRef();
        this.dynamicLoadQueue = DynamicLoadQueue.getInstance();

        this.state = {
            fetchedImageUrl: null,
            fetchedAuthorImageUrl: Card.defaultProps.defaultAuthorImage
        };
    }

    componentDidMount() {
        this.updateImage();

        if (this.cardItemRef.current) {
            this.dynamicLoadQueue.addToQueue(this.cardItemRef.current);
        }
    }

    componentDidUpdate(prevProps: ICardProps) {
        if (this.props.image !== prevProps.image) {
            this.updateImage();
        }
    }

    checkDateIsValid(): boolean {
        return this.props.date_created !== "";
    }

    extractRouteFromURL(url: string): string | null {
        console.log(url)
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === "llcode.tech") {
                return parsedUrl.pathname; // Returns the path (route) of the URL
            } else {
                return null;
            }
        } catch (error) {
            console.error("Invalid URL:", error);
            return null;
        }
    }

    async updateImage() {
        try {
            const imageId = this.props.image ?? Card.defaultProps.defaultImageId;
            const authorImageId = this.props.authorImage ?? Card.defaultProps.defaultAuthorImageId;

            const [imageUrl, authorImageUrl] = await Promise.all([
                this.imageRepository.getImageById(imageId),
                this.imageRepository.getImageById(authorImageId)
            ]);

            this.setState({
                fetchedImageUrl: imageUrl,
                fetchedAuthorImageUrl: authorImageUrl
            });

        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    render() {
        const { link, authorImage, author, heading, minuteRead, tags, date_created } = this.props;
        const { fetchedImageUrl } = this.state;
        const displayMinuteRead = `${minuteRead || "X"} min read`;
        const displayDateCreated = date_created ? isoDateFormatToString(new Date(date_created)) : '';

        return (
            <NavLink ref={this.cardItemRef} onMouseMove={cardGradientEffect} className="card card-item" to={link}>
                <div className="card-image--author-info">
                    <img className="card-image--author-image" src={authorImage || Card.defaultProps.defaultAuthorImage} alt="Author" />
                    {author}
                </div>
                <div className="card-item__content">
                    <h3 className="card-item__heading">{heading}</h3>
                    <p className="card-item__label">{`${displayMinuteRead} | ${displayDateCreated}`}</p>
                </div>
                <div className="card-image-preview__wrapper">
                    {
                        fetchedImageUrl ?
                            <img className="card-image-preview" src={fetchedImageUrl} alt="Card Preview" />
                            : <SkeletonImage class="card-image-preview" />
                    }
                </div>
                <TagCloud tags={tags} />
            </NavLink>
        );
    }
}

export default Card;
