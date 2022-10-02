import { AxiosResponse } from "axios";
import { $apiFile } from ".";

import { IFileShort } from '../types/models/IFile';

class FileService {
  async upload(data: FormData): Promise<AxiosResponse<IFileShort[]>> {
    return $apiFile.post<IFileShort[]>('/upload', data);
  }
}

export default new FileService();