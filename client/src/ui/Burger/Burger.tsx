interface BurgerProps {
    onClick: () => void;
}

const Burger:React.FC<BurgerProps> = ({ onClick }) => {
    return (
        <button className="burger">
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Burger;