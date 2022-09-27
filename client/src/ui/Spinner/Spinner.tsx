interface SpinnerProps {
    size?: 'large' | 'middle' | 'little' | 'btn';
    text?: string;
}

const Spinner:React.FC<SpinnerProps> = ({ size = 'middle', text = 'LOADING...' }) => {
    return (
        <div className="spinner__container">
            <div className={`spinner spinner_${size}`}>
            </div>
            {size !== 'btn' && (<span className="spinner__text">{text}</span>)}
        </div>
    );
};

export default Spinner;