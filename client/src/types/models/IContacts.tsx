import { IFileShort } from './IFile';

interface IContactGeneral {
  id: string;
  name: string;
  unread: number;
  lastMessageDate: string | null;
  type: 'channel' | 'person';
}
export interface IContactChannel extends IContactGeneral {
  type: 'channel';
}
export interface IContactPerson extends IContactGeneral {
  type: 'person';
  avatar?: IFileShort;
  isOnline: boolean;
}
export type IContact = IContactChannel | IContactPerson;