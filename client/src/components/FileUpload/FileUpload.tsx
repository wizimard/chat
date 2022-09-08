import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import FileService from "../../services/FileService";

interface FileUploadProps {
  accept?: string;
  maxElement?: number;
  onChange?: (files: string[]) => void;
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

   }, [dispatch]);
   
  return (
    <input type="file" 
      accept={accept}
      onChange={handleOnChange}
      multiple={maxElement > 1} />
  );
}

export default FileUpload;