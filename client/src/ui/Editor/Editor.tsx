const Editor:React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`editor ${props.className ?? ''}`} 
      contentEditable={true}>
    </div>
  );
}

export default Editor;