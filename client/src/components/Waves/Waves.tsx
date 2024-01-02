import React from "react";
import "./Waves.css";

const Waves: React.FC<{}> = () => {
    return (
        <div className='wave__container' >
            <div className='wave -one'></div>
            <div className='wave -two'></div>
            <div className='wave -three'></div>
            <div className='wave -four'></div>
        </div >
    )
}

export default Waves;
