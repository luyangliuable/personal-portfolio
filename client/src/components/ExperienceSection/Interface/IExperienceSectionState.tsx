import { JSXElementConstructor } from 'react';

interface ExperienceSectionItem {
    dateTime: string,
    cardTitle: string,
    location?: string,
    url: string,
    cardSubtitle: string,
    cardDetailedText: string,
    importance?: number, // from 0 - 1
    display?: "IMAGE" | "NORMAL"
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
    isLocked: boolean,
    currentElementPositionY?: number,
    timeLineLength?: number,
    lockPosition?: number
    unlockPosition: number | null
}


export { IExperienceSectionState, ExperienceSectionItem }
