import { AxiosResponse } from "axios";
import { $apiFile } from ".";

class FileService {
  async upload(data: string): Promise<AxiosResponse<string>> {
    return $apiFile.post<string>('', { data });
  }
}

export default new FileService();