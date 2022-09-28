import { children } from "../../types/props/children";

const BurgerEllipse:React.FC<children> = ({ children }) => {
  return (
    <button className="btn-img burger-ellipse">
      <span className="burger-ellipse__item"></span>
      <span className="burger-ellipse__item"></span>
      <span className="burger-ellipse__item"></span>
      <div className="burger-ellipse__content">
        { children }
      </div>
    </button>
  );
}

export default BurgerEllipse;