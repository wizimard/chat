export interface IUser {
    id: string;
    email: string;
    fullname: string;
    avatar: string;
    username?: string;
    bio?: string;
    birthday?: string;
    links: string[];
};
export interface IUserInfo extends IUser {
    isFriend: boolean;
}