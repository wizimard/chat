import ReactDOM from "react-dom";
import { children } from "../../types/props/children";

interface PortalProps extends children {
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const Portal:React.FC<PortalProps> = ({ children, onClose, className = '' }) => {

  return ReactDOM.createPortal(
    <div className={`portal ${className}`} onClick={onClose}>
      {children}
    </div>, document.getElementById('root')!);
}

export default Portal;