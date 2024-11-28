import { CircleX, PlusCircle, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ControlledSelect } from "../ControlledSelect/ControlledSelect";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { capitalize } from "@/utils/capitalize";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { isValidBrazilianDate } from "@/utils/isBrazilianValidDate";
import { transformBrazilianDateToGeneralDate } from "@/utils/transformBrazilianDateToGeneralDate";
import { FormField } from "../FormField/FormField";
import PropTypes from 'prop-types';

const petsSchema = z.object({
    id: z.string(),
    name: z.string()
        .min(1, "O nome é obrigatório!")
        .transform(text => text.trim().split(" ").map((name) => capitalize(name)).join(" ")),
    specie: z.string()
        .min(1, "A espécie é obrigatória!")
        .toLowerCase(),
    birthDate: z.string()
        .min(1, "A data de nascimento é obrigatória!")
        .refine((date) => {
            return isValidBrazilianDate(date);
        }, "A data deve estar no formato DD/MM/AAAA!")
        .transform((date) => transformBrazilianDateToGeneralDate(date)),
    personalities: z.array(z.object({
        value: z.string().min(3, "A personalidade não pode ser vazia.")
    }))
        .transform((personalities) => personalities.map(personality => personality.value)),
    size: z.string().toLowerCase(),
    status: z.string()
        .toLowerCase()
        .transform((status) => {
            const statusMap = {
                "livre": "0",
                "em análise": "1",
                "adotado": "2"
            }
            return statusMap[status]
        }),
    description: z.coerce.string()
})

export function PetFormDialog({ children, initialValues, onSubmit, title, description }) {

    const { register, handleSubmit, control, formState } = useForm({
        resolver: zodResolver(petsSchema),
        defaultValues: initialValues
    });

    const [newPersonality, setNewPersonality] = useState("");

    const { fields, append, remove } = useFieldArray({
        name: "personalities",
        control: control
    })

    function addNewPersonality() {
        append({ value: newPersonality });
        setNewPersonality("");
    }

    return <>

        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="">

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit((data) => onSubmit(data))} >

                    <ScrollArea >
                        <div className="pr-4 pl-4 max-h-[500px] space-y-2">
                            <FormField
                                id="name"
                                label={"Nome *"}
                                register={register}
                                error={formState.errors.name}
                            />

                            <div className="flex justify-between gap-3 items-start">
                                <FormField
                                    id="specie"
                                    label={"Espécie *"}
                                    register={register}
                                    error={formState.errors.specie}
                                />

                                <div className="flex flex-col ">
                                    <label htmlFor="size" className="text-sm font-semibold mb-2">Status</label>
                                    <ControlledSelect id="status" control={control} name="status" options={["Livre", "Em análise", "Adotado"]} />
                                </div>
                            </div>

                            <div className="flex justify-between gap-3 items-start">
                                <FormField
                                    id="birthDate"
                                    placeholder="dd/mm/aaaa"
                                    label={"Data de nascimento *"}
                                    register={register}
                                    error={formState.errors.birthDate}
                                />

                                <div className="flex flex-col">
                                    <label htmlFor="size" className="text-sm font-semibold mb-2">Tamanho</label>
                                    <ControlledSelect id="size" control={control} name="size" options={["Pequeno", "Médio", "Grande"]} className="max-w-[200px]" />
                                </div>
                            </div>

                            <FormField
                                id="description"
                                label={"Descrição *"}
                                register={register}
                                error={formState.errors.description}
                            />

                            <div className="flex flex-col ">
                                <label htmlFor="personalities" className="text-sm font-semibold mb-2">Personalidades</label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        className="flex-grow min-w-2"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addNewPersonality();
                                                e.preventDefault();
                                            }
                                        }}
                                        type="text" id="personalities"
                                        value={newPersonality}
                                        onChange={(e) => setNewPersonality(e.target.value)}
                                    />
                                    <Button type="button" onClick={addNewPersonality} className="bg-primary-500 hover:bg-primary-400 ">Adicionar <PlusCircle /></Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {
                                    fields.map((field, index) => {
                                        return < span key={field.id} className="rounded-3xl bg-primary-800 text-primary-200 font-semibold text-xs py-2 px-2 items-center flex gap-1" >
                                            <span>{field.value}</span>
                                            <button type="button" onClick={() => remove(index)}> <X className="max-h-3 max-w-3" /> </button>
                                        </span>
                                    })
                                }
                            </div>
                        </div>

                    </ScrollArea>

                    <DialogFooter className="pt-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-primary-500 hover:bg-primary-400">Salvar</Button>
                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog >

    </>
}

PetFormDialog.propTypes = {
    children: PropTypes.any,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string
}
