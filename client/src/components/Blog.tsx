import React, { Component, useRef } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    name?: string,
    current?: string,
    [category: string]: any
}

interface AbcState {
    render?: () => React.ReactElement<any, any>,
}


class Blog extends Component<{}, AbcState> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                {/* TODO */}
            </div>
        )
    }
}

export default Blog;
