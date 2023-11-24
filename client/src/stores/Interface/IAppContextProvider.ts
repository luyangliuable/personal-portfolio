export default interface IAppContextProvider {
    userName: string;
    loginStatus: boolean;
    addToQueue: (item: HTMLDivElement) => void
}
