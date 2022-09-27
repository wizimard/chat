interface ErrorProps {
  text: string;
}

const Error:React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className="error">
      <span>{ text }</span>
    </div>
  );
}

export default Error;