
import { useEffect, useState } from "react"
import { Combobox } from "../Combobox/Combobox"
import { Button } from "../ui/button"

import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table"
import { Ellipsis, PencilIcon, PlusCircle, Search, Trash2 } from "lucide-react"
import { PopoverCheckboxGroup } from "../PopoverCheckboxGroup/PopoverCheckboxGroup"
import { getFormattedPetStatus } from "../../utils/getFormattedPetStatus.js";
import { getFormattedDate } from "@/utils/getFormattedDate"
import { capitalize } from "@/utils/capitalize"
import { useForm } from "react-hook-form"
import axios from "axios"
import { DialogDescription } from "@radix-ui/react-dialog"
import { PetFormDialog } from "../PetFormDialog/PetFormDialog"


export function PetsViewAdmin() {

    const { control, handleSubmit, register, setValue } = useForm({
        defaultValues: {
            id: "",
            name: "",
            species: [],
            sizes: [],
            status: []
        }
    })

    const [pets, setPets] = useState([]);

    const species = ["Gato", "Cachorro", "Coelho"];
    const sizes = ["Pequeno", "Médio", "Grande"];
    const status = ["Livre", "Em análise", "Adotado"];

    const mapForFilters = {
        "Pequeno": "pequeno",
        "Médio": "médio",
        "Grande": "grande",
        "Livre": "0",
        "Em análise": "1",
        "Adotado": "2"
    }

    useEffect(() => {
        const getPets = async () => {
            const pets = await axios.get("http://localhost:8000/api/pets", {
            })
            setPets(pets.data);
            console.log(pets.data);
        }
        getPets();
    }, []);

    function normalizeFilters(filters) {
        return filters.map((filter) => {
            if (!mapForFilters[filter]) {
                return filter.toLowerCase();
            }
            else {
                return mapForFilters[filter];
            }
        });
    }

    function searchPets(data) {

        const getPets = async () => {
            const pets = await axios.get("http://localhost:8000/api/pets", {
                params: {
                    ...(data.name !== "" && {
                        nome: data.name
                    }),
                    especie: JSON.stringify(normalizeFilters(data.species)),
                    tamanho: JSON.stringify(normalizeFilters(data.sizes)),
                    status: JSON.stringify(normalizeFilters(data.status))
                }
            })
            setPets(pets.data);
            console.log(pets.data);
        }
        getPets();
    }

    function createPet(data) {
        console.log(data);
    }

    function handleCleanFilters() {
        setValue("name", "");
        setValue("id", "");
        setValue("sizes", []);
        setValue("status", []);
        setValue("species", []);
    }

    return (
        <div className="p-6 max-w-5xl space-y-4">

            <h1 className="text-3xl font-bold ">Pets</h1>

            <div className="">
                <form className="flex justify-between gap-2 flex-wrap" onSubmit={handleSubmit(searchPets)}>

                    <div className="flex space-x-2 items-center">
                        <Input name="id" placeholder="ID do pet" {...register("id")} className="max-w-24" />
                        <Input name="nome" placeholder="Nome do pet" {...register("name")} className="max-w-52" />
                        <Combobox options={species} control={control} name="species" >
                            Espécie
                        </Combobox>
                        <PopoverCheckboxGroup options={status} control={control} name="status" >
                            Status
                        </PopoverCheckboxGroup>
                        <PopoverCheckboxGroup options={sizes} control={control} name="sizes">
                            Tamanho
                        </PopoverCheckboxGroup>
                    </div>
                    <div className="flex justify-start space-x-2">
                        <Button type="submit" variant="link" onClick={handleCleanFilters}>
                            Limpar Filtros
                        </Button>
                        <Button type="submit" variant="outline">
                            <Search />
                            Filtrar resultados
                        </Button>
                    </div>

                </form>
            </div >
            <div className="border-t pt-2">
            </div>
            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >ID</TableHead>
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
                            pets.map((pet) => {
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
                                    <TableCell>{pet.tamanho ? capitalize(pet.tamanho) : "-"}</TableCell>
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
                                                personalities: []
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
    )
}