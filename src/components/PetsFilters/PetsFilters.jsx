import { capitalize } from "@/utils/capitalize";
import { getStatusCode } from "@/utils/getStatusCode";
import { PetState } from "@/utils/PetState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod"
import { Input } from "../ui/input";
import { Combobox } from "../Combobox/Combobox";
import { PopoverCheckboxGroup } from "../PopoverCheckboxGroup/PopoverCheckboxGroup";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const petFiltersSchema = z.object({
    id: z.string(),
    name: z.string(),
    species: z.array(z.string().transform(specie => specie.toLowerCase())),
    sizes: z.array(z.string().transform(specie => specie.toLowerCase())),
    status: z.array(z.string().transform(specie => getStatusCode(specie)))
})

export function PetsFilters() {

    const speciesField = ["Gato", "Cachorro", "Coelho"];
    const sizesField = ["Pequeno", "Médio", "Grande"];
    const statusField = ["Livre", "Em análise", "Adotado"];

    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    let species = JSON.parse(searchParams.get('species'));
    let sizes = JSON.parse(searchParams.get('sizes'));
    let status = JSON.parse(searchParams.get('status'));

    if (species) {
        species = species.map((specie) => capitalize(specie));
    }

    if (sizes) {
        sizes = sizes.map((size) => capitalize(size));
    }

    if (status) {
        status = status.map((x) => PetState.getValue(x))
    }

    const { control, handleSubmit, register, setValue } = useForm({
        resolver: zodResolver(petFiltersSchema),
        values: {
            id: id ?? "",
            name: name ?? "",
            species: species ?? [],
            sizes: sizes ?? [],
            status: status ?? []
        }
    })

    function searchPetsFilters(data) {

        console.log(data);

        setSearchParams(state => {
            if (data.name) {
                state.set('name', data.name);
            }
            else {
                state.delete('name');
            }
            return state;
        })

        setSearchParams(state => {
            if (data.id) {
                state.set('id', data.id);
            }
            else {
                state.delete('id');
            }
            return state;
        })

        setSearchParams(state => {
            if (data.species && data.species.length > 0) {
                console.log("especies rules");
                console.log(data.species);
                state.set('species', JSON.stringify(data.species));
            }
            else {
                state.delete('species');
            }
            return state;
        })

        setSearchParams(state => {
            if (data.sizes && data.sizes.length > 0) {
                state.set('sizes', JSON.stringify(data.sizes));
            }
            else {
                state.delete('sizes');
            }
            return state;
        })

        setSearchParams(state => {
            if (data.status && data.status.length > 0) {
                state.set('status', JSON.stringify(data.status));
            }
            else {
                state.delete('status');
            }
            return state;
        })

    }

    function handleCleanFilters() {
        setValue("name", "");
        setValue("id", "");
        setValue("sizes", []);
        setValue("status", []);
        setValue("species", []);
    }

    return (
        <form className="flex justify-between gap-2 flex-wrap" onSubmit={handleSubmit(searchPetsFilters)}>
            <div className="flex space-x-2 items-center">
                <Input name="id" placeholder="ID do pet" {...register("id")} className="max-w-24" />
                <Input name="nome" placeholder="Nome do pet" {...register("name")} className="max-w-52" />
                <Combobox options={speciesField} control={control} name="species" >
                    Espécie
                </Combobox>
                <PopoverCheckboxGroup options={statusField} control={control} name="status" >
                    Status
                </PopoverCheckboxGroup>
                <PopoverCheckboxGroup options={sizesField} control={control} name="sizes">
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
    )
}