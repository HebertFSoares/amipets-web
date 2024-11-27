
import { useEffect, useState } from "react"
import { Combobox } from "../Combobox/Combobox"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table"
import { PencilIcon, PlusCircle, Search, Trash2 } from "lucide-react"
import { PopoverCheckboxGroup } from "../PopoverCheckboxGroup/PopoverCheckboxGroup"
import axios from "axios"

import { getFormattedPetStatus } from "../../utils/getFormattedPetStatus.js";
import { getFormattedDate } from "@/utils/getFormattedDate"
import { capitalize } from "@/utils/capitalize"
import { useForm } from "react-hook-form"


export function PetsTable() {

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
    const status = ["Livre", "Reservado", "Adotado"];

    const mapForFilters = {
        "Pequeno": "pequeno",
        "Médio": "médio",
        "Grande": "grande",
        "Livre": "0",
        "Reservado": "1",
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

        console.log(data);

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

    function handleCleanFilters() {
        setValue("name", "");
        setValue("id", "");
        setValue("sizes", []);
        setValue("status", []);
        setValue("species", []);
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            <div className="flex justify-between items-center mb-4">
                <form className="flex items-center gap-2" onSubmit={handleSubmit(searchPets)}>
                    <Input name="id" placeholder="ID do pet" {...register("id")}></Input>
                    <Input name="nome" placeholder="Nome do pet" {...register("name")}></Input>
                    <Combobox options={species} control={control} name="species">
                        Espécie
                    </Combobox>
                    <PopoverCheckboxGroup options={status} control={control} name="status" >
                        Status
                    </PopoverCheckboxGroup>
                    <PopoverCheckboxGroup options={sizes} control={control} name="sizes" >
                        Tamanho
                    </PopoverCheckboxGroup>
                    <Button type="submit" variant="outline">
                        <Search />
                        Filtrar resultados
                    </Button>
                    <Button type="submit" variant="outline" onClick={handleCleanFilters}>
                        Limpar Filtros
                    </Button>
                </form>
            </div>
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
                                    <TableCell><PencilIcon className="w-4" /></TableCell>
                                    <TableCell><Trash2 className="w-4" /> </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <Button> <PlusCircle /> Cadastrar Pet</Button>
        </div>
    )
}