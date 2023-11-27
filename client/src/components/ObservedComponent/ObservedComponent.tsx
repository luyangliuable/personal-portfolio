import React, { useEffect, useState, createRef, RefObject, Component } from 'react';

interface IObservedComponentProps {
    children?: React.ReactNode;
}

class ObservedComponent extends Component<IObservedComponentProps, {}> {
    private containerRef: RefObject<HTMLDivElement>;
    private observer: IntersectionObserver;
    private queueRef: Element[];
    constructor(props: IObservedComponentProps) {
        super(props);
        this.containerRef = createRef();
        this.queueRef = [];
    }

    processQueue() {
        console.log(this.queueRef);

        if (this.queueRef.length === 0) return;

        const element = this.queueRef.shift();

        if (element) {
            this.fadeInElement(element);
        }

        setTimeout(this.processQueue, 2000);
    };

    fadeInElement(element: Element) {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transition = 'opacity .1s ease-in';
    };

    componentDidMount(): void {
        setTimeout(() => {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target instanceof HTMLElement) {
                        this.queueRef.push(entry.target);
                    }
                });
            }, { threshold: 0.1 }
            );

            this.processQueue();

            const observedElements = document.querySelectorAll('.gallery-item');

            Array.from(observedElements).forEach((element) => this.observer.observe(element));
        }, 1000);
    }

    componentWillUnmount(): void {
        if (this.observer) this.observer.disconnect();
        
    }

    render() {
        return (
            <div ref={this.containerRef}>
                {this.props.children}
            </div>
        )
    };
}

export default ObservedComponent;
