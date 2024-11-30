import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";

export function ControlledSelect({ control, name, options, id, className }) {

    return <Controller
        name={name}
        control={control}
        defaultValue=""
        render={(controller) => (
            <Select value={controller.field.value} onValueChange={controller.field.onChange}>
                <SelectTrigger className={cn("min-w-[180px]", className)} id={id}>
                    <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                    {
                        options.map((option, index) => (
                            <SelectItem key={index} value={option} className="focus:bg-primary-900">
                                {option}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

        )}
    />
}

ControlledSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    children: PropTypes.string,
    name: PropTypes.string,
    control: PropTypes.any,
    id: PropTypes.string
}