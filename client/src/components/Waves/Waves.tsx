import { Component } from "react";
import "./Waves.css";

class Waves extends Component<{}, {}> {
    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <div className='wave__container' >
                <div className='wave -one'></div>
                <div className='wave -two'></div>
                <div className='wave -three'></div>
                <div className='wave -four'></div>
            </div >
        )
    }
}

export default Waves;
