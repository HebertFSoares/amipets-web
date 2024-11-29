
export function capitalize(text) {

    if (text.length > 0) {
        const capitalizedString = text[0].toUpperCase() + text.slice(1);

        return capitalizedString;
    }

    return text;
}