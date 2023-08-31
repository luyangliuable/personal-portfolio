import { RefObject } from 'react';

interface IndivualElementReferenceAndClass {
    reference: RefObject<HTMLElement>,
    className: string[]
}

interface ITwinCandleState {
    animatedTimeIntervalMiliseconds: number,
    currentCandleState: "On" | "Off" | "Transitioning",
    fireOnState: {
        [category: string]: IndivualElementReferenceAndClass
    },
    fireOffState: {
        [category: string]: IndivualElementReferenceAndClass
    },
    fireOffTransitionState: {
        [category: string]: IndivualElementReferenceAndClass
    },
    fireOnTransitionState: {
        [category: string]: IndivualElementReferenceAndClass
    }
}

export default ITwinCandleState;
