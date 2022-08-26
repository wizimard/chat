interface SpinnerProps {
    size?: 'large' | 'middle' | 'little';
    text?: string;
}

const Spinner:React.FC<SpinnerProps> = ({ size = 'middle', text = 'LOADING...' }) => {
    return (
        <div className="spinner__container">
            <div className={`spinner spinner_${size}`}>
            </div>
            <span className="spinner__text">{text}</span>
        </div>
    );
};

export default Spinner;