
export function getFormattedDate(date) {

    date = new Date(date);

    return `${date.getDate().toString().padStart(2, "0")}/${date.getMonth().toString().padStart(2, "0")}/${date.getFullYear()}`;

}