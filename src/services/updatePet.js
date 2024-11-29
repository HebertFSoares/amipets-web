
import { api } from "@/lib/apiWrapper";

export async function updatePet(pet) {
    const body = {
        nome: pet.name,
        especie: pet.specie,
        descricao: pet.description,
        dataNascimento: pet.birthDate,
        personalidade: pet.personalities,
        status: pet.status,
        tamanho: pet.size
    };

    const params = {};

    if (pet.name) {
        params.nome = pet.name;
    }

    if (pet.description) {
        params.descricao = pet.description;
    }

    if (pet.birthDate) {
        params.dataNascimentoa = pet.birthDate;
    }

    if (pet.specie) {
        params.especie = pet.specie;
    }

    if (pet.size) {
        params.tamanho = pet.size;
    }

    if (pet.status) {
        params.status = pet.status;
    }

    if (pet.personalities && pet.personalities.length > 0) {
        params.personalidade = pet.personalities;
    }

    console.log(params);

    await api.put(`pets/${pet.id}`, params);
}