import { HTMLAttributes, memo } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string;
    type?: "button" | "submit";
    additionalClass?: string;
    disabled?: boolean;
}
const Button:React.FC<ButtonProps> = ({ text, type = 'button', additionalClass = '', disabled = false, ...props }) => {
    return (
        <button type={type}
                className={`btn ${additionalClass}`}
                disabled={disabled}
                {...props}>
            {text}
        </button>
    );
}

export default memo(Button);