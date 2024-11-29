
export const PetState = Object.freeze({
    "0": "Livre",
    "1": "Em análise",
    "2": "Adotado",
    "livre": "0",
    "em análise": "1",
    "adotado": "2",
    getValue: (number) => {
        return PetState[number]
    }
})