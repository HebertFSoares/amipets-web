
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table"
import { Ellipsis, PencilIcon, PlusCircle, Search, Trash2 } from "lucide-react"
import { getFormattedPetStatus } from "../../utils/getFormattedPetStatus.js";
import { getStatusCode } from "../../utils/getStatusCode";
import { getFormattedDate } from "@/utils/getFormattedDate"
import { capitalize } from "@/utils/capitalize"
import { useForm } from "react-hook-form"
import axios from "axios"
import { DialogDescription } from "@radix-ui/react-dialog"
import { PetFormDialog } from "../PetFormDialog/PetFormDialog"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom"
import { fetchPets } from "@/services/fetchPets"
import { PetState } from "@/utils/PetState"
import { PetsFilters } from "../PetsFilters/PetsFilters"
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiWrapper";
import { sendPetToAPI } from "@/services/sendPetToAPI";
import { updatePet } from "@/services/updatePet";
import { PetsResume } from "../PetsResume/PetsResume";

export function PetsViewAdmin() {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    let species = JSON.parse(searchParams.get('species'));
    let sizes = JSON.parse(searchParams.get('sizes'));
    let status = JSON.parse(searchParams.get('status'));

    const { data: pets } = useQuery({
        queryKey: ['pets', id, name, species, sizes, status],
        queryFn: () => fetchPets({
            id,
            name,
            species,
            sizes,
            status
        }),
    });

    async function createPet(data) {
        try {
            await sendPetToAPI(data);
            alert('Pet cadastrado com sucesso');
        }
        catch (err) {
            console.log(err);
            alert(err);
            alert('Erro ao cadastrar pet');
        }
    }

    async function editPet(data) {
        try {
            await updatePet(data);
            alert('Pet editado com sucesso');
        }
        catch (err) {
            console.log(err);
            alert(err);
            alert('Erro ao editar pet');
        }
    }

    return (

        <div className="w-full p-10 flex flex-col">

            <h1 className="text-3xl font-bold mb-4">Pets</h1>

            <div className="flex justify-between space-x-10">
                <div className="flex flex-col flex-grow space-y-4">
                    <PetsFilters />
                    <div className="border rounded-lg p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Foto</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Espécie</TableHead>
                                    <TableHead >Data de Nascimento</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tamanho</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {
                                    pets && pets.map((pet) => {
                                        return <TableRow key={pet.id}>
                                            <TableCell>{pet.id}</TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20 rounded-3xl overflow-hidden flex justify-center items-center">
                                                    <img src={pet.foto} alt={`foto de ${pet.nome}`} className="w-full h-full object-cover" />
                                                </div>
                                            </TableCell>
                                            <TableCell>{pet.nome}</TableCell>
                                            <TableCell>{capitalize(pet.especie)}</TableCell>
                                            <TableCell>{getFormattedDate(pet.dataNascimento)}</TableCell>
                                            <TableCell>{getFormattedPetStatus(pet.status)}</TableCell>
                                            <TableCell>{capitalize(pet.tamanho)}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost">
                                                    <Ellipsis className="w-4" />
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <PetFormDialog
                                                    key={pet.id}
                                                    description={"Edite as informações do pet no sistema. Clique em salvar quando tiver finalizado."}
                                                    title={"Editar pet"}
                                                    onSubmit={editPet}
                                                    initialValues={{
                                                        id: pet.id,
                                                        name: pet.nome,
                                                        specie: pet.especie,
                                                        birthDate: getFormattedDate(pet.dataNascimento),
                                                        size: capitalize(pet.tamanho),
                                                        description: pet.descricao,
                                                        status: getFormattedPetStatus(pet.status),
                                                        personalities: pet.personalidade && pet.personalidade.map((x) => { return { value: x } })
                                                    }}
                                                >
                                                    <Button type="button" variant="ghost"><PencilIcon className="w-4" /></Button>
                                                </PetFormDialog>

                                            </TableCell>
                                            <TableCell>
                                                <Trash2 className="w-4" />
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="flex flex-col flex-grow space-y-4">
                    <PetsResume />
                    <PetFormDialog
                        description={"Crie um novo pet no sistema. Clique em salvar quando tiver finalizado."}
                        title={"Cadastrar pet"}
                        onSubmit={createPet}
                        initialValues={{
                            id: "",
                            name: "",
                            specie: "",
                            birthDate: "",
                            description: "",
                            personalities: [],
                            status: "Livre"
                        }}
                    >
                        <Button type="button" className="bg-primary-500 hover:bg-primary-400 ">
                            <PlusCircle />Cadastrar Pet
                        </Button>
                    </PetFormDialog>
                </div>

            </div>

        </div>

    )
}