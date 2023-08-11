import { JSXElementConstructor } from 'react';

export default interface IExperienceSectionState<
    P = any,
    W extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>
> {
    render?: () => React.ReactElement<P, W>,
    items: any
}
