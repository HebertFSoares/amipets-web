
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


    async function createPet(pet) {
        const body = {
            nome: pet.name,
            especie: pet.specie,
            descricao: pet.description,
            dataNascimento: pet.birthDate,
            personalidade: pet.personalities,
            status: pet.status,
            tamanho: pet.size
        }
        console.log(body);
        const res = await api.post("pets", body)
        console.log(res);
    }

    return (

        <div className="w-full p-8">
            <div className="max-w-5xl space-y-4">
                <h1 className="text-3xl font-bold ">Pets</h1>

                <div className="">
                    <PetsFilters></PetsFilters>
                </div >

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
                                                description={"Edite as informações do pet no sistema. Clique em salvar quando tiver finalizado."}
                                                title={"Editar pet"}
                                                initialValues={{
                                                    id: pet.id,
                                                    name: pet.nome,
                                                    specie: pet.especie,
                                                    birthDate: getFormattedDate(pet.dataNascimento),
                                                    size: capitalize(pet.tamanho),
                                                    description: pet.descricao,
                                                    status: getFormattedPetStatus(pet.status),
                                                    personalities: pet.personalidade
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
                    <Button type="button"> <PlusCircle />Cadastrar Pet</Button>
                </PetFormDialog>

            </div >
        </div>

    )
}