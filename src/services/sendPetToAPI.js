import { api } from "@/lib/apiWrapper";

export async function sendPetToAPI(pet) {
    const body = {
        nome: pet.name,
        especie: pet.specie,
        descricao: pet.description,
        dataNascimento: pet.birthDate,
        personalidade: pet.personalities,
        status: pet.status,
        tamanho: pet.size
    };

    await api.post("pets", body);
}