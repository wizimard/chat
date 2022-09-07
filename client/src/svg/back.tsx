import { HTMLAttributes } from "react";

const BackSvg:React.FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8L8 12L6 12L-2.62268e-07 6L6 -4.37114e-07L8 -3.49691e-07L8 4L16 4L16 8L8 8Z" fill="#FFFFFF"/>
    </svg>
  );
}

export default BackSvg;