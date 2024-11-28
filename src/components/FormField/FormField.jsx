
import { Input } from "../ui/input";
import PropTypes from 'prop-types';

export function FormField({ id, label, register, error, type = "text", placeholder = "", className }) {

    return <div className="flex flex-col items-start flex-grow">
        <label htmlFor={id} className="text-sm font-semibold mb-2">{label}</label>
        <Input type={type} id={id} placeholder={placeholder} {...register(id)} />
        {error && <span className="text-xs mt-1 text-rose-500 font-medium">{error.message} </span>}
    </div>

}

FormField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.any,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    register: PropTypes.any
}