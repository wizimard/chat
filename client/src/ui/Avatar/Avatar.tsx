interface AvatarProps extends React.HTMLAttributes<HTMLPictureElement> {
  img: string;
}

const Avatar:React.FC<AvatarProps> = (props) => {
  return (
    <picture {...props} className={`avatar ${props?.className ?? ''}`}>
      <img src={props.img} alt={props.img} />
    </picture>
  );
}

export default Avatar;