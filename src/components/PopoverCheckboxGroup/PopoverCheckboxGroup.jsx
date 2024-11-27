
import { useState } from "react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ChevronDown, ChevronUp } from "lucide-react"
import PropTypes from 'prop-types';
import { Checkbox } from "@/components/ui/checkbox"
import { Controller } from "react-hook-form";


export function PopoverCheckboxGroup({ options = [], children, name, control }) {

    const [isOpened, setIsOpened] = useState(false);

    return (

        <>
            <Popover open={isOpened} onOpenChange={setIsOpened}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        aria-expanded={open}
                        className={``}
                    >
                        {children}
                        {isOpened ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 space-y-2">
                    {
                        options.map((option, index) => {
                            return <div key={index} className="flex items-center gap-2 text-sm" >

                                <Controller
                                    name={name}
                                    defaultValue={[]}
                                    control={control}
                                    render={(controller) => (
                                        <>
                                            <Checkbox
                                                id={option}
                                                name={option}
                                                value={option}
                                                checked={controller.field.value.includes(option)}
                                                onCheckedChange={() => {
                                                    const values = controller.field.value;
                                                    const newValues = values.includes(option) ? values.filter((x) => x !== option) : [...values, option];
                                                    controller.field.onChange(newValues);
                                                }}

                                            />
                                            <label htmlFor={option} onClick={(e) => e.stopPropagation()}> {option}</label>
                                        </>
                                    )}
                                >
                                </Controller>

                            </div>

                        })
                    }
                </PopoverContent>
            </Popover >

        </>

    );
}

PopoverCheckboxGroup.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    children: PropTypes.string,
    name: PropTypes.string,
    control: PropTypes.any,
}