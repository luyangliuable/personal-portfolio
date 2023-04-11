import React from 'react';
/* import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'; */
import { useEffect, Component } from 'react';

interface AbcState {
    /* experiences: string[], */
    render?: () => React.ReactElement<any, any>,
}

class Experiences extends Component<{}, AbcState> {
    constructor(props: {}) {
        super(props);
        /* this.state = {
*     experiences: [],
* } */
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <h1>My Experiences</h1>
            </div>
        );
    }
}

export default Experiences;
