import axios from "axios";

export async function fetchPets(filters) {

    const params = {};

    if (filters.name) {
        params.nome = filters.name;
    }

    if (filters.species && filters.species.length > 0) {
        params.especie = filters.species;
    }

    if (filters.sizes && filters.sizes.length > 0) {
        params.tamanho = filters.sizes;
    }

    if (filters.status && filters.status.length > 0) {
        params.status = filters.status;
    }

    console.log(params);

    const pets = await axios.get("http://localhost:8000/api/pets");
    return pets.data;
}