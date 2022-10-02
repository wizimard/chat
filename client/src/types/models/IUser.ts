import { IContact } from "./IContacts";
import { IFileShort } from "./IFile";

export interface IUserFriend {
    id: string;
    name: string;
    avatar?: IFileShort;
    isOnline: boolean;
}
export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar?: IFileShort;
    username: string;
    bio?: string;
    birthday?: string;
    links: string[];
}
export interface IUserAuth extends IUser {
    contacts: IContact[];
}
export interface IUserInfo extends IUser {
    isFriend: boolean;
    isOnline: boolean;
}