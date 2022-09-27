export interface IChannelShort {
    id: string;
    name: string;
} 
export interface IChannelMember {
    id: string;
    name: string;
    avatar: string;
    role: 'member';
}
export interface IChannelAdmin extends Omit<IChannelMember, 'role'> {
    role: 'admin';
}
export interface IChannelAdministrator extends Omit<IChannelMember, 'role'> {
    role: 'administrator';
}
export interface IChannel {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    admin: IChannelAdmin;
    administrators: IChannelAdministrator[];
    members: IChannelMember[];
    links: string[];
    attachs: any;
    role: 'admin' | 'administrator' | 'member';
    link: string;
    isSubscribed: boolean;
}