import { JSXElementConstructor } from 'react';

interface ExperienceSectionItem {
    title: string,
    cardTitle: string,
    url: string,
    cardSubtitle: string,
    cardDetailedText: string,
    media: {
        type: "IMAGE" | "VIDEO" | "AUDIO",
        source: {
            url: string
        }
    }
}

interface IExperienceSectionState<
    P = any,
    W extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>
> {
    render?: () => React.ReactElement<P, W>,
    items: ExperienceSectionItem[],
    currentElementPositionY?: number,
    timeLineLength?: number,
    lockPosition: number | null
    fallBackLockPosition: number | null
}


export { IExperienceSectionState, ExperienceSectionItem }
