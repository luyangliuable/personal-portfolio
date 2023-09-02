const truncateTextBody = (text: string): string => {
    return text && text.length > 400
        ? text.substring(0, 400) + "..."
        : text;
}

const stripAwayHashSymbols = (text: string): string => {
    return text.replace(/#/g, "");
}

const isoDateFormatToString = (date: Date): string => {
    const padWithZero = (number: number) => {
        return number < 10 ? '0' + number : number;
    }

    const formattedDate = padWithZero(date.getDate()) + "-" + padWithZero(date.getMonth() + 1) + "-" + date.getFullYear();
    return formattedDate;
}

export { truncateTextBody, stripAwayHashSymbols, isoDateFormatToString };
