export type IFileShort = {
  id: string;
  url: string;
}
export type IFile = IFileShort & {
  author: {
    id: string;
    name: string;
  };
  date: string;
}