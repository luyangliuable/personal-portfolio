type TargetObservedElement = HTMLDivElement | HTMLElement | HTMLAnchorElement;

class DynamicLoadQueue {
    private static instance: DynamicLoadQueue | null = null;
    private queue: TargetObservedElement[] = [];
    private isLocked: boolean = false;
    private observer: IntersectionObserver;

    private constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && (entry.target instanceof HTMLDivElement || entry.target instanceof HTMLElement || entry.target instanceof HTMLAnchorElement)) {
                    this.queue.push(entry.target);
                    this.processQueueStart();
                }
            });
        }, { threshold: 0.1 });
    }

    static getInstance(): DynamicLoadQueue {
        if (!DynamicLoadQueue.instance) {
            DynamicLoadQueue.instance = new DynamicLoadQueue();
        }

        return DynamicLoadQueue.instance;
    }

    addToQueue(element: TargetObservedElement) {
        this.observer.observe(element);
    };

    processQueueStart() {
        if (this.isLocked === false) {
            this.isLocked = true;
            this.processQueue();
        }
    }

    processQueue() {
        if (this.queue.length === 0) {
            this.isLocked = false;
            return;
        };

        const element = this.queue.shift();

        if (element) {
            this.fadeInElement(element);
            setTimeout(() => {
                this.processQueue(); // Use an arrow function to preserve 'this'
            }, 100);
       }
    };

    fadeInElement(element: Element) {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transform = 'translateX(0)';
    };
}

export default DynamicLoadQueue;
