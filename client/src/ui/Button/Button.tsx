import { memo } from "react";

const Button:React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button {...props}
                className={`btn ${props.className}`}>
            {props.children}
        </button>
    );
}

export default memo(Button);