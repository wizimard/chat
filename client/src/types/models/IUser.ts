import { IContact } from "./IContacts";

export interface IUserFriend {
    id: string;
    name: string;
    avatar: string;
}
export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar: string;
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