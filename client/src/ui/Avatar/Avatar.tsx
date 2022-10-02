import { useEffect, useState } from "react";
import { getColor } from "../../helpers/color";

interface AvatarProps {
  attributes?: React.HTMLAttributes<HTMLPictureElement>;
  name: string;
  img?: string;
}

const Avatar:React.FC<AvatarProps> = ({ name, img, attributes = {} }) => {

  const [letters, setLetters] = useState({ first: '', last: '' });

  useEffect(() => {
    const [first, last,] = name.split(' ').map(word => word[0]);
    setLetters({
      first,
      last
    });
  }, [name]);

  return (
    <picture {...attributes} className={`avatar ${img ? '' : 'avatar_no-img'} ${attributes?.className ?? ''}`}>
    {img ? (
        <img src={img} alt={img} />
    ) : (
      <div style={{background: getColor( letters.first, letters.last )}}>
        {letters.first + letters.last}
      </div>
    )}
    </picture>
  );
}

export default Avatar;