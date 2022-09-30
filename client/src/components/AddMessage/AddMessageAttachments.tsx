import { useContext, useEffect, useMemo, useState } from "react";
import { getFileFormat } from "../../helpers/file";
import { AddMessageContext } from "./AddMessage";

type stateType = {
  image: string[];
  audio: string[];
  video: string[];
  document: string[];
}

type ImageProps = {
  image: string;
  index: number;
  handleOnRemove: (type: string, index: number) => void;
}

const Image:React.FC<ImageProps> = ({ image, index, handleOnRemove }) => {

  const handleOnClickRemove = () => {
    handleOnRemove('image', index);
  }

  return (
    <picture className="add-message__image">
      <img src={image} alt={image} />
      <button className="btn-img add-message__image--remove"
        onClick={handleOnClickRemove}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.17157 8.00003L0.585785 3.41424L3.41421 0.585815L8 5.1716L12.5858 0.585815L15.4142 3.41424L10.8284 8.00003L15.4142 12.5858L12.5858 15.4142L8 10.8285L3.41421 15.4142L0.585785 12.5858L5.17157 8.00003Z" fill="#FFFFFF"/>
        </svg>
      </button>
    </picture>
  );
}

const AddMessageAttachments:React.FC = () => {

  const messageContext = useContext(AddMessageContext);

  const [state, setState] = useState<stateType>({
    image: [],
    audio: [],
    video: [],
    document: []
  });

  const handleOnRemove = (type: string, index: number) => {
    const value = state;

    switch(type) {
      case 'image':
        value.image = value.image.slice(0, index).concat(value.image.slice(index + 1, value.image.length));
        break;
      case 'audio':
        value.audio = value.audio.slice(0, index).concat(value.audio.slice(index + 1, value.audio.length));
        break;
      case 'video':
        value.video = value.video.slice(0, index).concat(value.video.slice(index + 1, value.video.length));
        break;
      case 'document':
        value.document = value.document.slice(0, index).concat(value.document.slice(index + 1, value.document.length));
        break;
    }
    const files = [];

    for (let values of Object.values(value)) files.push(...values);

    messageContext.setAttachments(files);
  }

  useEffect(() => {
    const value: stateType = {
      image: [],
      audio: [],
      video: [],
      document: []
    }
    for (let file of messageContext.state.attachments) {
      const format = getFileFormat(file);
      switch(format) {
        case 'image':
          value.image.push(file);
          break;
        case 'audio':
          value.audio.push(file);
          break;
        case 'video':
          value.video.push(file);
          break;
        case 'document':
          value.document.push(file);
          break;
      }
    }
    setState(value);
  }, [messageContext.state.attachments]);

  return (
    <>
    {messageContext.state.attachments.length > 0 && (
      <div className="add-message__attachments">
        {state.image.length > 0 && (
          <div className="add-message__images">
          {state.image.map((image: string, index) => {
            return (
              <Image image={image} index={index} handleOnRemove={handleOnRemove} />
            );
          })}
          </div>
        )}
      </div>
    )}
    </>
  );
}

export default AddMessageAttachments;