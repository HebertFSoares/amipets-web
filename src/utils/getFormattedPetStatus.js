
export function getFormattedPetStatus(status) {

    const statusMap = {
        "0": "Livre",
        "1": "Reservado",
        "2": "Adotado",
    }

    return statusMap[status];
}