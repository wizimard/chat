import { AxiosResponse } from "axios";
import $api from ".";
import { IContactPerson } from "../types/models/IContacts";
import { IUserShort, IUserInfo } from "../types/models/IUser";

class UserService {
  async searchUser(searchText: string, page: number): Promise<AxiosResponse<IContactPerson[]>> {
    return $api.post<IContactPerson[]>('/user/search', { searchText, page });
  }
  async getUser(id: string): Promise<AxiosResponse<IUserInfo>> {
    return $api.get<IUserInfo>(`/user/${id}`);
  }
  async getFriends(): Promise<AxiosResponse<IUserShort[]>> {
    return $api.get<IUserShort[]>('/user/friends');
  }
  async addFriend(id: string): Promise<AxiosResponse<boolean>> {
    return $api.post<boolean>('/user/friend/add', { id });
  }
  async removeFriend(id: string): Promise<AxiosResponse<boolean>> {
    return $api.post<boolean>('/user/friend/remove', { id });
  }
}

export default new UserService();