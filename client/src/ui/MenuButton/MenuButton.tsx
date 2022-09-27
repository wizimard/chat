import { children } from "../../types/props/children";

const MenuButton:React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} className={`menu-button ${props.className}`}>
      {props.children}
    </button>
  );
}

export default MenuButton;