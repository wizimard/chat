interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    name?: string;
}
const Input:React.FC<InputProps> = (props) => {
    return (
        <input {...props} className={`input ${props.className ?? ''}`}  />
    );
};

export default Input;