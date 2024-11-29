
export function getStatusCode(status) {
    const statusMap = {
        "Livre": "0",
        "Em análise": "1",
        "Adotado": "2",
    }

    return statusMap[status];
}