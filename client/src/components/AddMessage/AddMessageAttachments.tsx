import { useCallback, useEffect, useState } from "react";
import { getFileFormat } from "../../helpers/file";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { messageActions } from "../../redux/reducer/messageSlice";
import { IFileShort } from "../../types/models/IFile";

type stateType = {
  image: IFileShort[];
  audio: IFileShort[];
  video: IFileShort[];
  document: IFileShort[];
}

type ImageProps = {
  image: IFileShort;
  handleOnRemove: (id: string) => void;
}

const Image:React.FC<ImageProps> = ({ image, handleOnRemove }) => {

  const handleOnClickRemove = () => {
    handleOnRemove(image.id);
  }

  return (
    <picture className="add-message__image">
      <img src={image.url} alt={image.url} />
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

  const dispatch = useAppDispatch();

  const attachments = useAppSelector(state => state.message.addMessage?.attachments);

  const [state, setState] = useState<stateType>({
    image: [],
    audio: [],
    video: [],
    document: []
  });

  const handleOnRemove = useCallback((id: string) => {
    dispatch(messageActions.removeAttachment(id));
  }, [dispatch]);

  useEffect(() => {

    if (!attachments || attachments.length === 0) {
      setState({
        image: [],
        audio: [],
        video: [],
        document: []
      });
      return;
    };

    const value: stateType = {
      image: [],
      audio: [],
      video: [],
      document: []
    }
    for (let file of attachments) {
      const format = getFileFormat(file.url);
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
  }, [attachments]);

  return (
    <>
    {attachments && attachments.length > 0 && (
      <div className="add-message__attachments">
        {state.image.length > 0 && (
          <div className="add-message__images">
          {state.image.map((image: IFileShort) => {
            return (
              <Image key={image.id} image={image} handleOnRemove={handleOnRemove} />
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