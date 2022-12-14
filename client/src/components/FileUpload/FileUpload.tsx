import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import FileService from "../../services/FileService";
import { IFileShort } from "../../types/models/IFile";

interface FileUploadProps {
  accept?: string;
  maxElement?: number;
  onChange?: (files: IFileShort[]) => void;
}

const FileUpload:React.FC<FileUploadProps> = ({ accept = '*', maxElement = 1, onChange }) => {

  const dispatch = useAppDispatch();

  const handleOnChange = useCallback(async(e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    const data = new FormData();

    if (files.length > maxElement) {
      dispatch(modalActions.message(`Files too many! Maximum is ${maxElement}`));
    }
    for (let i = 0; i < files.length && i < maxElement; i++) {
      data.append('files', files[i]);
    }
    try {
      const response = await FileService.upload(data);
  
      onChange && onChange(response.data);
    } catch(e) {
      console.log(e);
      dispatch(modalActions.error('Error while trying to upload files'));
    }

   }, [dispatch, maxElement, onChange]);
   
  return (
    <input type="file" 
      className="file-upload"
      accept={accept}
      onChange={handleOnChange}
      multiple={maxElement > 1} />
  );
}

export default FileUpload;