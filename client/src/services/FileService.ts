import { AxiosResponse } from "axios";
import { $apiFile } from ".";

class FileService {
  async upload(data: FormData): Promise<AxiosResponse<string[]>> {
    return $apiFile.post<string[]>('/upload', data);
  }
}

export default new FileService();