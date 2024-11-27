
import { useState } from "react"
import { Button } from "../ui/button"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form"


export function Combobox({ options = [], children, control, name }) {

    const [isOpened, setIsOpened] = useState(false);

    return (

        <>
            <Popover open={isOpened} onOpenChange={setIsOpened}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={``}
                    >
                        {children}
                        {isOpened ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52">
                    <Command>
                        <CommandInput placeholder="Selecione espécie"></CommandInput>
                        <CommandList>
                            <CommandEmpty>Nenhum resultado.</CommandEmpty>
                            <CommandGroup heading="">
                                {
                                    options.map((option, index) => (
                                        <Controller
                                            key={index}
                                            name={name}
                                            control={control}
                                            defaultValue={[]}
                                            render={(controller) => (
                                                <CommandItem
                                                    key={index}
                                                    className={`flex justify-between`}
                                                    value={controller.field.value.includes(option)}
                                                    onSelect={() => {
                                                        const values = controller.field.value;
                                                        const newValues = values.includes(option) ? values.filter((x) => x !== option) : [...values, option];
                                                        controller.field.onChange(newValues);
                                                    }}
                                                >
                                                    {option}
                                                    {controller.field.value.includes(option) && <Check />}
                                                </CommandItem>
                                            )}
                                        />
                                    ))
                                }

                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover >
        </>

    );

}

Combobox.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    children: PropTypes.string,
    name: PropTypes.string,
    control: PropTypes.any,
}