import { IFileShort } from "./IFile";
import { IUserShort } from "./IUser";

export type IMessage = {
  id: string;
  author: IUserShort;
  date: string;
  text: string;
  attachments: IFileShort[];
}