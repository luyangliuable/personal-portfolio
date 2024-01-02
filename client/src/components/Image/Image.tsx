import React, { Component } from 'react';
import SkeletonImage from './SkeletonImage/SkeletonImage';
import IImageProps from './Interface/IImageProps';
import IImageState from './Interface/IImageState';
import ImageRepository from "../../repositories/ImageRepository";

class Image extends Component<IImageProps, IImageState> {
    imageRepository: ImageRepository;

    static defaultProps = {
        defaultImage: "http://llcode.tech/api/image/651942aaf9b642fb30be59ae",
        defaultImageId: "651942aaf9b642fb30be59ae",
        defaultAuthorImage: "http://llcode.tech/api/image/65194be0f9b642fb30be59af",
        defaultAuthorImageId: "65194be0f9b642fb30be59af"
    };

    defaultImageAlt = "You are blind";

    componentDidMount(): void {
        this.updateImage();
    }

    componentDidUpdate(prevProps: IImageProps) {
        if (this.props.src !== prevProps.src) {
            this.updateImage();
        }
    }

    constructor(props: IImageProps) {
        super(props);
        this.imageRepository = ImageRepository.getInstance();
        this.state = {}
    }

    async updateImage() {
        try {
            const imageId = this.props.src ?? Image.defaultProps.defaultImageId;

            const [imageUrl] = await Promise.all([
                this.imageRepository.getImageById(imageId),
            ]);

            this.setState({
                fetchedImageUrl: imageUrl,
            });

        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    render() {
        const { fetchedImageUrl } = this.state;
        let { className, alt } = this.props;
        alt ??= this.defaultImageAlt;

        return (
            <>
                {
                    fetchedImageUrl ?
                        <img className={className} src={fetchedImageUrl} alt={alt} />
                        : <SkeletonImage class={this.props.className} />
                }
            </>
        )
    }
}

export default Image;
