import { Component } from "react";
import "./HardwareProjectsPage.css";
import Gallery from "../../components/Gallery/Gallery";
import IHardwareProjectsPageState from "./Interface/IHardwareProjectsPageState";

class HardwareProjectsPage extends Component<{}, IHardwareProjectsPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            content: [
                {
                    name: "Arduino mega",
                    description: "Harnessing creativity in a compact circuit, my Arduino Mega survived where its predecessor met a fiery end with a rogue laptop charger.",
                    image: "http://llcode.tech/api/image/65052756f9b642fb30be599d"
                },
                {
                    name: "",
                    description: "I used this Raspberry Pi for commanding home devices and blocking ads by using Pi-hole. A real tech charm!",
                    image: "http://llcode.tech/api/image/6505281ef9b642fb30be599e"
                },
                {
                    name: "rgb controller",
                    description: "",
                    image: "http://llcode.tech/api/image/65052952f9b642fb30be599f"
                },
                {
                    name: "light sensor",
                    description: "",
                    image: "http://llcode.tech/api/image/650529b6f9b642fb30be59a0"
                },
                {
                    name: "bread board",
                    description: "Why don't breadboards ever become musicians? Because they're always losing their connections!",
                    image: "http://llcode.tech/api/image/65052a6af9b642fb30be59a1"
                }
            ]
        };
    }

    render() {
        return (
            <>
                <Gallery heading="3D Hardware that I Use for My Projects" content={this.state.content} />
            </>
        );
    }
}

export default HardwareProjectsPage;
