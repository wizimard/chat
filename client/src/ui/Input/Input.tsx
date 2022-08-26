import { ChangeEvent, FormEvent } from "react";

interface InputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}
const Input:React.FC<InputProps> = ({ value, onChange, placeholder }) => {
    return (
        <input type="text"
               value={value}
               onChange={onChange}
               className='input'
               placeholder={placeholder} />
    );
};

export default Input;