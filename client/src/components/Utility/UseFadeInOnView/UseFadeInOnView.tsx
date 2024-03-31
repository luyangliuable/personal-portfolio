import { useEffect, useState } from 'react';

const useFadeInOnView = () => {
    const [elements, setElements] = useState<Element[]>([]);
    const queue: Element[] = [];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    queue.push(entry.target);
                    observer.unobserve(entry.target);
                }
            });
            processQueue();
        }, { threshold: 0.1 });

        const observedElements = document.querySelectorAll('.gallery-item');
        setElements(Array.from(observedElements));
        observedElements.forEach(el => observer.observe(el));

        function processQueue() {
            if (queue.length === 0) return;

            const element = queue.shift();
            if (element) {
                fadeInElement(element);
            }

            setTimeout(processQueue, 100);
        }

        function fadeInElement(element: Element) {
            (element as HTMLElement).style.opacity = '1';
            (element as HTMLElement).style.transition = 'opacity 1s ease-in';
        }

        return () => {
            observer.disconnect();
            setElements([]);
        };
    }, []);

    return elements;
};

export default useFadeInOnView;
