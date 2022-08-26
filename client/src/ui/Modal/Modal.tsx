import { children } from "../../types/props/children";

interface ModalProps extends children {
    additionalClass?: string;
}

const Modal:React.FC<ModalProps> = ({ children, additionalClass = '' }) => {
    return (
        <div className={`modal ${additionalClass}`}>
            <div className="modal__window">
                {children}
            </div>
        </div>
    );
};

export default Modal;