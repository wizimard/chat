import { MouseEvent } from 'react';

interface BurgerProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Burger:React.FC<BurgerProps> = ({ onClick }) => {
    return (
        <button className="btn-img burger" onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Burger;