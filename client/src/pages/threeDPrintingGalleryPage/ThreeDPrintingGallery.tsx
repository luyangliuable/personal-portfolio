import { Component } from "react";
import "./ThreeDPrintingGallery.css";
import IThreeDPrintingGalleryState from "./Interface/IThreeDPrintingGalleryState";
import Gallery from "../../components/Gallery/Gallery";

class ThreeDPrintingGallery extends Component<{}, IThreeDPrintingGalleryState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            content: [
                {
                    name: "3d Printed Maneki Neko",
                    description: "With a wink and a beckon printing using Creality 3D printer, this Maneki Neko promises high-tech fortune and whimsy in every layer.",
                    image: "http://llcode.tech/api/image/650502c8f9b642fb30be5999"
                },
                {
                    name: "3d Printed Swivel Arm",
                    description: "Precision-engineered, 3D-printed arm I designed using solidworks that can swivel around: it was used on a robot as the ultimate payload handler",
                    image: "http://llcode.tech/api/image/650516c6f9b642fb30be599a"
                },
                {
                    name: "3d Printed Dino",
                    description: "A 3D-printed dinosaur with a rhythmic rattle exoskeleton",
                    image: "http://llcode.tech/api/image/65051a3ef9b642fb30be599c"
                },
            ]
        };
    }

    render() {
        return (
            <>
                <Gallery content={this.state.content} heading="3D Printing Gallery" />
            </>
        );
    }
}

export default ThreeDPrintingGallery;
