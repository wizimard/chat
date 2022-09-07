export interface IChat {
    id: string;
    name: string;
    unread: number;
    lastMessageDate: string;
}
export interface IChatPerson extends IChat {
    avatar: string;
    isOnline: boolean;
}